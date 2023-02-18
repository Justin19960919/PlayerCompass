from nba_api.stats.endpoints import playercareerstats, playervsplayer, shotchartdetail, playerdashptshots, playerdashptpass, playerdashptshotdefend


# shot chart
# s=shotchartdetail.ShotChartDetail(player_id=201939, team_id=1610612744,context_measure_simple="FG_PCT")

#https://github.com/swar/nba_api/blob/master/docs/nba_api/stats/endpoints/playerdashptshots.md
# dashptShots = playerdashptshots.PlayerDashPtShots(
#   last_n_games="50",
#   per_mode_simple="PerGame",
#   team_id="1610612744",
#   player_id=201939,
# )
# print(dashptShots.overall.get_dict())
# print(dashptShots.shot_clock_shooting.get_dict())
# print(dashptShots.general_shooting.get_dict())
# print(dashptShots.dribble_shooting.get_dict()) # can get what type of shooting drrible, how many feet


#https://github.com/swar/nba_api/blob/master/docs/nba_api/stats/endpoints/playerdashptpass.md
#https://github.com/swar/nba_api/blob/master/src/nba_api/stats/endpoints/playerdashptpass.py
# passing
# get who passes most to whom, passes made, passes received.
# passing = playerdashptpass.PlayerDashPtPass(
#   team_id="1610612744",
#   player_id=201939,
# )

# print("passing")
# print(passing.get_normalized_dict())


# player dashpt reb
#https://github.com/swar/nba_api/blob/master/docs/nba_api/stats/endpoints/playerdashptreb.md

