from flask import request
from app.player import bp
from app.service.PlayerEngine import PlayerEngine

#/player/careerStat?playerId=XX
@bp.route('/careerStat')
def playerStat():
  try:
    playerId, perMode = int(request.args['playerId']), str(request.args['perMode'])
    return PlayerEngine.getCareerStats(playerId, perMode)
  except Exception as e:
    print(e) # add log
    return {}
