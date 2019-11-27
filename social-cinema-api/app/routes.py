from app import app, db
from app.models import User, Genre, User_genre, Movie, Later_movie
from flask import request
from flask_cors import CORS
import requests
import json
import random
from flask import request
import dotenv
import os

dotenv.load_dotenv()
TMDB_key = os.getenv('TMDB_KEY')

CORS(app)

@app.route("/suggestion")
def suggestions():

  genres = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]
  genre_index = (random.randint(0,18))
  genre = genres[genre_index]

  r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}".format(TMDB_key, genre))
  tmdb_result = json.loads(r.text)

  result_index = (random.randint(0, 10))

  selected_result = tmdb_result["results"][result_index]

  result_title = selected_result["title"]
  result_poster = "https://image.tmdb.org/t/p/w500" + selected_result["poster_path"]
  result_description = selected_result["overview"]
  result_release_date = selected_result["release_date"]
  result_tmdb_id = selected_result["id"]

  movie_info = {
    "title": result_title,
    "poster": result_poster,
    "description": result_description,
    "release_date": result_release_date,
    "tmdb_id": result_tmdb_id
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

@app.route("/api/<user>/genres", methods=['GET', 'POST'])
def userGenres(user):
  user = User.query.filter(User.name == user).one_or_none()

  if request.method == 'POST':
    req = json.loads(request.data)

    genre = Genre.query.filter(Genre.genre_api_id == req['id']).first()

    update_genre = User_genre.query.filter(User_genre.user_id == user.id, User_genre.genre_id == genre.id).first()

    if not update_genre:
      update_genre = User_genre(user_id = user.id, genre_id = genre.id)

    if req['preference'] == "":
      update_genre.preference = None
    else:
      update_genre.preference = req['preference']

    db.session.add(update_genre)
    db.session.commit()

  genres = []

  for genre in user.user_genres:
    genres.append(
      {
        "id": genre.genre.genre_api_id,
        "preference": genre.preference
      }
    )

  res = {
    "genres": genres
  }

  res_json = json.dumps(res)

  return res_json

@app.route("/api/<user>/favmovies", methods=['GET', 'POST'])
def userFavmovies(user):

  return "potatoe"

@app.route("/api/<user>/latermovies", methods=['GET', 'POST'])
def userLatemovies(user):

  dbUser = User.query.filter(User.name == user).one_or_none()
  userLaterMovies = dbUser.later_movies

  if request.method == 'POST':
    req = json.loads(request.data)

    title = req['suggestedMovie']['title']
    image = req['suggestedMovie']['poster']
    movie_api_id = req['suggestedMovie']['tmdbId']

    og_movies = Movie.query.all()
    print(og_movies)

    new_movie = Movie(title = title, movie_api_id = movie_api_id, image = image)
    
    db.session.add(new_movie)
    db.session.commit()

    new_later_movie = Later_movie(user_id = dbUser.id, movie_id = new_movie.id)
    db.session.add(new_later_movie)
    db.session.commit()

  return "HAPPY"

@app.route("/movies/title/")
def title():
  movie_title = request.args['title']
  movies = requests.get("https://api.themoviedb.org/3/search/movie?api_key={}&language=en-US&query={}&page=1&include_adult=false".format(TMDB_key, movie_title))
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

  genres = []

  for genre in user.user_genres:
    genres.append(
      {
        "id": genre.genre.genre_api_id,
        "preference": genre.preference
      }
    )

  userInfo = {
    "name": user.name,
    "avatar": user.icon
  }

  later_movies = []

  for later_movie in user.later_movies:
    later_movies.append(
      {
        "id": later_movie.movie.id,
        "title": later_movie.movie.title,
        "img": later_movie.movie.image
      }
    )


  # later_movies = [
  #   {'id': 1, 'title': 'Titanic 2', 'img': 'images/movies/titanic.jpg' },
  #   {'id': 2, 'title': 'Scary Movie 2', 'img': 'images/movies/scary.jpg' }
  # ]
  
  res = {
    "user": userInfo,
    "genres": genres,
    "later_movies": later_movies
  }

  res_json = json.dumps(res)

  return res_json
