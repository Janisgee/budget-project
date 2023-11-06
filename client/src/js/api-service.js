import { showAlert } from '../js/alerts';

let token;
let userId;

export function getUserData(data) {
  return data;
}

export function isLoggedIn() {
  return token != null;
}

export async function checkIsLoggedIn() {
  const response = await fetch('http://localhost:3000/api/v1/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
    },
    credentials: 'include',
  });

  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    return responseError(
      response,
      'Fail to get user information, user is not logged in yet.'
    );
  }
}

export async function doLogin(email, password) {
  const response = await fetch('http://localhost:3000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
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

export async function postNewTransaction(data) {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/${userId}/transaction`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );

  if (response.status === 201) {
    showAlert('success', 'New transaction has been made!', 3);
  } else {
    throw new Error(
      showAlert(
        'error',
        'Fail to create new transaction, please try again later.',
        3
      )
    );
  }
}

export async function patchUpdateTransaction(data) {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/${userId}/transaction/${data._id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  console.log(response);

  if (response.status === 200) {
    showAlert('success', 'Transaction has been updated!', 3);
  } else {
    throw new Error(
      showAlert(
        'error',
        'Fail to update transaction, please try again later.',
        3
      )
    );
  }
}

export async function deleteServerTransaction(transactionId) {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/${userId}/transaction/${transactionId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      credentials: 'include',
    }
  );
  console.log(response);

  if (response.status === 204) {
    showAlert('success', 'Transaction has been deleted!', 3);
  } else {
    throw new Error(
      showAlert(
        'error',
        'Fail to delete transaction, please try again later.',
        3
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
      // Authorization: 'Bearer ' + token,
    },
    credentials: 'include',
  });

  if (response.status === 200) {
    const data = await response.json();

    return data.data.transactions;
  } else {
    return responseError(response, 'Fail to get transactions.');
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
      // Authorization: 'Bearer ' + token,
    },
    credentials: 'include',
  });
  if (response.status === 200) {
    const data = await response.json();

    return data.data.stats;
  } else {
    return responseError(response, 'Fail to get transactions stats.');
  }
}

export async function getTransactionSummary(start, end) {
  let url;
  if (start === undefined && end === undefined) {
    url = `http://localhost:3000/api/v1/users/${userId}/transaction/stats`;
  } else {
    url = `http://localhost:3000/api/v1/users/${userId}/transaction/stats?start=${start}&end=${end}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
    },
    credentials: 'include',
  });
  if (response.status === 200) {
    const data = await response.json();

    return data.data.stats;
  } else {
    return responseError(response, 'Fail to get transactions summary.');
  }
}

async function responseError(response, msg) {
  const errorMessage = await response.text();
  throw new Error(
    JSON.stringify({
      hint: msg,
      errorMessage,
      status: response.status,
      statusText: response.statusText,
    })
  );
}

export async function patchUpdateMe(data) {
  console.log(data);
  console.log(JSON.stringify(data));

  const response = await fetch(`http://localhost:3000/api/v1/users/updateMe`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  console.log(response);

  if (response.status === 200) {
    showAlert('success', 'Your account settings have been updated!', 3);
  } else {
    throw new Error(
      showAlert(
        'error',
        'Fail to update your account settings, please try again later.',
        3
      )
    );
  }
}
