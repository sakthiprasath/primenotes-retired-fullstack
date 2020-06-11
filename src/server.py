#! /usr/bin/env python3
import logging
from flask import Flask, request, jsonify

from flask_rest_api import Api
import traceback
from http.client import HTTPException
from src.rest.routes.individual_component_fetcher import individual_component_fetcher_routes

# Instantiate loggers
flask_logger = logging.getLogger('werkzeug')

app = Flask(__name__)


app.config['OPENAPI_VERSION'] = '3.0.2'
api = Api(app)

api.register_blueprint(individual_component_fetcher_routes)



@app.before_request
def validate_access_token():
    # test_tenant = get_test_tenant()
    # if test_tenant is not None:
    #     set_tenant_info(test_tenant)
    #     return
    #
    # if "api" not in request.path or is_white_listed():
    #     return
    #
    # access_token = request.headers.get('Authorization')
    #
    # if access_token is None:
    #     access_token = request.cookies.get('access_token', None)
    #     if access_token is not None:
    #         access_token = "Bearer " + access_token
    #     else:
    #         raise AuthException(code=401, response={"message": "No Authorization with Bearer token is found"})
    #
    # if access_token is None:
    #     raise AuthException(code=401, response={ "message": "No Authorization with Bearer token is found"})
    # token_value = access_token[len(BEARER_PREFIX):]
    # if token_value == '':
    #     raise AuthException(code=401, response={"message": "Authorization Bearer token can not be empty or null"})
    #
    # #read tenant details and put on g - per request global object
    # request_domain = request.headers.get('X-Forwarded-Host', None)
    # set_data_from_token(token_value, request_domain)
    pass


#@app.before_request
def before():
    """
    Useful debugging interceptor to log all values posted to the endpoint
    """
    # values = 'values: '
    # if len(request.values) == 0:
    #     values += '(None)'
    # for key in request.values:
    #     values += key + ': ' + request.values[key] + ', '
    # app_logger.debug(values)
    pass

# error handler
@app.errorhandler(Exception)
def handle_error(e):
    # code = 500
    # err_msg = None
    # if isinstance(e, HTTPException):
    #     code = e.code
    # elif isinstance(e, AuthException):
    #     code = e.code
    #     err_msg = e.response
    # if err_msg is None:
    #     err_msg = {"status_code": code, "reason": "Server Error"}
    # return jsonify(err_msg), code
    pass




if __name__ == '__main__':
    app.run(host='0.0.0.0',   port='5000')
