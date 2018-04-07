from flask import Blueprint, jsonify

api = Blueprint('api_db', __name__)

from . import users

api_bp = api

@api_bp.errorhandler(403)
def forbidden(error):
    pass
    #return render_template('errors/403.html', title='Forbidden'), 403

@api_bp.errorhandler(404)
def page_not_found(error):
    pass
    #return render_template('errors/404.html', title='Page Not Found'), 404

@api_bp.errorhandler(405)
def method_not_allowed(error):
    pass
    #return jsonify(message="Method Not Allowed for the requested URLee."), 401

@api_bp.errorhandler(500)
def internal_server_error(error):
    pass
    return render_template('errors/500.html', title='Server Error'), 500

@api_bp.before_request
def before_request():

    pass
    # check for Idle time & expiration
    # flask.g.user = current_user