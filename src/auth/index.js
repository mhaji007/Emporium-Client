import {API} from '../config';


  export const signup = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        // Media type accepted by the browser
        Accept: 'application/json',
        // Media type sent by the browser
        "Content-Type":"application/json"
      },
      // transform user object to
      // JSON string
      body: JSON.stringify(user)
    }
    )
    .then(response => response.json()
    )
    .catch(err => {
      console.log(err);
    })
  };

  export const signin = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        // Media type accepted by the browser
        Accept: 'application/json',
        // Media type sent by the browser
        "Content-Type":"application/json"
      },
      // transform user object to
      // JSON string
      body: JSON.stringify(user)
    }
    )
    .then(response => response.json()
    )
    .catch(err => {
      console.log(err);
    })
  };

  export const authenticate = (data, next) =>{
    if(typeof window !== 'undefined') {
      console.log(JSON.stringify(data));
      window.localStorage.setItem('jwt', JSON.stringify(data));
      next();
    }
  }
