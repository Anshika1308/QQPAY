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




// export const accessToken = () => {
//   // console.log("token dddd",this.$store.token)
//   const authToken = JSON.parse(getKey('userAuth'));
//   console.log(authToken);
//   // let {accessToken} = authToken;

//   // const token = null;
  
//   let accessToken = localStorage.getItem('token');
//   // console.log("accessToken",accessToken)
//   return accessToken
  
// }