from os import environ
import os
import dotenv

dotenv.load_dotenv()
DB_NAME = os.getenv('DB_NAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')

class Config:
  SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://{}:{}@localhost/social_cinema'.format(DB_NAME, DB_PASSWORD)
  SQLALCHEMY_TRACK_MODIFICATIONS = False
