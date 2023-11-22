"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Recipe, FavouriteRecipes
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
    response_body = {
        "user": user.serialize(),
        "access_token": access_token
    }
    return jsonify(response_body)


@api.route('/get_user/', methods=['GET'])
@jwt_required()
def get_user():

    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    response_body = {
        "user": current_user.serialize()
    }

    return jsonify(response_body), 200


@api.route('/update_user/', methods=['PUT'])
@jwt_required()
def update_user():

    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    current_user.email = request.json.get('email')
    current_user.avatar = request.json.get('avatar')
    current_user.name = request.json.get('name')
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


@api.route('/upload_avatar/', methods=['PUT'])
@jwt_required()
def upload_avatar():

    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

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


@api.route('/add_favourite/', methods=['POST'])
@jwt_required()
def add_favourite():

    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    recipe_id = request.json.get('recipeId')
    recipe = Recipe.query.filter_by(external_id=recipe_id).first()

    if not recipe:
        recipe_title = request.json.get('recipeTitle')
        recipe_image = request.json.get('recipeImage')
        recipe_servings = request.json.get('recipeServings')
        recipe_prep_time = request.json.get('recipePrepTime')
        recipe_cost = request.json.get('recipeCost')
        recipe_diet = request.json.get('recipeDiet')

        recipe = Recipe(external_id=recipe_id, recipe_title=recipe_title, recipe_image=recipe_image,
                        recipe_servings=recipe_servings, recipe_prep_time=recipe_prep_time,
                        recipe_cost=recipe_cost, recipe_diet=recipe_diet)

        db.session.add(recipe)
        db.session.commit()
    
    
    user_favourites = FavouriteRecipes.query.filter_by(user_id=current_user.id, recipe_external_id=recipe.external_id).first()
    if not user_favourites:
        db.session.add(FavouriteRecipes(user_id=current_user.id, recipe_external_id=recipe.external_id))
        db.session.commit()
        return jsonify({ "message": f"'Recipe {recipe_id}' as been successfully added to '{current_user}'" }), 200


    return jsonify({ "message": f"'Recipe {recipe_id}' was already in '{current_user}' favourites" }), 200


@api.route('/delete_favourite/', methods=['DELETE'])
@jwt_required()
def delete_favourite():

    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()
    recipe_id = request.json.get('recipeId')

    favourite = FavouriteRecipes.query.filter_by(recipe_external_id=recipe_id).filter_by(user_id=current_user.id).first()
    if favourite:
        db.session.delete(favourite)
        db.session.commit()
        return jsonify({"message": f"'Recipe {favourite.recipe.external_id}' deleted from 'User '{favourite.user.id}' favourites."}), 200
    
    return jsonify({"message": f"Nothing to delete: 'Recipe {recipe_id}' is not in user 'User {current_user.id}' favourites."}), 200


@api.route('/get_favourites/', methods=['GET'])
@jwt_required()
def get_user_favourites():
    
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    favourite_recipes = current_user.recipe
    favourite_recipes = [fav_recipe.serialize() for fav_recipe in favourite_recipes]

    return jsonify({ "favourite_recipes": favourite_recipes }), 200
