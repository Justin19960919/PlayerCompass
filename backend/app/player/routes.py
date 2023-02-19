from flask import request
from app.player import bp
from app.service.PlayerEngine import PlayerEngine

@bp.route('/')
def playerName():
  try:
    playerId = int(request.args['playerId'])
    return PlayerEngine.getPlayerName(playerId)
  except Exception as e:
    print(e)
    return {}

#/player/careerStat?playerId=XX
@bp.route('/careerStat')
def playerStat():
  try:
    playerId, perMode = int(request.args['playerId']), str(request.args['perMode'])
    return PlayerEngine.getCareerStats(playerId, perMode)
  except Exception as e:
    print(e) # add log
    return {}

#/player/shooting
@bp.route('/shooting')
def playerShootingStat():
  try:
    playerId, teamId = int(request.args['playerId']), int(request.args['teamId'])
    return PlayerEngine.getShootingData(playerId, teamId)
  except Exception as e:
    print(e)
    return {}
  
@bp.route("/passing")
def playerPassingStat():
  try:
    playerId, teamId = int(request.args['playerId']), int(request.args['teamId'])
    return PlayerEngine.getPassingData(playerId, teamId)
  except Exception as e:
    print(e)
    return {}