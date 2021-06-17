import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useAlert} from 'react-alert';
import axios from 'axios';
export default function SignUp() {
    const alert = useAlert();
    const [state,setState]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        isAdmin:false,
        conPassword:""
    })

    const toggleSwitch=(e)=>{
        setState({...state,isAdmin:!state.isAdmin})
    }
    const handleChange=(e)=>{
        const value = e.target.value;
        console.log(value)
        setState({
            ...state,
            [e.target.name]:value})
    }
    const handleSignup=()=>{
        const {firstName,lastName,email,password,conPassword,isAdmin} = state;
        if(password===conPassword){
            axios.post('https://cricketify-server.herokuapp.com/api/user/signup',
            {firstName,lastName,email,password,isAdmin})
            .then(result=>{
                    alert.show(result.data.message,{type:"success"})
            })
            .catch(err=>{
                alert.show(err.response.data.message,{type:"error"})
            })
        }
        else{
            alert.show("Password mismatch",{type:"error"})
        }
    }
    return (
        <div className="container mb-2">
              <h1 className="main-heading">Signup</h1>
              <div className="formgroup">
                  <label htmlFor="firstName">First name</label>
                  <input 
                  type="text" 
                  name="firstName" 
                  onChange={handleChange} 
                  value={state.firstName}/>
              </div>
              
              <div className="formgroup">
                  <label htmlFor="lastName">Last name</label>
                  <input 
                  type="text" 
                  name="lastName" 
                  onChange={handleChange} 
                  value={state.lastName}/>
              </div>
              
              <div className="formgroup">
                  <label htmlFor="email">Email</label>
                  <input 
                  type="text" 
                  name="email" 
                  onChange={handleChange} 
                  value={state.email}/>
              </div>
              <div className="formgroup">
                  <label htmlFor="password">Password</label>
                  <input 
                  type="password" 
                  name="password"
                  onChange={handleChange} 
                  value={state.password}/>
              </div>
              <div className="formgroup">
                  <label htmlFor="conPassword">Confirm Password</label>
                  <input 
                  type="password" 
                  name="conPassword"
                  onChange={handleChange} 
                  value={state.conPassword}/>
              </div>
              <div className="formgroup">
                <label>Admin? </label>
              <label class="switch">
                <input type="checkbox"
                onChange={toggleSwitch}
                />
                <span class="slider round"></span>
            </label>
              
              </div>
              <button 
              className="btnprimary" 
              onClick={handleSignup}>Signup</button>

            <a className="link-back" href="/">back to login</a>
              
        </div>
    )
}
