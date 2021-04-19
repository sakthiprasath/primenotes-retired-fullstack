#! /usr/bin/env python3
import logging
from flask import Flask
from flask_rest_api import Api
from src.rest.routes.individual_component_fetcher import individual_component_fetcher_routes
from src.rest.routes.tree_note_routes import tree_note_routes


flask_logger = logging.getLogger('werkzeug')
app = Flask(__name__)
app.config['OPENAPI_VERSION'] = '3.0.2'
api = Api(app)

api.register_blueprint(individual_component_fetcher_routes)
api.register_blueprint(tree_note_routes)

@app.before_request
def validate_access_token():
    pass

#@app.before_request
def before():
    """
    Useful debugging interceptor to log all values posted to the endpoint
    """
    pass

# error handler
@app.errorhandler(Exception)
def handle_error(e):
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0',   port='5000')
