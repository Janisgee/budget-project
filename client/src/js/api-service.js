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
  } else {
    throw new Error('no');
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
