import { API } from "../config";

//==== Create category ====//

export const createCategory = (userId, token, category) => {
  // console.log(userId, token, category);
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      // Media type accepted by the browser
      Accept: "application/json",
      // Media type sent by the browser
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // transform user object to
    // JSON string
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

//=========================//

//==== Create product ====//

export const createProduct = (userId, token, product) => {
  // console.log(userId, token, category);
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      // Media type accepted by the browser
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    // transform user object to
    // JSON string
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

//==========================//

//==== Get all categories ====//

// Retrieves all categories from
// the backend
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//============================//
