from app import app, db
from app.models import User, Genre
from flask import request
from flask_cors import CORS
import requests
import json
import random
from flask import request

CORS(app)

@app.route("/suggestion")
def suggestions():

  genres = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]
  genre_index = (random.randint(0,18))
  genre = genres[genre_index]

  r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key=53312c532da4333f7a5578a89b56dfc5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}".format(genre))
  tmdb_result = json.loads(r.text)

  result_index = (random.randint(0, 10))

  selected_result = tmdb_result["results"][result_index]

  result_title = selected_result["title"]
  result_poster = "https://image.tmdb.org/t/p/w500" + selected_result["poster_path"]
  result_description = selected_result["overview"]
  result_release_date = selected_result["release_date"]

  movie_info = {
    "title": result_title,
    "poster": result_poster,
    "description": result_description,
    "release_date": result_release_date
  }

  movie_info_json = json.dumps(movie_info)
  return movie_info_json

@app.route("/hello")
def hello():
  u = User.query.all()[0]
  return "Hello World! {}".format(u.name)

@app.route("/api/users")
def users():
  users = User.query.all()
  user_list = []
  for user in users:
    user_list.append({"id":user.id, "name":user.name, "icon":user.icon})
  users_json = json.dumps(user_list)
  return users_json

@app.route("/api/genres")
def genres():
  genres = Genre.query.all()
  genre_arr = []
  for genre in genres:
    genre_arr.append({"id": genre.genre_api_id, "name": genre.genre_name})

  genres_json = json.dumps(genre_arr)
  return genres_json

@app.route("/movies/title/")
def title():
  movie_title = request.args['title']
  movies = requests.get("https://api.themoviedb.org/3/search/movie?api_key=53312c532da4333f7a5578a89b56dfc5&language=en-US&query={}&page=1&include_adult=false".format(movie_title))
  movies_dict = movies.json()
  first_result = movies_dict["results"][0]
  
  result_title = first_result["title"]
  result_poster = "https://image.tmdb.org/t/p/w500" + first_result["poster_path"]
  result_description = first_result["overview"]
  result_release_date = first_result["release_date"]

  movie_info = {
    "title": result_title,
    "poster": result_poster,
    "description": result_description,
    "release_date": result_release_date
  }

  movie_info_json = json.dumps(movie_info)

  return movie_info_json

@app.route("/login", methods=['GET', 'POST'])
def login():
  req = json.loads(request.data)

  user = User.query.filter(User.name == req['name']).one_or_none()
  if user == None:
    user = User(name=req['name'], icon="https://ui-avatars.com/api/?name={}".format(req['name']))
    db.session.add(user)
    db.session.commit()

  print(user.name)
  res = {
    "name": user.name,
    "avatar": user.icon
  }

  res_json = json.dumps(res)

  return res_json
