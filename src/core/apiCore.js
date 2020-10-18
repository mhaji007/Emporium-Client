import { API } from "../config";
import queryString from 'query-string';

//==== Return Product by sold/arrival ====//

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//========================================//

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

//=========================================//

//===== Get filtered products ====/

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
      limit,
      skip,
      filters
  };
  return fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};
//=================================/

//==== Get all products based on query parameter ====//

// Used in returning products based on search
// to be displayed on the homepage after search
export const list = (params) => {
  const query = queryString.stringify(params);

  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//===================================================//

//==== Get single product ====//

// Used to fetch single product
// to be displayed on the product (detail) page
export const read = productId => {
  return fetch(`${API}/product/${productId}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

//============================//

//==== Get all related products ====//

// Used to fetch all the related products
// based on the category of a selected
// product by the user
export const listRelated = productId => {
  return fetch(`${API}/products/related/${productId}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};
//=================================//

//==== Get braintree client-side token ====//

  export const getBraintreeClientToken = (userId, token)=> {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
      },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  };

//==========================================//
