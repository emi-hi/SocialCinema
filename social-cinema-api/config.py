from os import environ

class Config:
  TESTING = environ.get('TESTING')
  FLASK_DEBUG = environ.get('FLASK_DEBUG')

  SQLALCHEMY_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI')
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  