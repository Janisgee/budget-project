function getConfig() {
  if (window.location.hostname === 'localhost') {
    return {
      SERVER_URL: 'http://localhost:3000',
    };
  } else if (window.location.hostname === 'somethingelse') {
    return {
      SERVER_URL: 'https://somethingelserandom.com.au',
    };
  }
}

export const CONFIG = getConfig();
