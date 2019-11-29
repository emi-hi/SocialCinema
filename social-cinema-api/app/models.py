import jwt
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

key = 'MOVETHISSOMEWHERE'

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64), unique=True)
  icon = db.Column(db.String(128))
  password_hash = db.Column(db.String(128))
  genres = db.relationship('Genre', secondary='user_genres')
  movie_favs = db.relationship('Movie', secondary='favorited_movies')
  movie_laters = db.relationship('Movie', secondary='later_movies')

  def __repr__(self):
    return "<User {}>".format(self.name)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password_hash, password)

  def generate_token(self, user_id):
    encoded = jwt.encode({'sub': user_id}, key, algorithm='HS256')
    return encoded

  def decode_token(token):
    payload = jwt.decode(token, key)

    return payload['sub']

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

class Movie(db.Model):
  __tablename__ = 'movies'
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(64))
  movie_api_id = db.Column(db.String(64), unique=True)
  imdb_id = db.Column(db.String(64))
  image = db.Column(db.String(64))
  description = db.Column(db.Text)
  user_favs = db.relationship('User', secondary='favorited_movies')
  user_laters = db.relationship('User', secondary='later_movies')

  def __repr__(self):
    return "<Movie {}>".format(self.title)

class Favorited_movie(db.Model):
  __tablename__ = 'favorited_movies'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
  user = db.relationship(User, backref=db.backref("favorited_movies", cascade="all, delete-orphan"))
  movie = db.relationship(Movie, backref=db.backref("favorited_movies", cascade="all, delete-orphan"))

class Later_movie(db.Model):
  __tablename__ = 'later_movies'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
  user = db.relationship(User, backref=db.backref("later_movies", cascade="all, delete-orphan"))
  movie = db.relationship(Movie, backref=db.backref("later_movies", cascade="all, delete-orphan"))

  def __repr__(self):
    return "<Later_movie {}>".format(self.movie_id)
