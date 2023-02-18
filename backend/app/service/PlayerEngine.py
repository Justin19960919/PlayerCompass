from nba_api.stats.endpoints import playercareerstats, shotchartdetail, playerdashptshots, playerdashptpass, playerdashptshotdefend
from nba_api.stats.static import players
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

  def getShotChartDetail(self):
    pass
