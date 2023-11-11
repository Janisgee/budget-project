function getConfig() {
  if (window.location.hostname === 'localhost') {
    return {
      SERVER_URL: 'http://localhost:3000',
    };
  } else if (window.location.hostname === 'money-tracker-vp3w.onrender.com') {
    return {
      SERVER_URL: 'https://money-tracker-server.onrender.com',
    };
  }
}

export const CONFIG = getConfig();
