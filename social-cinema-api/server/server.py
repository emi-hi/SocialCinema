# server.py
import os

from dotenv import load_dotenv
from pathlib import Path
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

env_path = Path(".") / ".env"
print(env_path)
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)

ENV = "dev"

if ENV == "dev":
  app.debug = True
  print("I AM A BANANA")
  fruit = os.getenv("PGHOST")
  print(fruit)
  app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.getenv("PGUSER"), os.getenv("PGPASSWORD"), os.getenv("PGHOST"), os.getenv("PGDATABASE"))
else:
  app.debug = False

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)



@app.route("/")
def index():
  return render_template("index.html")

@app.route("/hello")
def hello():
  return "Hello World!"

if __name__ == "__main__":
  app.run()