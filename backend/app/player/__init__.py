from flask import Blueprint

# __name__ has name of current module
# bp obj has routes and functions to plug into flask app
bp = Blueprint('player', __name__)

from app.player import routes