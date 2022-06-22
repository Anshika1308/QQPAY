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
  
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxNzgxNzEsInN1YiI6ImFkbWluQGdtYWlsLmNvbSJ9.pEloeWIz5MiS68Ti_34M_Q9i1-Wlgs_595ctTIcuqZ4'
  return accessToken
}