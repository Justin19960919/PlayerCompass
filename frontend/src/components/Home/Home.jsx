import React, { useRef, useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Teams from './Teams';
import TeamRoster from './TeamRoster';
import { TeamContext } from '../TeamProvider';
import { fetchRosterGivenTeamId } from '../../services/team';
import "./index.css";

const Home = () => {
  // const [team, setTeam] = useState({ teamId: null, name: null });
  const teamRosterRef = useRef(null);
  const { teamData, setTeamData } = useContext(TeamContext);

  const handleNBAIconClick = (event, id) => {
    if (id !== teamData.teamId) {
      setTeamData({
        teamId: id,
        teamName: event.target.alt,
        roster: null,
      })
      // setTeam({
      //   teamId: id,
      //   name: event.target.alt,
      // });
    }
    window.scrollTo({
      top: teamRosterRef.current.offsetTop + 1000,
      left: window.outerWidth / 2,
      behavior: "smooth"
    })
  }

  // can access error variable inside
  const { data: teamRoster, isLoading, isError, refetch } = useQuery(
    ['team-roster', teamData.teamId],
    () => fetchRosterGivenTeamId(String(teamData.teamId)),
    { enabled: false }
  )

  // fetch team roster data from backend upon teamId change
  useEffect(() => {
    // if (teamId) refetch();
    if (teamData.teamId) {
      refetch();
    }
  }, [teamData.teamId, refetch]);

  // store in local storage
  // if (teamRoster) {
  //   localStorage.setItem("rosterData", JSON.stringify({
  //     teamId: team.teamId,
  //     teamName: team.name,
  //     roster: teamRoster,
  //   }))
  // }
  useEffect(() => {
    if (teamRoster && teamRoster !== teamData.roster) {
      console.log(`fetched team roster: `, teamRoster)
      setTeamData(prevState => ({
        ...prevState,
        roster: teamRoster,
      }));
    }
  }, [teamRoster])


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
        // teamName={teamData.name}
        // teamId={teamData.teamId}
        teamRosterRef={teamRosterRef}
        isLoading={isLoading}
        isError={isError}
      // roster={teamRoster}
      />
    </>
  );
}

export default Home;


