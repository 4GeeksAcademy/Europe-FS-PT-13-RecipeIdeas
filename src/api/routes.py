"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import hashlib

import cloudinary
import cloudinary.uploader
import cloudinary.api

api = Blueprint('api', __name__)

global CLOUD_NAME

CLOUD_NAME=os.environ.get("CLOUD_NAME")
API_KEY=os.environ.get("API_KEY")
API_SECRET=os.environ.get("API_SECRET")

cloudinary.config( 
    cloud_name = CLOUD_NAME, 
    api_key = API_KEY, 
    api_secret = API_SECRET,
    secure = True
)


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

@api.route('/update_user/', methods=['PUT'])
def update_user():

    current_user = User.query.get(1)

    current_user.email = request.json.get('email')
    current_user.avatar = request.json.get('avatar')
    current_user.firstName = request.json.get('firstName')
    current_user.lastName = request.json.get('lastName')
    current_user.username = request.json.get('username')
    current_user.linkedIn = request.json.get('linkedIn')
    current_user.github = request.json.get('github')

    db.session.add(current_user)
    db.session.commit()
    
    response_body = {
        "message": f"Users' {current_user.email} details have been changed: {current_user}",
    }

    return jsonify(response_body), 200


@api.route('/get_user/', methods=['GET'])
def get_user():
    current_user = User.query.filter_by(id=2).first()
    print(current_user)

    response_body = {
        "user": current_user.serialize()
    }

    return jsonify(response_body), 200

@api.route('/upload_avatar/', methods=['PUT'])
def upload_avatar():

    current_user = User.query.filter_by(id=2).first()
    image_url = request.json.get('image_url', None) # Get request body.

    uploader = cloudinary.uploader.upload(image_url, unique_filename = False, overwrite=True)
    image_info = cloudinary.api.resource(uploader["public_id"]) # Get image via a randomly generated public_id.
    
     # Create an image tag with transformations applied to the src URL.
    transformed_image = cloudinary.CloudinaryImage(image_info["public_id"])\
                                    .image(transformation=[{'gravity': "face", 'height': 300, 'width': 300, 'crop': "fill"},
                                                           {'radius': "max"}]
                                            )

    # Isolate URL string.
    start_idx = transformed_image.index('"')
    end_idx = transformed_image.rindex('"')
    transformed_image_url = transformed_image[start_idx+1:end_idx]


    current_user.avatar = transformed_image_url
    db.session.add(current_user)
    db.session.commit()

    response_body = {
        "message": f"Users {current_user} avatar changed to {transformed_image_url}",
        "avatar": transformed_image_url
    }

    return jsonify(response_body), 200

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
