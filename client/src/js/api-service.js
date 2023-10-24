import { showAlert } from '../js/alerts';

let token;
let userId;

export function isLoggedIn() {
  return token != null;
}

export async function doLogin(email, password) {
  const response = await fetch('http://localhost:3000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    const body = await response.json();
    token = body.token;
    userId = body.data.user._id;
    showAlert('success', 'Logged in successfully!');
    getAllTransactions();
  } else {
    throw new Error(
      showAlert(
        'error',
        'Log in fail. Please fill in a valid email and password!'
      )
    );
  }
}

export async function getAllTransactions(start = undefined, end = undefined) {
  let url;
  if (start === undefined && end === undefined) {
    url = `http://localhost:3000/api/v1/users/${userId}/transaction`;
  } else {
    url = `http://localhost:3000/api/v1/users/${userId}/transaction?start=${start}&end=${end}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (response.status === 200) {
    const data = await response.json();

    return data.data.transactions;
  } else {
    throw new Error('Fail to get transactions.');
  }
}

export async function getTransactionStats(start, end, type) {
  let url;
  if (start === undefined && end === undefined) {
    url = `http://localhost:3000/api/v1/users/${userId}/transaction/stats?type=${type}`;
  } else {
    url = `http://localhost:3000/api/v1/users/${userId}/transaction/stats?start=${start}&end=${end}&type=${type}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  if (response.status === 200) {
    const data = await response.json();

    return data.data.stats;
  } else {
    throw new Error('Fail to get transactions stats.');
  }
}
