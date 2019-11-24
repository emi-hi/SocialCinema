from . import db

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64), index=True)
  icon = db.Column(db.String(64))
  email = db.Column(db.String(64), unique=True)
  password = db.Column(db.String)
  
  def __init__(self, name, icon, email, password):
    self.name = name
    self.icon = icon
    self.email = email
    self.password = password

  def __repr__(self):
    return "<User {}>".format(self.name)

# class Genres(db.Model):
#   __tablename__ = "genres"
#   id = db.Column(db.Integer, primary_key=True)
#   genre_name = db.Column(db.String(64), unique=True)
#   genre_api_id = db.Column(db.Integer, unique=True)