import os
from contextlib import contextmanager
from threading import Semaphore

import psycopg2
import yaml
from psycopg2.extensions import *
from psycopg2.extras import RealDictCursor
from psycopg2.pool import ThreadedConnectionPool

from src.rest.application_config import ApplicationConfig


class DatabaseConnectionManager:

    INSTANCE = None

    def __init__(self, host, port, user, password, **kwargs):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.connection_pools = dict()
        self.app_config = ApplicationConfig.get_instance()

    def stats(self):
        results = dict()
        for key, pool in self.connection_pools.items():
            pool_stats = {'max': pool.maxconn, 'used':  pool._used}
            results[key] = pool_stats
        return results


    @staticmethod
    def get_instance():
        if DatabaseConnectionManager.INSTANCE is not None:
            return DatabaseConnectionManager.INSTANCE
        else:
            DatabaseConnectionManager.INSTANCE = DatabaseConnectionManager._create()
            return DatabaseConnectionManager.INSTANCE

    # TODO Replace tenant_name with tenancy token or have a helper method get tenant_name from tenancy token
    def _get_connection(self, tenant_name, *args, **kwargs):

        pool = self.connection_pools.get(tenant_name, None)
        if pool is None:
            self.connection_pools[tenant_name] = SemaphoreProtectedConnectionPool(minconn=0,
                                                                                  maxconn=self.app_config.tenant_db_max_connections,
                                                                                  timeout=self.app_config.db_connection_timeout,
                                                                                  *args, **kwargs)
            pool = self.connection_pools[tenant_name]

        new_connection = pool.getconn()

        if new_connection.status == STATUS_READY:
            return new_connection, pool
        else:
            return ValueError('Database connection could not be established.')

    # TODO Remove default tenant name.
    @contextmanager
    def _get_cursor(self, tenant_name):

        # TODO - Populate arguments for _get_connection from tenancy token.
        conn, pool = DatabaseConnectionManager.get_instance()._get_connection(tenant_name=tenant_name,
                                                                              host=self.host,
                                                                              port=self.port,
                                                                              dbname=tenant_name,
                                                                              user=self.user,
                                                                              password=self.password)
        try:
            yield conn.cursor(cursor_factory=RealDictCursor)
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            conn.commit()
            pool.putconn(conn)

    @staticmethod
    def _create():
        app_config = ApplicationConfig.get_instance()
        config_dict = {
            "host": app_config.db_host,
            "port": app_config.db_port,
            "user": app_config.db_user,
            "password": app_config.db_password
        }
        with psycopg2.connect(**config_dict) as c:
            if c.status == STATUS_READY:
                return DatabaseConnectionManager(**config_dict)


class SemaphoreProtectedConnectionPool(ThreadedConnectionPool):
    """
    If the maximum number of connections are currently in use, we will block and wait for 10 seconds for a free
    connection.
    """

    class DBConnectionPoolExhaustedError(Exception):
        pass

    def __init__(self, minconn, maxconn, timeout=10, *args, **kwargs):
        self.timeout = timeout
        self._semaphore = Semaphore(maxconn)
        super().__init__(minconn, maxconn, *args, **kwargs)

    def getconn(self, *args, **kwargs):
        r = self._semaphore.acquire(blocking=True, timeout=self.timeout)

        if not r:
            raise self.DBConnectionPoolExhaustedError()
        conn = super().getconn(*args, **kwargs)
        return conn

    def putconn(self, *args, **kwargs):
        super().putconn(*args, **kwargs)
        self._semaphore.release()


def get_test_tenant_details():
    app_config = ApplicationConfig.get_instance()
    return getattr(app_config, 'tenant_db_name', None), getattr(app_config, 'tenant_db_schema', None)
