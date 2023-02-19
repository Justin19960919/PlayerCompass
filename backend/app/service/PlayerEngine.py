from nba_api.stats.endpoints import playercareerstats, playerdashptshots, playerdashptpass
#shotchartdetail
#playerdashptshotdefend
from nba_api.stats.static import players

ONE_SEASON = 82

def nullCheck(num):
  return num if num else 0


class PlayerEngine:
  @staticmethod
  def getPlayerName(playerId):
    res = players.find_player_by_id(playerId)
    return res


  @staticmethod
  def getCareerStats(playerId, perMode="PerGame"):
    # print("got in call")
    # send call
    playerCareerStatsResult = playercareerstats.PlayerCareerStats(per_mode36=perMode, player_id=playerId)
    
    regularSeason = playerCareerStatsResult.season_totals_regular_season.get_dict()
    postSeason = playerCareerStatsResult.season_totals_post_season.get_dict()
    
    # seasonToStatMap = {}
    unWantedFields = {"PLAYER_ID", "PLAYER_AGE", "LEAGUE_ID", "TEAM_ID", "TEAM_ABBREVIATION", "SEASON_ID", "PF"}

    seasonToStatMap = {}
    seasons = []
    # populate regular season data
    regularSeasonIndex = regularSeason['headers'].index("SEASON_ID")
    for season in regularSeason['data']:
      currentSeason = season[regularSeasonIndex].split("-")[0][2:]
      seasons.append(currentSeason)
      if currentSeason not in seasonToStatMap:
        seasonToStatMap[currentSeason] = {}
      for idx in range(len(season)):
        header = regularSeason['headers'][idx]
        value = season[idx]
        if header not in unWantedFields:
          seasonToStatMap[currentSeason][header] = {'reg': value, 'playoffs': 0}
    
    # fill in post season data
    postSeasonIndex = postSeason['headers'].index("SEASON_ID")
    for season in postSeason['data']:
      # 2019->19
      currentSeason = season[postSeasonIndex].split("-")[0][2:] 
      for idx in range(len(season)):
        header = regularSeason['headers'][idx]
        value = season[idx]
        if header not in unWantedFields:
          seasonToStatMap[currentSeason][header]['playoffs'] = value

    # transform to chart data format
    # create new dict
    chartData = {}
    for key in regularSeason['headers']:
      if key not in unWantedFields:
        chartData[key] = []
    for season in seasons:
      if season in seasonToStatMap:
        for k, v in seasonToStatMap[season].items():
          chartData[k].append({
            "season": season,
            "regular": v['reg'],
            'playoffs': v['playoffs'],
          })
    # print("chart data: ", chartData)

    return {
      "chartData": chartData,
      "seasons": seasons,
      "currentSeason": {
        "headers": regularSeason['headers'],
        "data": regularSeason['data'][-1]
      },
    } 

  def getShootingData(playerId, teamId):
    
    def flattenShootingData(shootingData):
      try:
        # key
        mainKeyIndex = 5 
        # multistack barchart
        fg2aIndex = 13
        fg3aIndex = 17
        fg3pctIndex = 18
        fg2pctIndex = 14
        # piechart 1
        fgaFreqIndex = 6
        # piechart 2
        fg2aFregIndex = 11
        fg3aFreqIndex = 15

        flattenData = []
        # do null checks
        for data in shootingData['data']:
          flattenData.append({
            "key": data[mainKeyIndex],
            "FG2A": nullCheck(data[fg2aIndex]),
            "FG3A": nullCheck(data[fg3aIndex]),
            "FG2_PCT": nullCheck(data[fg2pctIndex]),
            "FG3_PCT": nullCheck(data[fg3pctIndex]),
            "FGA_FREQ": nullCheck(data[fgaFreqIndex]),
            "FG2A_FREQ": nullCheck(data[fg2aFregIndex]),
            "FG3A_FREQ": nullCheck(data[fg3aFreqIndex]),
          })
        return flattenData
      except Exception as e:
        print(e)

    def transformToPieChartFormat(flattenedData):
      pieChartData = []
      for data in flattenedData:
        pieChartData.append({
          "name": f"{data['key']} - FG2A",
          "value": nullCheck(data['FG2A_FREQ']),
        })
        pieChartData.append({
          "name": f"{data['key']} - FG3A",
          "value": nullCheck(data['FG3A_FREQ']),
        })
      return pieChartData
  
    dashPtShots = playerdashptshots.PlayerDashPtShots(player_id=playerId, team_id=teamId, last_n_games=ONE_SEASON)
    closest_defender_shooting = flattenShootingData(dashPtShots.closest_defender_shooting.get_dict())
    dribble_shooting = flattenShootingData(dashPtShots.dribble_shooting.get_dict())
    general_shooting = flattenShootingData(dashPtShots.general_shooting.get_dict())
    shot_clock_shooting = flattenShootingData(dashPtShots.shot_clock_shooting.get_dict())
    touch_time_shooting = flattenShootingData(dashPtShots.touch_time_shooting.get_dict())

    return {
      "closest_defender_shooting": {
        "barChart": closest_defender_shooting,
        "pieChart": transformToPieChartFormat(closest_defender_shooting),
      },
      "dribble_shooting": {
        "barChart": dribble_shooting,
        "pieChart": transformToPieChartFormat(dribble_shooting),
      },
      "general_shooting": {
        "barChart": general_shooting,
        "pieChart": transformToPieChartFormat(general_shooting),
      },
      "shot_clock_shooting": {
        "barChart": shot_clock_shooting,
        "pieChart": transformToPieChartFormat(shot_clock_shooting),
      },
      "touch_time_shooting": {
        "barChart": touch_time_shooting,
        "pieChart": transformToPieChartFormat(touch_time_shooting),
      }   
    }

  def getPassingData(playerId, teamId):
    def flatten(passData):
      keyIndex = 7
      passIndex = 10
      astIndex = 11
      fgPct = 14
      res = []
      if 'data' in passData:
        for data in passData['data']:
          res.append({
            "player": data[keyIndex],
            "pass": data[passIndex],
            "ast": data[astIndex],
            "fgPct": data[fgPct],
          })
      res.sort(key=lambda x: x['pass'] if 'pass' in x else x, reverse=True)
      return res

    passData = playerdashptpass.PlayerDashPtPass(last_n_games=ONE_SEASON, player_id=playerId, team_id=teamId)
    return {
      "made": flatten(passData.passes_made.get_dict()),
      "received": flatten(passData.passes_received.get_dict()),
    }
    



