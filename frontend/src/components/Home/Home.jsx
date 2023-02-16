import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Teams from './Teams';
import TeamRoster from './TeamRoster';
import { fetchRosterGivenTeamId } from '../../services/fetchPlayers';


const Home = () => {
  const [teamId, setTeamId] = useState(null);
  const teamRosterRef = useRef(null);

  const handleNBAIconClick = (event, id) => {
    console.log(`team id: ${id}`);
    window.scrollTo({
      top: teamRosterRef.current.offsetTop + 1000,
      left: window.outerWidth / 2,
      behavior: "smooth"
    })
    setTeamId(id);
  }

  const { data: teamRoster, isLoading, isError, error, refetch } = useQuery(
    ['team-roster', teamId],
    () => fetchRosterGivenTeamId(String(teamId)),
    { enabled: false }
  )

  // fetch team roster data from backend upon teamId change
  useEffect(() => {
    if (teamId) refetch();
  }, [teamId, refetch]);


  return (
    <>
      <Teams
        handleClick={handleNBAIconClick}
      />
      <TeamRoster
        teamId={teamId}
        teamRosterRef={teamRosterRef}
        isLoading={isLoading}
        isError={isError}
        roster={teamRoster}
      />
    </>
  );
}

export default Home;


