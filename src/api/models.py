from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    lastName = db.Column(db.String(80), unique=False, nullable=True)
    username = db.Column(db.String(80), unique=False, nullable=True)
    linkedIn = db.Column(db.String(200), unique=False, nullable=True)
    github = db.Column(db.String(200), unique=False, nullable=True)
    avatar = db.Column(db.String(200), unique=False, nullable=True)

    recipe = db.relationship('Recipe', lazy='subquery', secondary="favourite_recipes")

    def __repr__(self):
        return f'<User id: {self.id} | User email: {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar": self.avatar,
            "username": self.username,
            "lastName": self.lastName,
            "linkedIn": self.linkedIn,
            "github": self.github,
            # do not serialize the password, its a security breach
        }


class Recipe(db.Model):
    __tablename__ = 'recipe'

    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.Integer, unique=True, nullable=False)

    recipe_title = db.Column(db.String(120), unique=False, nullable=False)
    recipe_image = db.Column(db.String(200), unique=False, nullable=False)
    recipe_servings = db.Column(db.Integer, unique=False,nullable=False)
    recipe_prep_time = db.Column(db.Integer, unique=False,nullable=False)
    recipe_cost = db.Column(db.String(10), unique=False, nullable=False)
    recipe_diet = db.Column(db.ARRAY(db.String), unique=False, nullable=False)

    user = db.relationship('User', lazy='subquery', secondary="favourite_recipes")

    def __repr__(self):
        return f'<Recipe id: {self.external_id} | Recipe Title: {self.recipe_title}>'

    def serialize(self):
        return {
            "id": self.id,
            "recipeExternalId": self.external_id,
            "recipeTitle": self.recipe_title,
            "recipeImage": self.recipe_image,
            "recipeServings": self.recipe_servings,
            "recipePrepTime": self.recipe_prep_time,
            "recipeCost": self.recipe_cost,
            "recipeDiet": self.recipe_diet,

        }


class FavouriteRecipes(db.Model):
    __tablename__ = 'favourite_recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipe_external_id = db.Column(db.Integer, db.ForeignKey('recipe.external_id'))

    user = db.relationship(User, lazy='subquery', backref=db.backref("favourite_recipes", cascade="all, delete-orphan"))
    recipe = db.relationship(Recipe, lazy='subquery', backref=db.backref("favourite_recipes", cascade="all, delete-orphan"))

    def __repr__(self):
        return f"FavouriteRecipe(user_id={self.user_id}, recipe_external_id_id={self.recipe_external_id})"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "recipe_external_id": self.recipe_external_id,
        }