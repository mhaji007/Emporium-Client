import {API} from '../config';


  export const createCategory = (userId, token, category) =>{
    // console.log(userId, token, category);
    return fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        // Media type accepted by the browser
        Accept: 'application/json',
        // Media type sent by the browser
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      // transform user object to
      // JSON string
      body: JSON.stringify(category)
    }
    )
    .then(response => response.json()
    )
    .catch(err => {
      console.log(err);
    })
  };
