import React, { useState, createContext } from 'react';

export const TeamContext = createContext();

const TeamProvider = ({ children }) => {
  const [teamData, setTeamData] = useState({
    teamId: null,
    teamName: null,
    roster: [],
  })
  const store = {
    teamData,
    setTeamData,
  }
  return (
    <TeamContext.Provider value={store}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamProvider;
