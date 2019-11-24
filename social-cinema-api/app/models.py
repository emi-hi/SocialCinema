from app import db

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64), index=True)
  icon = db.Column(db.String(64))
  genres = db.relationship('Genre', secondary='user_genres')

  def __repr__(self):
    return "<User {}>".format(self.name)

class Genre(db.Model):
  __tablename__ = 'genres'
  id = db.Column(db.Integer, primary_key=True)
  genre_name = db.Column(db.String(64), unique=True)
  genre_api_id = db.Column(db.Integer, unique=True)
  users = db.relationship('User', secondary='user_genres')

  def __repr__(self):
    return "<Genre {}>".format(self.genre_name)

class User_genre(db.Model):
  __tablename__ = 'user_genres'
  id = db.Column(db.Integer, primary_key=True)
  preference = db.Column(db.Boolean)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
  user = db.relationship(User, backref=db.backref("user_genres", cascade="all, delete-orphan"))
  genre = db.relationship(Genre, backref=db.backref("user_genres", cascade="all, delete-orphan"))

  def __repr__(self):
    return "<User_genre {}>".format(self.preference)