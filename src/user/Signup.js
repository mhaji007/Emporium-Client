import React, {useState} from "react";
import Layout from '../core/Layout';


const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error:'',
    success: false

  });

  const handleChange = (name, e) =>{
    console.log(name);
    console.log(e);
    setValues({...values, error:false, [name]: e.target.value})
  }

  const SignUpForm = () => (
    <form >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={(e)=>handleChange('name', e)} type="text" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={(e) =>handleChange('email', e)} type="email" className="form-control"/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={(e) =>handleChange('password', e)} type="password" className="form-control"/>
      </div>
      <button className="btn btn-primary ">
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
