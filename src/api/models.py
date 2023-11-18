from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    firstName = db.Column(db.String(80), unique=False, nullable=True)
    lastName = db.Column(db.String(80), unique=False, nullable=True)
    username = db.Column(db.String(80), unique=False, nullable=True)
    linkedIn = db.Column(db.String(200), unique=False, nullable=True)
    github = db.Column(db.String(200), unique=False, nullable=True)
    avatar = db.Column(db.String(200), unique=False, nullable=True)

    recipe = db.relationship('Recipe', lazy='subquery', secondary="favourite_recipes")

    def __repr__(self):
        return f'<User email: {self.email} | User id: {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar": self.avatar,
            "username": self.username,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "linkedIn": self.linkedIn,
            "github": self.github,
            # do not serialize the password, its a security breach
        }


class Recipe(db.Model):
    __tablename__ = 'recipe'

    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.Integer, unique=True, nullable=False)

    recipe_title = db.Column(db.String(80), unique=False, nullable=False)
    recipe_servings = db.Column(db.Integer, nullable=False)
    recipe_prep_time = db.Column(db.Integer, nullable=False)
    recipe_cost = db.Column(db.String(10), unique=False, nullable=False)
    recipe_diet = db.Column(db.String(80), unique=False, nullable=False)

    user = db.relationship('User', lazy='subquery', secondary="favourite_recipes")

    def __repr__(self):
        return f'<Recipe id: {self.external_id} | Recipe Title: {self.recipe_title}>'

    def serialize(self):
        return {
            "id": self.id,
            "recipe_external_id": self.external_id,
            "recipe_title": self.recipe_title,
        }


class FavouriteRecipes(db.Model):
    __tablename__ = 'favourite_recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipe_external_id = db.Column(db.Integer, db.ForeignKey('recipe.external_id'))

    user = db.relationship('User', lazy='subquery', backref=db.backref("favourite_recipes", cascade="all, delete-orphan"))
    recipe = db.relationship('Recipe', lazy='subquery', backref=db.backref("favourite_recipes", cascade="all, delete-orphan"))

    def __repr__(self):
        return f'<User id: {self.user} has Recipe id: {self.recipe_external_id} as a favourite.>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "recipe_external_id": self.recipe_external_id,
        }