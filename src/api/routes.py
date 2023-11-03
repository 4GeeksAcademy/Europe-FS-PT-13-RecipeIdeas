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
import cloudinary.api as cld_api

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


@api.route('/upload_avatar', methods=['POST'])
def upload_avatar():

    uploader = cloudinary.uploader.upload("https://picsum.photos/500/500", unique_filename = False, overwrite=True)
    image_info = cloudinary.api.resource(uploader["public_id"]) ## Get image via a randomly generated public_id.
    print("****3. Get and use details of the image****\nUpload response:\n", json.dumps(image_info,indent=4), "\n")
    
     # Create an image tag with transformations applied to the src URL.
    transformed_image_url = cloudinary.CloudinaryImage(image_info["public_id"])\
                                    .image(transformation=[{'gravity': "face", 'height': 300, 'width': 300, 'crop': "fill"},
                                                           {'fetch_format': "jpg,png"},
                                                           {'radius': "max"}]
                                            )

      # Log the image tag to the console
    print("****4. Transform the image****\nTransfrmation URL: ", transformed_image_url, "\n")

    response_body = {
        "message": image_info
    }

    return jsonify(response_body), 200