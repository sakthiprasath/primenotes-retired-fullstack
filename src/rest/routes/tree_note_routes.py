from flask_rest_api import Blueprint
import flask
from flask import jsonify, after_this_request
from sql_modules.tree_note_crud import TreeNote
from flask import request

tree_note_routes = Blueprint('tree_note', __name__, url_prefix='/api/tree-note')


@tree_note_routes.route('rename-file', methods=['POST'])
def rename_file():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        input_json = request.get_json(force=True)
        obj = TreeNote()
        file_uuid = input_json['uuid']
        name = input_json['new_name']
        path = input_json['new_path']

        ret_dict = obj.rename_file(file_uuid, name, path)
        return jsonify(ret_dict), 200
    except Exception as e:
        return jsonify(ret_dict), 200
        return print(e)


@tree_note_routes.route('rename-folder', methods=['POST'])
def rename_folder():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        input_json = request.get_json(force=True)
        obj = TreeNote()
        old_path = input_json['old_path']
        new_path = input_json['new_path']
        new_name = input_json['new_name']
        uuid = input_json['uuid']

        ret_dict = obj.rename_folder(uuid, old_path, new_path, new_name)
        return jsonify(ret_dict), 200
    except Exception as e:
        return print(e)


@tree_note_routes.route('create-folder', methods=['POST', 'PUT'])
def create_file_folder():
    try:
        input_json = request.get_json(force=True)
        obj = TreeNote()
        name = input_json['file_name']
        path = input_json['folder_path']
        create_type = input_json["create_type"]
        file_type = input_json["file_type"]

        if create_type == "folder":
            ret_dict = obj.create_folder(name, path)
        else:
            ret_dict = obj.create_file(name, file_type,  path)
        return jsonify(ret_dict), 200
    except Exception as e:
        raise e

@tree_note_routes.route('copy-paste-file', methods=['POST', 'PUT'])
def copy_paste_file():
    try:
        input_json = request.get_json(force=True)
        obj = TreeNote()
        old_file_uuid = input_json['old_file_uuid']
        new_path = input_json["new_path"]

        ret_dict = obj.copy_paste_file(old_file_uuid, new_path)
        return jsonify(ret_dict), 200
    except Exception as e:
        raise e

@tree_note_routes.route('cut-paste-file', methods=['POST', 'PUT'])
def cut_paste_file():
    try:
        input_json = request.get_json(force=True)
        obj = TreeNote()
        old_file_uuid = input_json['file_uuid']
        new_path = input_json["new_path"]

        ret_dict = obj.cut_paste_file(old_file_uuid, new_path)
        return jsonify(ret_dict), 200
    except Exception as e:
        raise e

@tree_note_routes.route('get-tree-with-metadata', methods=['GET'])
def get_tree_with_metadata():
    try:
        obj = TreeNote()
        ret_tree = obj.main()
        return jsonify(ret_tree), 200
    except Exception as e:
        return print(e)

@tree_note_routes.route('get-file-data/<file_uuid>', methods=['GET'])
def get_file_data(file_uuid):
    try:
        obj = TreeNote()
        ret_data = obj.get_file_data(file_uuid)
        return jsonify(ret_data), 200
    except Exception as e:
        return print(e)

@tree_note_routes.route('save-file/<file_uuid>', methods=['POST'])
def save_file_data(file_uuid):
    try:
        obj = TreeNote()
        file_data = request.get_json(force=True)
        ret_data = obj.save_file_data(file_uuid, file_data)

        return jsonify(file_data), 200
    except Exception as e:
        return print(e)


@tree_note_routes.route('move-to-trash-tree-file-or-folder/<type_uuid>', methods=['DELETE'])
def move_to_tree_trash(type_uuid):
    try:
        obj = TreeNote()
        ret_data = obj.move_to_tree_trash(type_uuid)

        return jsonify({"Success": "File moved to Trash"}), 200
    except Exception as e:
        return print(e)

@tree_note_routes.route('starr-it/<type_uuid>', methods=['PUT', 'POSt'])
def starr_it(type_uuid):
    try:
        obj = TreeNote()
        ret_data = obj.starr_it(type_uuid)

        return jsonify({"Success": "File Starred"}), 200
    except Exception as e:
        return print(e)
