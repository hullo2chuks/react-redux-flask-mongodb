from flask import request, jsonify, g
from ..utils.auth import generate_token, requires_auth, verify_token
from ..models import User
from application import db
from ..api import api as api_bp


@api_bp.route("/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@api_bp.route("/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = db.User()
    user.email = incoming["email"]
    user.password = User.hashed_password(incoming["password"])

    try:
        user.save();
    except Exception:
        return jsonify(message="User with that email already exists"), 409

    new_user = db.User.find_one({'email':incoming["email"]})
    return jsonify(
        id=new_user.cuid,
        token=generate_token(new_user)
    )


@api_bp.route("/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"],db)

    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@api_bp.route("/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
