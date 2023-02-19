import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Teams from './Teams';
import TeamRoster from './TeamRoster';
import { fetchRosterGivenTeamId } from '../../services/team';
import "./index.css";

const Home = () => {
  const [team, setTeam] = useState({ teamId: null, name: null });
  const teamRosterRef = useRef(null);

  const handleNBAIconClick = (event, id) => {
    if (id !== team.teamId) {
      setTeam({
        teamId: id,
        name: event.target.alt,
      });
    }
    window.scrollTo({
      top: teamRosterRef.current.offsetTop + 1000,
      left: window.outerWidth / 2,
      behavior: "smooth"
    })
  }

  // can access error variable inside
  const { data: teamRoster, isLoading, isError, refetch } = useQuery(
    ['team-roster', team.teamId],
    () => fetchRosterGivenTeamId(String(team.teamId)),
    { enabled: false }
  )

  // fetch team roster data from backend upon teamId change
  useEffect(() => {
    // if (teamId) refetch();
    if (team.teamId) {
      refetch();
    }
  }, [team.teamId, refetch]);

  // store in local storage
  if (teamRoster) {
    localStorage.setItem("rosterData", JSON.stringify({
      teamId: team.teamId,
      teamName: team.name,
      roster: teamRoster,
    }))
  }

  return (
    <>
      <div className="slogan">
        <h2>PlayerCompass, the place to navigate your players.</h2>
        <h5>Click any team to show roster.</h5>
      </div>
      <Teams
        handleClick={handleNBAIconClick}
      />
      <TeamRoster
        teamName={team.name}
        teamId={team.teamId}
        teamRosterRef={teamRosterRef}
        isLoading={isLoading}
        isError={isError}
        roster={teamRoster}
      />
    </>
  );
}

export default Home;


