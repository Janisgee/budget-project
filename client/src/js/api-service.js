import { showAlert } from '../js/alerts';

let userId;

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
    userId = data.data.user._id;
    console.log(data);
    return data;
  } else {
    return;
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
    userId = body.data.user._id;
    showAlert('success', 'Logged in successfully!');
    getAllTransactions();
    return body.data;
  } else {
    throw new Error(
      showAlert(
        'error',
        'Log in fail. Please fill in a valid email and password!'
      )
    );
  }
}

export async function logout() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      credentials: 'include',
    });

    if (response.status === 200) {
      //Reload the page manually(force reload from server, not from browser)
      window.location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
}

export async function signup(data) {
  const response = await fetch(`http://localhost:3000/api/v1/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (response.status === 201) {
    const body = await response.json();
    userId = body.data.user._id;
    showAlert('success', 'Sign up successfully and logged in.', 3);
    getAllTransactions();
    return body.data;
  } else {
    throw new Error(
      showAlert(
        'error',
        'Fail to sign up an account, please fill in a valid information.',
        3
      )
    );
  }
}

export async function resetPassword(password, passwordConfirm, params) {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/resetPassword/${params}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ password, passwordConfirm }),
      credentials: 'include',
    }
  );

  if (response.status === 200) {
    showAlert(
      'success',
      'New password has been reset. Please login and try it.',
      5
    );
  } else {
    const body = await response.json();
    throw new Error(body.message);
  }
}

export async function forgetPassword(email) {
  const response = await fetch(
    `http://localhost:3000/api/v1/users/forgotPassword`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    }
  );

  if (response.status === 200) {
    showAlert(
      'success',
      'Password reset link has been sent to your email to reset a new password.📧',
      5
    );
  } else {
    const body = await response.json();
    throw new Error(body.message);
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

//type is either 'password' or 'data'
export async function patchUpdateMe(data, type) {
  console.log(data);
  console.log(JSON.stringify(data));

  const url =
    type === 'password'
      ? 'http://localhost:3000/api/v1/users/updateMyPassword'
      : `http://localhost:3000/api/v1/users/updateMe`;

  const response = await fetch(url, {
    method: 'PATCH',
    body: data,
    credentials: 'include',
  });
  console.log(response);

  if (response.status === 200) {
    showAlert('success', `Your ${type} settings have been updated!`, 4);
    // window.location.reload(true);
  } else {
    const body = await response.json();
    throw new Error(body.message);
  }
}
