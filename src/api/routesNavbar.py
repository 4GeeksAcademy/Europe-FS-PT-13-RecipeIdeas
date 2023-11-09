"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.modelsNavbar import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import hashlib

api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    m = hashlib.sha256()
    m.update(bytes(password, 'utf-8'))
    passwordhash = m.hexdigest()
    user = User.query.filter_by(
        email=email, password=passwordhash).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/token", methods=["GET"])
@jwt_required()
def get_hello():

    email = get_jwt_identity()

    dictionary = {
        "message": "hello" + email
    }

    return jsonify(dictionary)


@api.route("/signup", methods=["POST"])
def create_signup():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    m = hashlib.sha256()
    m.update(bytes(password, 'utf-8'))
    passwordhash = m.hexdigest()
    user = User(name=name, email=email, password=passwordhash)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize())
