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
  } else {
    throw new Error(
      showAlert(
        'error',
        'Log in fail. Please fill in a valid email and password!'
      )
    );
  }
}

export function getAllTransactions() {
  return fetch(`http://localhost:3000/api/v1/users/${userId}/transaction`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then((data) => data.json());
}
