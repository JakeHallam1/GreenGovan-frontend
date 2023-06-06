const ENDPOINTS = require("../../../endpoints.json");

// requests a new access token from backend using the refresh token stored in cookies
export async function generateNewAccessToken(cookies, setCookie) {
  console.log("Generating new access token");
  return (
    fetch(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.auth}/token`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: cookies.refreshToken }),
      }
    )
      // if all is well and good...
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      // store new access token to cookies, overwriting old access token
      .then((data) => {
        setCookie("accessToken", data.accessToken);
        return data.accessToken;
      })
      .catch((error) => {
        console.log(error);
      })
  );
}

// handles user logging out
export async function handleLogout(cookies, removeCookie) {
  fetch(`${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.auth}/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: cookies.refreshToken,
    }),
  })
    // removes both refresh and access tokens from cookies
    .then(() => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      removeCookie("user");
    })
    .catch((error) => console.log(error));
}

// handles all requests to protected routes on the backend
export async function handleProtectedRequest(
  url,
  config,
  cookies,
  setCookie,
  removeCookie
) {
  // adds authorisation
  config.headers.Authorization = `Bearer ${cookies.accessToken || null}`;
  // send initial request (requiring auth)
  return fetch(url, config)
    .then(async (response) => {
      // if unauthorised
      if (response.status == 403) {
        // generate a fresh access token using the refresh token
        return generateNewAccessToken(cookies, setCookie).then(
          (accessToken) => {
            // update request authorisation using new access token
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log("Sending request again");
            // send request again
            return (
              fetch(url, config)
                .then((response) => {
                  // if second request still unauthorised then logs user out
                  if (response.status == 403) {
                    handleLogout(cookies, removeCookie);
                  }
                  return response.json().catch((error) => {
                    return null;
                  });
                })
                // returns data
                .then((data) => {
                  return data;
                })
            );
          }
        );
      }
      return response.json().catch((error) => {
        return null;
      });
    })
    .catch((error) => {
      throw error;
    });
}
