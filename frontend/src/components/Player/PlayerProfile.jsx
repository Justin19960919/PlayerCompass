import React from 'react';
import "./index.css";

const Stat = ({ header, data }) => {
  return (
    <div className="stat">
      <h6>
        {header}
      </h6>
      <p>
        {data}
      </p>
    </div>
  );
}



const PlayerProfile = ({ seasonData, playerName }) => {
  const importantStats = new Set([
    "TEAM_ABBREVIATION",
    "PLAYER_AGE",
    "MIN",
    "PTS",
    "FG_PCT",
    "FG3_PCT",
    "FT_PCT",
    "REB",
    "AST",
    "STL",
    "BLK",
    "TOV",
    "PF",
  ]);

  const headers = seasonData['headers'];
  const data = seasonData['data'];
  const profile = {}

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (importantStats.has(headers[i])) {
        profile[headers[i]] = data[i];
      }
    }
  }

  return (
    <div className="container text-center" style={{ marginTop: "40px", marginBottom: "40px" }}>

      <h1 style={{ marginBottom: "20px", color: "#4e4f50" }}>     {playerName.full_name}
      </h1>

      <div class="row">
        <div class="col">
          <Stat header="Age" data={profile['PLAYER_AGE']} />
        </div>
        <div class="col">
          <Stat header="Minutes" data={profile['MIN']} />
        </div>
        <div class="col">
          <Stat header="Points" data={profile['PTS']} />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Stat header="Field goal %" data={Math.round(profile['FG_PCT'] * 100, 2)} />
        </div>
        <div class="col">
          <Stat header="Three point %" data={Math.round(profile['FG3_PCT'] * 100, 2)} />
        </div>
        <div class="col">
          <Stat header="Free throw %" data={Math.round(profile['FT_PCT'] * 100, 2)} />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Stat header="Rebound" data={profile['REB']} />
        </div>
        <div class="col">
          <Stat header="Assist" data={profile['AST']} />
        </div>
        <div class="col">
          <Stat header="Steal" data={profile['STL']} />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Stat header="Block" data={profile['BLK']} />
        </div>
        <div class="col">
          <Stat header="Turnover" data={profile['TOV']} />
        </div>
        <div class="col">
          <Stat header="Personal Fouls" data={profile['PF']} />
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;