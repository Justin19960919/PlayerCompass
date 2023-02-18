import { constructEndpoint } from "./endpoint";

export const fetchPlayerCareerData = async ({ playerId, perMode }) => {
  let response = await fetch(constructEndpoint('/player/careerStat',
    {
      playerId,
      perMode,
    }));
  return response.json();
}

export const fetchPlayerName = async ({ playerId }) => {
  let response = await fetch(constructEndpoint('/player',
    {
      playerId,
    }));
  return response.json();
}