"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import cloudinary

api = Blueprint('api', __name__)

CLOUD_NAME=os.environ.get("CLOUD_NAME")
API_KEY=os.environ.get("API_KEY")
API_SECRET=os.environ.get("API_SECRET")

print(CLOUD_NAME, API_KEY, API_SECRET)

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