from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    firstName = db.Column(db.String(80), unique=False, nullable=True)
    lastName = db.Column(db.String(80), unique=False, nullable=True)
    userName = db.Column(db.String(80), unique=False, nullable=True)
    linkedIn = db.Column(db.String(200), unique=False, nullable=True)
    github = db.Column(db.String(200), unique=False, nullable=True)
    avatar = db.Column(db.String(200), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "avatar": self.avatar,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "linkedIn": self.linkedIn,
            "github": self.github,
            # do not serialize the password, its a security breach
        }

