import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_db(db):
  app = Flask(__name__)
  db.init_app(app)
  app.config.from_object('config.Config')

  

  db.drop_all()

  db.create_all()

# app.debug = True
# print("I AM A BANANA")
# fruit = os.getenv("PGHOST")
# print(fruit)

# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://development:development@localhost/social_cinema"
# # app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.getenv("PGUSER"), os.getenv("PGPASSWORD"), os.getenv("PGHOST"), os.getenv("PGDATABASE"))

# app.debug = False
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)

# db.drop_all()

# db.create_all()