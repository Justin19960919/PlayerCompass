import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Positions from './Positions';
import InfoContainer from '../Info';
import "./index.css";


const TeamRoster = ({
  teamName,
  teamId,
  teamRosterRef,
  isLoading,
  isError,
  roster,
}) => {


  const storageData = {
    teamId: null,
    teamName: null,
    roster: null,
    hasClicked: false,
  };

  // fetch from local storage if teamId, teamName, roster is null
  if (!teamId || !teamName || !roster) {
    let store = JSON.parse(localStorage.getItem("rosterData"));
    if (store) {
      storageData.roster = store['roster'];
      storageData.teamId = store['teamId'];
      storageData.name = store['teamName'];
      storageData.hasClicked = true;
    }
  }
  const isDataInLocalStorage = storageData.teamId && storageData.teamName && storageData.roster;
  const isDataFetched = teamId && teamName && roster;
  const isFetchingData = !isDataInLocalStorage && !isDataFetched && !isError && isLoading && storageData.hasClicked;

  return (
    <div ref={teamRosterRef}>
      <h1 className="position">{teamName || ""}</h1>
      {/* TODO: is loading icon has bug */}
      {isFetchingData &&
        <FontAwesomeIcon
          icon={faSpinner}
          size="3x"
          spin
          color="#cfdbd5"
          style={{ margin: "5px auto", width: "100%" }}
        />}
      {isError && <InfoContainer isError info="Sorry, we have ecountered an error." />}
      {
        roster &&
        <Positions roster={roster} />
      }
    </div>
  );
}

export default TeamRoster;