from flask_rest_api import Blueprint
import  flask
from flask import jsonify , after_this_request
from flask import request
import json
from src.sql_modules.sql_individual_component_fetch import  SQLIndividualComponent
# from src.utils.database_connection_manager import get_test_tenant_details


individual_component_fetcher_routes = Blueprint('individual_component_fetcher', __name__, url_prefix='/api/individual-component-fetch')

@individual_component_fetcher_routes.route('screen-recorder', methods=['GET'])
def return_index_html():
    try:
       return  flask.render_template('ScreenSharing.html')
    except Exception as e:
        return print(e)


@individual_component_fetcher_routes.route('<html_name>', methods=['GET'])
def return_index_html(html_name):
    try:
        if html_name == "index":
            return  flask.render_template('CompanyProRecover.html')
        elif html_name == "create_component":
            return flask.render_template('IndividualComponent.html')
        elif html_name == "file_manage":
            return flask.render_template('FileManagerPro.html')
        elif html_name == "summer_note":
            return flask.render_template('SummerNote.html')

    except Exception as e:
        return print(e)





@individual_component_fetcher_routes.route('<component_key>', methods=['GET'])
# @tenant_config_routes.response(TenantConfigSchema(many=True), code=200)
@individual_component_fetcher_routes.doc(summary='Get all settings for the Tenant',
                                         description='Returns list of all settings with key and value string')
def fetch_individual_component_codes(component_key):
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        #tenant_db_name, schema_name, tenant_id, tenant_name = get_test_tenant_details()
        file_contents = SQLIndividualComponent().get_all_configs(component_key)
        return jsonify(file_contents)
    except Exception as e:
        return print(e)




@individual_component_fetcher_routes.route('create-file/', methods=['POST'])
def create_file():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        data_map = request.get_json()
        ret_dict = SQLIndividualComponent().create_file(data_map)
        return jsonify(ret_dict), 200
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('save-file-factory', methods=['POST'])
def save_file():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        data = request.get_json(force=True)
        SQLIndividualComponent().save_file_factory(data)
        return jsonify(data)
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('save-file', methods=['POST'])
def save_file():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        file_path = request.args.get('file_path')
        file_data = request.get_json(force=True)
        SQLIndividualComponent().result_write(file_path, file_data)
        return jsonify('save_success')
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('rename-file/<category>', methods=['POST'])
def rename_quick_file_file(category):
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        req_json = request.get_json(force=True)
        SQLIndividualComponent().rename_quick_note_file(req_json)
        return jsonify('rename_success')
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('rename-tree-note-file', methods=['POST'])
def rename_tree_note_file():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        req_json = request.get_json(force=True)
        SQLIndividualComponent().rename_tree_note_file(req_json)
        return jsonify('rename_success')
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('delete-file/file-factory/<file_key>/', methods=['DELETE'])
def delete_file(file_key):
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        SQLIndividualComponent().delete_file(file_key)
        return jsonify('save_success')
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('delete-project-file/<category>', methods=['DELETE'])
def delete_project_file(category):
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        file_path = json.loads(request.args.get('file_path'))
        file_data = SQLIndividualComponent().delete_project_file(category, file_path)
        return jsonify('delete_success')
    except Exception as e:
        return print(e)


@individual_component_fetcher_routes.route('/general_files/<category>', methods=['GET'])
def get_file_data(category):
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    try:
        file_path = json.loads(request.args.get('file_path'))
        file_data = SQLIndividualComponent().get_file_data(file_path)
        return file_data
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('download-youtube-video', methods=['POST'])
def download_youtube_video():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:
        json_inputs = request.get_json(force=True)
        link = json_inputs['link']
        name = json_inputs['name']

        SQLIndividualComponent().download_youtube_videos(link, name)
        return jsonify('download_success')
    except Exception as e:
        return print(e)


@individual_component_fetcher_routes.route('get-all-file-factory-contents', methods=['GET'])
def get_file_factory_contents():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:

        files = SQLIndividualComponent().get_all_file_factory_contents()
        return jsonify(files), 200
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('get-all-files/<file_type>', methods=['GET'])
def get_files(file_type):
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:

        files = SQLIndividualComponent().all_files(file_type)
        return jsonify(files), 200
    except Exception as e:
        return print(e)

@individual_component_fetcher_routes.route('tree', methods=['GET'])
def get_tree():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:

        ret_dict = SQLIndividualComponent().get_tree()
        return jsonify(ret_dict), 200
    except Exception as e:
        return print(e)


@individual_component_fetcher_routes.route('get-all-videos', methods=['GET'])
def get_all_video_files():
    @after_this_request
    def add_header(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    try:

        files = SQLIndividualComponent().all_video_files()
        return jsonify(files), 200
    except Exception as e:
        return print(e)



