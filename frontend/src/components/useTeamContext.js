import React, { useContext } from 'react';
import { TeamContext } from './TeamProvider';
export const useTeamContext = () => useContext(TeamContext);
