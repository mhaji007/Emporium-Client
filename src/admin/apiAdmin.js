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

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};


export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status, orderId })
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};


/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      }
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: product
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: 'PUT',
      headers: {
          // content type?
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const getCategory = categoryId => {
  return fetch(`${API}/category/${categoryId}`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};
