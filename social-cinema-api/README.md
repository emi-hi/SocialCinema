# Social Cinema API

This is the API for Socail Cinema.

## Setup

This is designed to be used together with the Social Cinema app found here.

1. Run pip install -r requirements.txt
2. Create a postgres database to use
3. Create a .env file by copying the format of .env.example
4. From the project root run: export FLASK_APP=socialsinema.py
5. Run flask db init, flask db migrate and flask db upgrade
6. Execute python genres.py
7. Launch the api with flask run

To confirm the app is running visit httpl://localhost:5000/api/genres and you should see a json formated string of genres.

