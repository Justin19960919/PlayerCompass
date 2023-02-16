from flask import request
from app.team import bp
from datetime import date
from nba_api.stats.endpoints import commonteamroster

# CommonTeamRoster.coaches()
# ros = commonteamroster.CommonTeamRoster(season=2022,team_id=1610612744)
# ros.get_dict()
# nd = ros.get_normalized_dict()
# roster = nd["CommonTeamRoster"]

def getSeason():
  SEASON_END_MONTH = 4
  SEASON_START_MONTH = 10
  y, m = date.today().year, date.today().month
  if m >= 10: return y
  else: return y - 1
 
#/?teamId=XXX
@bp.route('/')
def getTeamRoster():
  print('in team route')
  try:
    teamId = request.args['teamId']
    roster = commonteamroster.CommonTeamRoster(season=getSeason(), team_id=teamId).get_normalized_dict()
    players = roster['CommonTeamRoster']
    return list(map(lambda player: {
      'PLAYER_ID': player['PLAYER_ID'],
      'PLAYER': player['PLAYER'],
      'NUM': player['NUM'],
      'POSITION': player['POSITION'],
      'HEIGHT': player['HEIGHT'],
      'WEIGHT': player['WEIGHT'],
      'AGE': player['AGE'],
      'EXP': player['EXP'],
    }, players))
  except Exception as e:
    # what to return for Flask
    return {}
