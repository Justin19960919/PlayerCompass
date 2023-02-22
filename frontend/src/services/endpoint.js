export const constructEndpoint = (path, queryParams = {}) => {
  if (process.env.REACT_APP_BACKEND_URL) {
    const url = new URL(`${process.env.REACT_APP_BACKEND_URL}${path}`);
    if (Object.keys(queryParams).length) {
      for (let [key, value] of Object.entries(queryParams)) {
        url.searchParams.append(key, value);
      }
    }
    console.log('url: ', url.toString());
    return url.toString();
  }
  console.log('url: ', "empty string");
  return "";
}