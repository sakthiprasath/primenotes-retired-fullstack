from src.utils.database_connection_manager import DatabaseConnectionManager
import json
import os

SQL_CODE_FETCH_QUERIES = {
    "get_all_configs": "select * from tenant_config"
}


class SQLIndividualComponent():
    def __init__(self, tenant_db_name=None, db_schema=None):
        # self.tenant_db_name = tenant_db_name
        # self.db_schema = db_schema
        # self.database_connection_manager = DatabaseConnectionManager.get_instance()
        pass

    def _read_contents(self, file_path):
        fp = open(file_path, 'r')
        fp_content = fp.read()
        return  fp_content

    def get_all_configs(self,component_key):
        read_file_contents = {}

        file_path = '/home/sakthi/custom/sakthi/pro1000_backend/frontend_files/web-app/'+component_key+'/'
        file_list = os.listdir(file_path)
        if file_list is None:
            return None

        for file_name in file_list:
            file_content = self._read_contents((file_path + file_name))
            if file_name.endswith('.txt'):
                read_file_contents['headerScriptsCode'] = file_content
            elif file_name.endswith('.html'):
                read_file_contents['htmlCode'] = file_content
            elif file_name.endswith('.css'):
                read_file_contents['cssCode'] = file_content
            elif file_name.endswith('.js'):
                read_file_contents['jsCode'] = file_content

        return read_file_contents

    def result_write(self, file_name, file_content):
        file_path = '/home/sakthi/custom/sakthi/pro1000_backend/frontend_files/web-app/all_general_files/' + file_name + '.txt'
        fp = open(file_path,'w')
        fp.write(file_content)

    def get_file_data(self, file_name):
        read_file_contents = {}

        file_path = '/home/sakthi/custom/sakthi/pro1000_backend/frontend_files/web-app/all_general_files/' + file_name + '.txt'

        fp = open(file_path, 'r')
        fp_content = fp.read()
        return fp_content


