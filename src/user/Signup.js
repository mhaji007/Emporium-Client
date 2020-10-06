import React, {useState} from "react";
import Layout from '../core/Layout';
import {API} from '../config';


const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error:'',
    success: false

  });

  const {name, email, password} = values;

  const handleChange = (name, event) =>{
    console.log(name);
    console.log(event);
    setValues({...values, error:false, [name]: event.target.value})
  }

  const signup = (user) =>{
    // console.log(name, email, password);
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type":"application/json"
      },
      body: JSON.stringify(user)
    }
    )
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
  }

  const clickSubmit = (event) =>{
    event.preventDefault();
    signup({name, email, password});

  }

  const SignUpForm = () => (
    <form >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={(event)=>handleChange('name', event)} type="text" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={(event) =>handleChange('email', event)} type="email" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={(event) =>handleChange('password', event)} type="password" className="form-control"/>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary ">
        Submit
      </button>
    </form>
  )

  return (
    <Layout
    title="Sign up"
    description="Sign up here"
    className="container col-md-8 offset-md-2"
    >
      {SignUpForm()}
      {JSON.stringify(values)}

    </Layout>
  )
};

export default Signup;
