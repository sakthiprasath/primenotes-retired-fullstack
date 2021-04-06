

environment = "staging"
if environment != "local":
    root_file_factory = "frontend_files/web-app/all_general_files/file_factory/"
else:
    root_file_factory = "../frontend_files/web-app/all_general_files/file_factory/"
primenotes_data = {

    "root_file_factory": root_file_factory,

}