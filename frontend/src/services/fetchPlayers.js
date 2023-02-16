import { constructEndpoint } from "./endpoint";

//search for fetch config
export const fetchRosterGivenTeamId = async (teamId) => {
  let response = await fetch(constructEndpoint('/team', { teamId: teamId }))
  return response.json();
}