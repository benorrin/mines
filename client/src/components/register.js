import React from 'react';
import axios from 'axios';
import AuthForm from "./authform.js";

class Register extends React.Component{
    constructor(props){
        super(props);

    }

    submit(values){
        console.log(values);
        axios.post('http://localhost:3000/register', {
            username: values.username,
            password: values.password
        }).then(response => {
            console.log(response)
            if(response.data) {
                console.log("SIGNUP: Signup successful")
                this.props.navigate('/login');
            } else {
                console.log("SIGNUP: Signup error")
            }
        }).catch(error => {
            console.log("SIGNUP: Signup error")
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