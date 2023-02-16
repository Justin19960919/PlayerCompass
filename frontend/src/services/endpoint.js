import { BACKEND_URL } from "../constant"
export const constructEndpoint = (path, queryParams = {}) => {
  const url = new URL(`${BACKEND_URL}${path}`);
  if (Object.keys(queryParams).length) {
    for (let [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value);
    }
  }
  return url.toString();
}