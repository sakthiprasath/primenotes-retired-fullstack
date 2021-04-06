import json
import uuid
from datetime import datetime
from src.sql_modules.utils.utils import _remove_json_extension, _add_json_extension
data = {
    "folder-uuid-14cb-4ec1-9fdc-0783951a365d": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1",
        "language": "document",
        "folder_type": "folder"
    },
    "folder-uuid-14cb-4ec1-9fdc-0783951a36512": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f2",
        "language": "document",
        "folder_type": "folder"
    },
    "folder-uuid-14cb-4ec1-9fdc-0783951a36532": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f3",
        "language": "document",
        "folder_type": "folder"
    },
    "folder-uuid-14cb-4ec1-9fdc-0783951a365345": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f11/f12",
        "language": "document",
        "folder_type": "folder"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365r": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f6/f7",
        "language": "python",
        "folder_type": "folder"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365aeqw": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f6",
        "language": "python",
        "folder_type": "folder"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365a12s": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f6/f6_file.json",
        "language": "python",
        "folder_type": "file"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365a12s12": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f6/f9",
        "language": "python",
        "folder_type": "folder"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365w321": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "f1/f6/f9/f9_file.json",
        "language": "python",
        "folder_type": "file"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365w31fd": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "q1",
        "language": "python",
        "folder_type": "folder"
    },
    "file-uuid-33cb-4ec1-9fdc-0783951a365w31fd121": {
        "date_created": "",
        "last_updated": "",
        "type": "code",
        "path": "q1/q1.json",
        "language": "python",
        "folder_type": "file"
    },

}
class TreeNote:
    def __init__(self):
        self.tree_note_root_path = '../frontend_files/web-app/all_general_files/separate_project'
        self.actual_files = 'actual-files'
        self.metadata_file_path = 'metadata'

    def get_folder_json(self, name, parent_path):
        now = str(datetime.now())
        sample_metadata = {
            "date_created": "",
            "last_updated": "",
            "file_type": "code",
            "path": "f1/f6/f9",
            "language": "python",
            "folder_type": "folder"
        }
        return {
                "date_created": now,
                "last_updated": now,
                "path": parent_path,
                "name": name,
                "folder_type": "folder",
        }
        # "path": self.tree_note_root_path + '/' + 'actual_files' + '/

    def get_file_json(self, name, type, parent_path):
        now = str(datetime.now())
        return {
            "date_created": now,
            "last_updated": now,
            "path": parent_path,
            "name": name,
            "type": type,
            "folder_type": "file",
        }

    def get_metadata(self):
        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        fp = open(metadata_path, 'r')
        data = json.loads(fp.read())
        fp.close()
        return data

    def write_metadata(self, data):
        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        fp = open(metadata_path, 'w')
        data = json.dumps(data)
        fp.write(data)
        fp.close()

    def get_file_data(self, file_uuid):
        file_path = self.tree_note_root_path + '/' + self.actual_files + '/' + _add_json_extension(file_uuid)

        fp = open(file_path, 'r')
        fp_content = fp.read()
        return fp_content

    def save_file_data(self, file_uuid, file_data):
        file_path = self.tree_note_root_path + '/' + self.actual_files + '/' + _add_json_extension(file_uuid)

        fp = open(file_path, 'w')
        fp.write(file_data)

    def move_to_tree_trash(self, type_uuid):
        metadata = self.get_metadata()
        metadata[type_uuid]['trash'] = True
        self.write_metadata(metadata)

    def rename(self, folder_uuid, new_name, path):
        metadata = self.get_metadata()

        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        with open(metadata_path, 'w') as f:
            metadata[folder_uuid]['name'] = new_name
            metadata[folder_uuid]['path'] = path
            f.write(json.dumps(metadata))

        return metadata[folder_uuid]

    def create_folder(self, name, parent_path):
        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        fp = open(metadata_path, 'r')
        data = fp.read()
        data = json.loads(data)
        fp.close()

        with open(metadata_path, 'w') as f:
            new_uuid = str(uuid.uuid4())
            data[new_uuid] = {}
            new_folder_json = self.get_folder_json(name, parent_path)
            data[new_uuid] = new_folder_json
            f.write(json.dumps(data))
            f.close()
        ret_dict = {"uuid": new_uuid, "name": name}
        ret_dict.update(new_folder_json)
        return ret_dict

    def create_file(self, name, type, parent_path):
        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        fp = open(metadata_path, 'r')
        data = fp.read()
        data = json.loads(data)
        fp.close()

        with open(metadata_path, 'w') as f:
            new_uuid = str(uuid.uuid4())
            data[new_uuid] = {}
            new_file_json = self.get_file_json(name, type, parent_path)
            data[new_uuid] = new_file_json
            f.write(json.dumps(data))
            f.close()

        new_file_path = self.tree_note_root_path + '/' + self.actual_files + '/' + new_uuid + '.json'
        new_file_pointer = open(new_file_path, 'x')
        new_file_pointer.write(json.dumps({'name': name, 'content': 'content goes here'}))
        new_file_pointer.close()
        ret_dict = {"uuid": new_uuid, "name": name}
        ret_dict.update(new_file_json)
        return ret_dict

    def copy_paste_file(self, old_file_uuid, new_path):
        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        fp = open(metadata_path, 'r')
        data = fp.read()
        data = json.loads(data)
        fp.close()

        with open(metadata_path, 'w') as f:
            new_uuid = str(uuid.uuid4())
            data[new_uuid] = {}
            new_file_json = self.get_file_json(data[old_file_uuid]['name'], 'file', new_path)
            data[new_uuid] = new_file_json
            f.write(json.dumps(data))
            f.close()

        old_file_path = self.tree_note_root_path + '/' + self.actual_files + '/' + old_file_uuid + '.json'
        with open(old_file_path, 'r') as fp:
            old_file_content = fp.read()
            fp.close()

        new_file_path = self.tree_note_root_path + '/' + self.actual_files + '/' + new_uuid + '.json'
        new_file_pointer = open(new_file_path, 'x')
        new_file_pointer.write(old_file_content)
        new_file_pointer.close()
        ret_dict = {"uuid": new_uuid, "name": data[new_uuid]['name']}
        ret_dict.update(new_file_json)
        return ret_dict

    def cut_paste_file(self, file_uuid, new_path):
        ret_dict = {}
        file_name_predessor = self.tree_note_root_path + '/' + self.metadata_file_path
        metadata_path = file_name_predessor + '/' + 'metadata.json'
        fp = open(metadata_path, 'r')
        data = fp.read()
        data = json.loads(data)
        data[file_uuid]['path'] = new_path
        fp.close()

        with open(metadata_path, 'w') as f:
            f.write(json.dumps(data))
            f.close()

        ret_dict = {"uuid": file_uuid}
        ret_dict.update(data[file_uuid])
        return ret_dict

    # def rename(self, file_uuid, name, path):
    #     file_name = self.tree_note_root_path + '/' + self.metadata_file_path + '/' + 'metadata.json'
    #
    #
    #     fp = open(file_name, 'r')
    #     data = json.loads(fp.read())
    #     fp.close()
    #
    #     with open(file_name, 'w') as f:
    #         data[file_uuid]['name'] = name
    #         f.write(json.dumps(data))
    #     rename data[file_uuid]

    def form_folder(self, fold_arr, n):
        return "/".join(fold_arr[:n])

    def get_node(self, tree, fold_arr, n):
        f_str = fold_arr[0]
        temp_node = tree.get(f_str, None)
        if temp_node is None:
            return None
        for i in range(1, n):
            f_str = f_str + '/' + fold_arr[i]
            print(f_str)
            if f_str not in temp_node.keys():
                return None
            temp_node = temp_node[f_str] #.get(f_str, None)

        return temp_node


    def create_key_value(self, tree, fold_arr, type, n, recur_bool):
        formed_folder = self.form_folder(fold_arr, n)
        if recur_bool == True:
            node = self.get_node(tree, fold_arr, n)
            if node is not None:
                if type == 'folder' and node == {}:
                    node = {"files": []}
                # else if type == 'file':
                #     formed_file = form_folder(fold_arr, n)
                #     node["files"].push()
                return node
        if n >= 2:
            sub_tree_node = self.create_key_value(tree, fold_arr, 'folder', n-1, True)
            if type == 'folder':
                if sub_tree_node is not None :
                    if formed_folder not in sub_tree_node.keys():
                        sub_tree_node[formed_folder] = {"files": []}
            elif type == 'file':
                if sub_tree_node is not None:
                    if formed_folder not in sub_tree_node["files"]:
                        sub_tree_node["files"].append(formed_folder) #this is file
            return sub_tree_node
        else:
            tree[formed_folder] = {"files": []}
            return tree[formed_folder]

    def get_path_uuid_dict(self):
        metadata = self.get_metadata()
        res_dict = {}
        for k, v in metadata.items():
            res_dict[metadata[k]['path']] = {"uuid":   k}
            res_dict[metadata[k]['path']].update(metadata[k])
        print(res_dict)
        return res_dict

    def main(self):
        tree = {}
        metadata = self.get_metadata()
        for k, v in metadata.items():
            path = metadata[k]['path']
            type = metadata[k]['folder_type']
            folder_arr = path.split('/')
            self.create_key_value(tree, folder_arr, type, len(folder_arr), False)

        path_uuid_dict = self.get_path_uuid_dict()
        print(tree)
        return [tree, path_uuid_dict]

# TreeNote().main()
# get_path_uuid_dict()



# obj = TreeNote()
# query_details = {
#     'file_uuid': 'f9cf32d7-59d5-4867-9f5b-6c0549974b1a',
#     'file_name': 'updated_file_name'
# }
# obj.rename(query_details)