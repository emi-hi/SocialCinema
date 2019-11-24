# routes.py
from flask import Flask, render_template, request
from flask import current_app as app

app = Flask(__name__)


ENV = "dev"

if ENV == "dev":
  app.debug = True

  app.config.from_object('config.Config')

  # app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://development:development@localhost/social_cinema"
  # app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}/{}".format(os.getenv("PGUSER"), os.getenv("PGPASSWORD"), os.getenv("PGHOST"), os.getenv("PGDATABASE"))
else:
  app.debug = False

# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

@app.route("/")
def index():

  return render_template("index.html")

@app.route("/hello")
def hello():
  return "Hello World!"

if __name__ == "__main__":
  app.run()

# env_path = Path("../") / ".env"

# load_dotenv()

# app = Flask(__name__)




# data = Users("Fred", "Neh", "b@b.c", "the")

# db.session.add(data)
# db.session.commit()