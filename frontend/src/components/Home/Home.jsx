import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Teams from './Teams';
import TeamRoster from './TeamRoster';
import { fetchRosterGivenTeamId } from '../../services/team';
// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const [teamId, setTeamId] = useState(null);
  const teamRosterRef = useRef(null);

  const handleNBAIconClick = (event, id) => {
    console.log(`team id: ${id}`);
    if (id !== teamId) {
      setTeamId(id);
    }
    window.scrollTo({
      top: teamRosterRef.current.offsetTop + 1000,
      left: window.outerWidth / 2,
      behavior: "smooth"
    })
  }

  // can access error variable inside
  const { data: teamRoster, isLoading, isError, refetch } = useQuery(
    ['team-roster', teamId],
    () => fetchRosterGivenTeamId(String(teamId)),
    { enabled: false }
  )

  // fetch team roster data from backend upon teamId change
  useEffect(() => {
    // if (teamId) refetch();
    if (teamId) {
      refetch();
    }
  }, [teamId, refetch]);


  let storageData = {
    teamId: null,
    roster: null,
  };
  // store in local storage
  if (teamRoster) {
    localStorage.setItem("rosterData", JSON.stringify({
      teamId: teamId,
      roster: teamRoster,
    }))
  } else {
    // check local storage and populate
    let store = JSON.parse(localStorage.getItem("rosterData"));
    if (store) {
      storageData.roster = store['roster'];
      storageData.teamId = store['teamId']
    }
  }

  return (
    <>
      <Teams
        handleClick={handleNBAIconClick}
      />
      <TeamRoster
        teamId={teamId || storageData.teamId}
        teamRosterRef={teamRosterRef}
        isLoading={isLoading}
        isError={isError}
        roster={teamRoster || storageData.roster}
      />
    </>
  );
}

export default Home;


