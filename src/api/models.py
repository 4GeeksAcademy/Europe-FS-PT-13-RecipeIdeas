from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
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

