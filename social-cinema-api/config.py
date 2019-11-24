from os import environ

class Config:
  TESTING = environ.get('TESTING')
  FLASK_DEBUG = environ.get('FLASK_DEBUG')

  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://development:development@localhost/social_cinema'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  