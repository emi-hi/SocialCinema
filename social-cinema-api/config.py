from os import environ
import os
import dotenv

dotenv.load_dotenv()
DB_NAME = os.getenv('DB_NAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')

class Config:
  TESTING = environ.get('TESTING')
  FLASK_DEBUG = environ.get('FLASK_DEBUG')

  # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://development:development@localhost/social_cinema'
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{}:{}@localhost/social_cinema'.format(DB_NAME, DB_PASSWORD)
  SQLALCHEMY_TRACK_MODIFICATIONS = False
