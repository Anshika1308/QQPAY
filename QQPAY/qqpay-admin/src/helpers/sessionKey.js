// import { store } from "@/store";
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

// console.log("token dddd",store.token)
export const accessToken = () => {
  const authToken = JSON.parse(getKey('userAuth'));
  console.log(authToken);
  // let {accessToken} = authToken;

  // const token = null;
  
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxMzg2ODgsInN1YiI6ImphdGluQHNvZnRkZXZlbHMuY29tIn0.ZwzomY-yva65lqBcGIyW5jdmbRL1ThYCuJS2KDcpX6o'
  return accessToken
}