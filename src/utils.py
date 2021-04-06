

environment = "staging"
if environment != "local":
    root_file_factory = "frontend_files/web-app/all_general_files/file_factory/"
    tree_note_root_path = "frontend_files/web-app/all_general_files/separate_project"
else:
    root_file_factory = "../frontend_files/web-app/all_general_files/file_factory/"
    tree_note_root_path = "../frontend_files/web-app/all_general_files/separate_project"
primenotes_data = {

    "root_file_factory": root_file_factory,

}