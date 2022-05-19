//  set session key
export function setKey(key, value) {
  window.sessionStorage.setItem(key, value);
}

//  get value from session storage
export const getKey = (key) => {
  if (typeof window === "undefined") {
    return false;
  }
  if (sessionStorage.getItem(key)) {
    return sessionStorage.getItem(key);
  } else {
    return false;
  }
};

//  remove key from session storage
export const removeKey = (key) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};


export const accessToken = () => {
  const authToken = JSON.parse(getKey('userAuth'));
  console.log(authToken);
  // let {accessToken} = authToken;
  let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI5NjUxMzEsInN1YiI6InNhbmRlZXBAZ21haWwuY29tIn0.8TTOdHMvPT0zqtkhXI7gqV8GNHPJv-LA72x4xB9onPM"
  return accessToken
}