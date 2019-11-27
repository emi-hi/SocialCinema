from app import app, db
from app.models import User, Genre, User_genre, Movie, Later_movie, Favorited_movie
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

@app.route("/suggestion", methods=['GET', 'POST'])
def suggestions():
  req = json.loads(request.data)
  user_genre_preferences = req['userGenrePreferences']

  user_loved_genres = []
  user_meh_genres = []
  user_hated_genres = []

  for genre in user_genre_preferences:
    if genre['preference'] == True:
      user_loved_genres.append(str(genre['id']))
    elif genre['preference'] == "":
      user_meh_genres.append(str(genre['id']))
    elif genre['preference'] == False:
      user_hated_genres.append(str(genre['id']))


  if len(user_meh_genres) == 0 and len(user_loved_genres) == 0:
    full_hate_info = {
      "title": "No Movie For You",
      "poster": "https://memecrunch.com/meme/233WY/sucks-to-be-you/image.png?w=623&c=1",
      "description": "It seems you are not the moving watching kind",
    }

    full_hate_info_json = json.dumps(full_hate_info)
    return full_hate_info_json

  print("GOT HERE")
  if len(user_hated_genres) > 1:
    hated_list = (",".join(user_hated_genres))
  elif len(user_hated_genres) == 1:
    hated_list = user_hated_genres[0]
  elif len(user_hated_genres) == 0:
    hated_list = "0"

  loved_random_index = (random.randint(0, (len(user_loved_genres) - 1)))

  all_results = []

  r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}&without_genres={}".format(TMDB_key, user_loved_genres[loved_random_index], hated_list))
  tmdb_result = json.loads(r.text)
  response_result_count = len(tmdb_result["results"])
  print("COUNT ", genre, "IS", response_result_count)

  if response_result_count > 0:
    all_results = all_results + (tmdb_result["results"])

  print("AFTER FOR LOOP ALL RESULTS LENGTH", (len(all_results)))

  if len(all_results) > 0:
    result_index = (random.randint(0, (len(all_results) - 1)))

    selected_result = all_results[result_index]

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

  # for genre in user_loved_genres:
  #   print("GENRE ", genre, " START")
  #   print("SEARCH IS THAT I WANT ", genre)
  #   print("AND NO WANT", hated_list)
  #   r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}&without_genres={}".format(TMDB_key, genre, hated_list))
  #   tmdb_result = json.loads(r.text)
  #   response_result_count = len(tmdb_result["results"])
  #   print("COUNT ", genre, "IS", response_result_count)

  #   if response_result_count > 0:
  #     all_results = all_results + (tmdb_result["results"])

  # print("AFTER FOR LOOP ALL RESULTS LENGTH", (len(all_results)))

  # if len(all_results) > 0:
  #   result_index = (random.randint(0, (len(all_results) - 1)))

  #   selected_result = all_results[result_index]

  #   result_title = selected_result["title"]
  #   result_poster = "https://image.tmdb.org/t/p/w500" + selected_result["poster_path"]
  #   result_description = selected_result["overview"]
  #   result_release_date = selected_result["release_date"]
  #   result_tmdb_id = selected_result["id"]

  #   movie_info = {
  #     "title": result_title,
  #     "poster": result_poster,
  #     "description": result_description,
  #     "release_date": result_release_date,
  #     "tmdb_id": result_tmdb_id
  #   }

  #   movie_info_json = json.dumps(movie_info)
  #   return movie_info_json
  
  else:
    if len(user_loved_genres) > 0:
      r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}".format(TMDB_key, user_loved_genres[0]))
    elif len(user_meh_genres) > 0:
      r = requests.get("https://api.themoviedb.org/3/discover/movie?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres={}".format(TMDB_key, user_meh_genres[0]))

  tmdb_result = json.loads(r.text)
  result_index = (random.randint(0, len(tmdb_result["results"]) - 1))

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
  
  res = {
    "users": user_list
  }
  res_json = json.dumps(res)

  return res_json

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

@app.route("/api/<user>/favmovies", methods=['GET', 'POST', 'DELETE'])
def userFavmovies(user):
  dbUser = User.query.filter(User.name == user).one_or_none()
  userFavMovies = dbUser.favorited_movies

  if request.method == 'POST':
    req = json.loads(request.data)
    title = req['movie']['title']
    image = req['movie']['poster']
    movie_api_id = req['movie']['tmdbId']
    
    new_movie = Movie.query.filter(Movie.movie_api_id == str(movie_api_id)).first()

    if new_movie == None:
      new_movie = Movie(title = title, movie_api_id = movie_api_id, image = image)    
      db.session.add(new_movie)
      db.session.commit()
      
    new_fave_movie = Favorited_movie(user_id = dbUser.id, movie_id = new_movie.id)
    db.session.add(new_fave_movie)
    db.session.commit()

  if request.method == 'DELETE':
    req = json.loads(request.data)

    remove_movie = Favorited_movie.query.filter(Favorited_movie.movie_id == req['id']).first()

    db.session.delete(remove_movie)
    db.session.commit()

  favorited_movies = []

  
  for fave_movie in dbUser.favorited_movies:
    favorited_movies.append(
      {
        "id": fave_movie.movie.id,
        "title": fave_movie.movie.title,
        "img": fave_movie.movie.image
      }
    )

  res = {
    "favorited_movies": favorited_movies
  }

  res_json = json.dumps(res)

  return res_json

@app.route("/api/<user>/latermovies", methods=['GET', 'POST', 'DELETE'])
def userLatemovies(user):

  dbUser = User.query.filter(User.name == user).one_or_none()
  userLaterMovies = dbUser.later_movies

  if request.method == 'POST':
    req = json.loads(request.data)

    title = req['suggestedMovie']['title']
    image = req['suggestedMovie']['poster']
    movie_api_id = req['suggestedMovie']['tmdbId']

    new_movie = Movie.query.filter(Movie.movie_api_id == str(movie_api_id)).first()

    if new_movie == None:
      new_movie = Movie(title = title, movie_api_id = movie_api_id, image = image)    
      db.session.add(new_movie)
      db.session.commit()

    new_later_movie = Later_movie(user_id = dbUser.id, movie_id = new_movie.id)
    db.session.add(new_later_movie)
    db.session.commit()

  if request.method == 'DELETE':
    req = json.loads(request.data)

    remove_movie = Later_movie.query.filter(Later_movie.movie_id == req['id']).first()

    db.session.delete(remove_movie)
    db.session.commit()

  later_movies = []
  for later_movie in dbUser.later_movies:
    later_movies.append(
      {
        "id": later_movie.movie.id,
        "title": later_movie.movie.title,
        "img": later_movie.movie.image
      }
    )

  res = {
    "later_movies": later_movies
  }

  res_json = json.dumps(res)

  return res_json

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
  result_tmdb_id = first_result["id"]

  movie_info = {
    "title": result_title,
    "poster": result_poster,
    "description": result_description,
    "release_date": result_release_date,
    "tmdbId": result_tmdb_id
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

    for new_genre in req['genres']:
      genre = Genre.query.filter(Genre.genre_api_id == new_genre['id']).first()
      update_genre = User_genre(user_id = user.id, genre_id = genre.id)

      if new_genre['preference'] == "":
        update_genre.preference = None
      else:
        update_genre.preference = new_genre['preference']

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
  favorited_movies = []

  for fave_movie in user.favorited_movies:
    favorited_movies.append(
      {
        "id": fave_movie.movie.id,
        "title": fave_movie.movie.title,
        "img": fave_movie.movie.image
      }
    )
  res = {
    "user": userInfo,
    "genres": genres,
    "later_movies": later_movies,
    "favorited_movies": favorited_movies
  }

  res_json = json.dumps(res)

  return res_json
