"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

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


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/upload_avatar/', methods=['PUT'])
def upload_avatar():


    image_url = request.json.get('image_url', None)

    uploader = cloudinary.uploader.upload(image_url, unique_filename = False, overwrite=True)
    image_info = cloudinary.api.resource(uploader["public_id"]) ## Get image via a randomly generated public_id.
    
     # Create an image tag with transformations applied to the src URL.
    transformed_image = cloudinary.CloudinaryImage(image_info["public_id"])\
                                    .image(transformation=[{'gravity': "face", 'height': 300, 'width': 300, 'crop': "fill"},
                                                           {'radius': "max"}]
                                            )

    start_idx = transformed_image.index('"')
    end_idx = transformed_image.rindex('"')
    transformed_image_url = transformed_image[start_idx+1:end_idx]


    response_body = {
        "transformedImage": transformed_image_url
    }

    return jsonify(response_body), 200