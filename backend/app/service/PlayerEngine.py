from nba_api.stats.endpoints import playercareerstats, shotchartdetail, playerdashptshots, playerdashptpass, playerdashptshotdefend

class PlayerEngine:
  @staticmethod
  def getCareerStats(playerId, perMode="PerGame"):
    # send call
    playerCareerStatsResult = playercareerstats.PlayerCareerStats(per_mode36=perMode, player_id=playerId)
    
    regularSeason = playerCareerStatsResult.season_totals_regular_season.get_dict()
    
    postSeason = playerCareerStatsResult.season_totals_post_season.get_dict()
    seasonToStatMap = {}
    unWantedFields = {"PLAYER_ID", "PLAYER_AGE", "LEAGUE_ID", "TEAM_ID", "TEAM_ABBREVIATION", "SEASON_ID"}
    
    # populate regular season data
    regularSeasonIndex = regularSeason['headers'].index("SEASON_ID")
    for season in regularSeason['data']:
      currentSeason = season[regularSeasonIndex]
      if currentSeason not in seasonToStatMap:
        seasonToStatMap[currentSeason] = {}
      for idx in range(len(season)):
        header = regularSeason['headers'][idx]
        value = season[idx]
        if header not in unWantedFields:
          seasonToStatMap[currentSeason][header] = {'reg': value, 'post': 0}
    
    # fill in post season data
    postSeasonIndex = postSeason['headers'].index("SEASON_ID")
    for season in postSeason['data']:
      currentSeason = season[postSeasonIndex]
      for idx in range(len(season)):
        header = regularSeason['headers'][idx]
        value = season[idx]
        if header not in unWantedFields:
          seasonToStatMap[currentSeason][header]['post'] = value

    return seasonToStatMap

  def getShotChartDetail(self):
    pass
