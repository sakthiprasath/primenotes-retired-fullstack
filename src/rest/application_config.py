import os

from configs.application_config import ApplicationConfig as ConfigClass

FIELDS = {
    'QUEUE_STORAGE_ACCOUNT_CONNECTION_STRING': dict(required=True, is_secret=True, type=str),
    'SCHEDULER_MESSAGE_QUEUE_NAME': dict(required=True, is_secret=False, type=str),
    'ANALYTIC_JOBS_MESSAGE_QUEUE_NAME': dict(required=True, is_secret=False, type=str),
    'ALERTING_METRICS_MESSAGE_QUEUE_NAME': dict(required=True, is_secret=False, type=str),
    'ALERTING_RULES_MESSAGE_QUEUE_NAME': dict(required=True, is_secret=False, type=str),
    'DERIVED_MESSAGE_QUEUE_NAME': dict(required=True, is_secret=False, type=str),
    'AUTH_HOST': dict(required=True, is_secret=False, type=str),
    'REDIS_HOST': dict(required=True, is_secret=False, type=str),
    'REDIS_PORT': dict(required=True, is_secret=False, type=int),
    'TOKEN_VALIDATION_URL': dict(required=True, is_secret=False, type=str),
    'CREDENTIALS': dict(required=True, is_secret=False, type=str),
    'CSV_EXPORT_ROW_LIMIT': dict(required=True, is_secret=False, type=int),
    'CSV_EXPORT_ASSET_LIMIT': dict(required=True, is_secret=False, type=int),
    'DB_HOST': dict(required=True, is_secret=False, type=str),
    'DB_PORT': dict(required=True, is_secret=False, type=int),
    'DB_USER': dict(required=True, is_secret=False, type=str),
    'DB_PASSWORD': dict(required=True, is_secret=True, type=str),
    'DB_CONNECTION_TIMEOUT': dict(required=True, is_secret=False, type=int),
    'TENANT_DB_MAX_CONNECTIONS': dict(required=True, is_secret=False, type=int),
    'CACHE_TIMEOUT': dict(required=True, is_secret=False, type=int),
    'MEASUREMENTS_QUERY_LIMIT': dict(required=True, is_secret=False, type=int),
    # Not required from below
    'TEST_TENANT': dict(required=False, is_secret=False, type=str),
    'TENANT_DB_NAME': dict(required=False, is_secret=False, type=str),
    'TENANT_DB_SCHEMA': dict(required=False, is_secret=False, type=str),
    'ENABLE_SECURITY': dict(required=False, is_secret=False, type=str),
    'CONFIG': dict(required=False, is_secret=False, type=str),
    'LATENCY_COMPUTERS': dict(required=False, is_secret=False, type=str),
    'SCHEMA_FILE': dict(required=False, is_secret=False, type=str),
    'ASSETS_DB_NAME': dict(required=False, is_secret=False, type=str),
    'TS_DB_NAME': dict(required=False, is_secret=False, type=str),
    'MANAGER': dict(required=False, is_secret=False, type=str),
    'LOGGING_LEVEL': dict(required=False, is_secret=False, type=str),
    'SKIP_POST_INGESTED_MESSAGES': dict(required=False, is_secret=False, type=str)
}
config_yml = 'configs/config.yml'
config_override_yml = 'configs/config.override.yml'
config_yml_path = os.path.join(os.path.dirname(__file__), '../../', config_yml)
override_yml_path = os.path.join(os.path.dirname(__file__), '../../', config_override_yml)

ApplicationConfig = ConfigClass(FIELDS, config_yml_path, override_yml_path)
