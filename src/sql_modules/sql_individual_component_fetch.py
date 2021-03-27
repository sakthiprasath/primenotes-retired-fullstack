# from src.utils.database_connection_manager import DatabaseConnectionManager
import json
import os
from pytube import YouTube
import pathlib
import uuid

SQL_CODE_FETCH_QUERIES = {
    "get_all_configs": "select * from tenant_config"
}


class SQLIndividualComponent():
    def __init__(self, tenant_db_name=None, db_schema=None):
        # self.tenant_db_name = tenant_db_name
        # self.db_schema = db_schema
        # self.database_connection_manager = Databa seConnectionManager.get_instance()
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

    def create_file(self, data_map):
        file_type = data_map['file_type']
        file_name = data_map['file_name']
        create_type = data_map['create_type']
        folder_path = data_map['folder_path']
        uuid_file_name = str(uuid.uuid4())

        if file_type == 'document':
            folder_id = data_map.get('folder_id', None)
            if 'MY-ROOT' in folder_path:
                folder_path = folder_path[:-(len('MY-ROOT'))]
            if create_type == 'Folder':
                res_file_path = folder_path + '/' + file_name
            else :
                res_file_path = folder_path + '/' + (uuid_file_name + '.json')


        elif file_type == 'file_factory':
            res_file_path = folder_path + '/' + (uuid_file_name + '.json')


        if create_type == 'Folder':
            if not os.path.exists(res_file_path):
                os.makedirs(res_file_path)
        elif create_type == 'File':
            fp = open(res_file_path, 'w+')
            fp.write(json.dumps({
                "name": file_name,
                "content": "the data goes here"
            }))

        return {
            "uuid_file_name" : uuid_file_name,
            "name" : file_name,
            "folder_path" : folder_path
        }


    def save_file_factory(self, data):
        file_key = data['file_key']
        savable_data = json.dumps({
            'name' : data['name'],
            'content' : data['content']
        })
        fp = open('../frontend_files/web-app/all_general_files/file_factory/' + self._add_json_extension(file_key), 'w')

        fp.write(savable_data)

    def result_write(self, file_path, file_data):

        fp = open(file_path, 'w')
        fp.write(file_data)

    def rename_quick_note_file(self, req_json):
        fp = open('../frontend_files/web-app/all_general_files/file_factory/' + self._add_json_extension(req_json['file_key']), 'r')
        fp_content = json.loads(fp.read())
        fp_content['name'] = req_json['name']
        fp.close()

        fp = open('../frontend_files/web-app/all_general_files/file_factory/' + self._add_json_extension(req_json['file_key']), 'w')
        fp.write(json.dumps(fp_content))
        fp.close()

    def rename_tree_note_file(self, req_json):

        fp = open('../frontend_files/web-app/all_general_files/file_factory/' + self._add_json_extension(
            req_json['file_key']), 'r')
        fp_content = json.loads(fp.read())
        old_path = req_json['old_path']
        new_path = req_json['new_path']
        fp.close()

        fp = open('../frontend_files/web-app/all_general_files/file_factory/' + self._add_json_extension(
            req_json['file_key']), 'w')
        fp.write(json.dumps(fp_content))
        fp.close()

    def delete_file(self, file_key):

        file_path = '../frontend_files/web-app/all_general_files/file_factory/' + self._add_json_extension(file_key)

        os.remove(file_path)

    def delete_project_file(self, category, file_path):
        os.remove(file_path)

    def get_file_data(self, file_path):

        # if category == 'separate_project':
        #     file_name = 'Root\\My_Files\\' + file_name
        # file_path = '../frontend_files/web-app/all_general_files/' + file_name

        file_path =  file_path
        fp = open(file_path, 'r')
        fp_content = fp.read()
        return fp_content

    def download_youtube_videos(self, link, video_name):

        yt = YouTube(link)
        # print(yt.title)
        stream = yt.streams.first()
        stream.download('./static/videos/', video_name)

    def all_video_files(self):
        path = './static/videos/'
        files = os.listdir(path)
        return files

    def _remove_json_extension(self, file_name):
        return file_name[:-(len('.json'))]

    def _add_json_extension(self, file_name):
        return str(file_name) + '.json'

    def get_all_file_factory_contents(self):
        path = '../frontend_files/web-app/all_general_files/file_factory'
        files = os.listdir(path)
        file_contents = []
        for filename in files:
            fp = open(path + '/' + filename, 'r')
            fp_content = json.loads(fp.read())
            file_contents.append({
                'uuid_file_name': self._remove_json_extension(filename),
                'name': fp_content['name'],
                'content': fp_content['content']
            })
            # print(file_contents)
            fp.close()

        return file_contents

    def all_files(self, file_type):
        file_path_and_files_dict = {}
        path = '../frontend_files/web-app/all_general_files/' + file_type
        files = os.listdir(path)

        # file_list =  [file[:-(len('.txt'))]  for file in files ]
        file_path_and_files_dict['file_path'] = path
        file_path_and_files_dict['files'] = files
        return file_path_and_files_dict

    def list_dirs(self, path):
        temp_map = {}
        temp_map['files'] = []
        # print(path)
        for p in pathlib.Path(path).iterdir():
            if p.is_file():
                temp_map['files'].append(p.__str__())
            if p.is_dir():
                temp_map[p.__str__()] = self.list_dirs(p.__str__())
        return temp_map

    def get_tree(self):
        path = '../frontend_files/web-app/all_general_files/separate_project'
        data = self.list_dirs(path)
        return data