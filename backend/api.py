from nba_api.stats.endpoints import playerdashptshots, playerdashptpass, playerdashptshotdefend

steph = 201939
gsw = 1610612744
# dash pt shots
dashPtShots = playerdashptshots.PlayerDashPtShots(player_id=steph, team_id=gsw)
print('closest_defender10ft_plus_shooting')
print(dashPtShots.closest_defender10ft_plus_shooting.get_dict())
print("\n\n")
print("closest_defender_shooting")
print(dashPtShots.closest_defender_shooting.get_dict())
print("\n\n")
print("dribble_shooting")
print(dashPtShots.dribble_shooting.get_dict())
print("\n\n")
print("general_shooting")
print(dashPtShots.general_shooting.get_dict())
print("\n\n")
print("overall")
print(dashPtShots.overall.get_dict())
print("\n\n")
print("shot_clock_shooting")
print(dashPtShots.shot_clock_shooting.get_dict())
print("\n\n")
print("touch_time_shooting")
print(dashPtShots.touch_time_shooting.get_dict())

