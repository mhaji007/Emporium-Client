import React, {useState} from "react";
import Layout from '../core/Layout';
import {API} from '../config';
import {Link} from 'react-router-dom';


const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error:'',
    success: false

  });

  const {name, email, password, success, error} = values;

  const handleChange = (name, event) =>{
    // console.log(name);
    // console.log(event);
    setValues({...values, error:false, [name]: event.target.value});
  }

  const signup = (user) =>{
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
  }

  const clickSubmit = (event) =>{
    event.preventDefault();
    setValues({...values, error:false})
    // console.log(name, email, password)
    signup({name, email, password}).then(data=>{
      if(data.error) {
        setValues({...values, error: data.error, success: false})
      } else {
        setValues({
          ...values,
          name:'',
          email:'',
          password: '',
          success: true
        })
      }
    })

  }

  const SignUpForm = () => (
    <form >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={(event)=>handleChange('name', event)} type="text" value={name} className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={(event) =>handleChange('email', event)} type="email" value={email} className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={(event) =>handleChange('password', event)} type="password" value={password} className="form-control"/>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary ">
        Submit
      </button>
    </form>
  );

    const showError = () => (
      <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
        {error}
      </div>
    )

    const showSuccess = () => (
      <div className="alert alert-success" style={{display: success ? '': 'none'}}>
        New account is created. Please <Link to="/signin">sign in.</Link>
      </div>
    )

  return (
    <Layout
    title="Sign up"
    description="Sign up here"
    className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {SignUpForm()}
      {JSON.stringify(values)}

    </Layout>
  )
};

export default Signup;
