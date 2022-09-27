import React from 'react';
import axios from 'axios';
import AuthForm from "./authform.js";

class Register extends React.Component{
    constructor(props){
        super(props);

    }

    submit(values){
        axios.post('http://localhost:3000/register', {
            username: values.email,
            password: values.password
        }).then(response => {
            if(response.data) {
                console.log("SIGNUP: Signup successful")
            } else {
                console.log("SIGNUP: Signup error 1")
            }
        }).catch(error => {
            console.log("SIGNUP: Signup error 2")
            console.log(error)
        });
    }

    render(){
        return(
            <AuthForm isSignup={true} submit={this.submit}/>
        );
    }
}

export default Register;