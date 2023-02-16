# tut
# https://www.digitalocean.com/community/tutorials/how-to-structure-a-large-flask-application-with-flask-blueprints-and-flask-sqlalchemy#step-2-creating-a-configuration-file
from flask import Flask
from flask import request
from flask_cors import CORS
# import os 
from config import Config
# blueprints
from app.player import bp as player_bp
from app.team import bp as team_bp


# STACKING ROUTES
# @app.route("/")
# @app.route("/home")
# @app.route("/index")
# def home():
#     return "Hello World!"

# DIFFERENT ROUTES
# @app.route('/user/<username>')
# def show_user_profile(username):
#     # show the user profile for that user
#     return f'User {escape(username)}'

# @app.route('/<int:year>/<int:month>/<title>')
# def article(year, month, title):
#     # Logic goes here


# REQUESTS
# request.method: Contains the method used to access a route, such as GET or POST. request.method is absolutely essential for building smart routes: we can use this logic to have one route serve multiple different responses depending on what method was used to call said route. This is how REST APIs provide different results on a GET request versus a POST request ( if request.method == 'POST': can open a block only pertaining to POST requests in our route).
# request.args: Contains the query-string parameters of a request that hit our route. If we're building an endpoint that accepts a url parameter, for example, we can get this from the request as request.args.get('url’).
# request.data: Returns the body of an object posted to a route.
# request.form: If a user hits this route as a result of form submission, request.form is our way of accessing the information the form posted. For example, to fetch the provided username of a submitted form, request.form['username'] is used.
# request.headers: Contains the HTTP response headers of a request.

# RESPONSES
# json response: just return dict or list --> will be converted to json
# or use serializer: app.json.dumps(), app.json.response()
# make_response() allows us to serve up information while also providing a status code (such as 200 or 500), 
# make_response(
#         'Test worked!', // body: JSON or string
#         200, //HTTP CODE
#         headers=headers /optionally pass response headers
#     )


# redirect to path
# redirect('/dashboard.html') // can be url

def create_app(config_class=Config):
    app = Flask(__name__)
    print("app file route: ", __file__)
    # do some config: app.config.from_object(config_class)
    # app.config.from_mapping(
    #         SECRET_KEY=os.environ.get('SECRET_KEY')
    # )
    # alternative config method
    app.config.from_object(config_class)
    
    # Init flask extensions
    # TODO: fix when deploy
    #https://flask-cors.corydolphin.com/en/latest/api.html#extension
    # caches query results for 1 day = 86400 s
    CORS(app,resources=[r'/team/*', r'/player/*'], origins=["http://localhost:3000"],methods=["GET","POST"],  max_age=86400)
    
    # Register blueprints for different routes here
    # blueprints
    app.register_blueprint(player_bp, url_prefix="/player")
    app.register_blueprint(team_bp, url_prefix="/team")

    @app.route('/')
    def root():
        app.logger.info("main route")
        return '<h1>This is main route</h1>'
    
    return app
