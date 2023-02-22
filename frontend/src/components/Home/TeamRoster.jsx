import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Positions from './Positions';
import InfoContainer from '../Info';
import Spinner from '../common/Spinner';
import { useTeamContext } from '../../components/useTeamContext';
import "./index.css";

const TeamRoster = ({
  // teamName,
  // teamId,
  teamRosterRef,
  isLoading,
  isError,
  // roster,
}) => {

  const { teamData, setTeamData } = useTeamContext();
  // const storageData = {
  //   teamId: null,
  //   teamName: null,
  //   roster: null,
  //   hasClicked: false,
  // };

  // fetch from local storage if teamId, teamName, roster is null
  // if (!teamId || !teamName || !roster) {
  //   let store = JSON.parse(localStorage.getItem("rosterData"));
  //   if (store) {
  //     storageData.roster = store['roster'];
  //     storageData.teamId = store['teamId'];
  //     storageData.teamName = store['teamName'];
  //     storageData.hasClicked = true;
  //   }
  // }
  // const isDataInLocalStorage = storageData.teamId && storageData.teamName && storageData.roster;
  // const isDataFetched = teamId && teamName && roster;
  // const isFetchingData = !isDataInLocalStorage && !isDataFetched && !isError && isLoading && storageData.hasClicked;
  // console.log('storage data: ', storageData)
  // console.log(`isDataInLocalStorage: `, isDataInLocalStorage);
  // console.log('isDataFetched: ', isDataFetched)
  // console.log('isFetchingData:', isFetchingData)
  // console.log('teamData: ', teamData);
  return (
    <div ref={teamRosterRef}>
      <h1 className="position">{teamData.teamName || ""}</h1>
      {/* TODO: is loading icon has bug */}
      {/* isFetchingData */}
      {/* {isLoading && !teamData.roster &&
        <FontAwesomeIcon
          icon={faSpinner}
          size="3x"
          spin
          color="#cfdbd5"
          style={{ margin: "5px auto", width: "100%" }}
        />} */}
      <Spinner isLoading={isLoading && !teamData.roster} />
      {isError && <InfoContainer isError info="Sorry, we have ecountered an error." />}
      {
        teamData.roster &&
        <Positions roster={teamData.roster} />
      }
    </div>
  );
}

export default TeamRoster;