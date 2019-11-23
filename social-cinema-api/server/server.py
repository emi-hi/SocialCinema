# server.py
from flask import Flask, render_template, request
from flask_cors import CORS
import requests
import json
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():

  genres = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]
  genre_index = (random.randint(0,18))
  genre = genres[genre_index]

  r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key=53312c532da4333f7a5578a89b56dfc5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}".format(genre))
  tmdb_result = json.loads(r.text)

  result_index = (random.randint(0, 10))

  selected_result = tmdb_result["results"][result_index]

  result_title = selected_result["original_title"]
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
  return "Hello World!"

if __name__ == "__main__":
  app.debug = True
  app.run()
  
