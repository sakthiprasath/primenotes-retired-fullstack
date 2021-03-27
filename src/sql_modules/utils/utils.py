

def _remove_json_extension(file_name):
    return file_name[:-(len('.json'))]



def _add_json_extension(file_name):
    return str(file_name) + '.json'