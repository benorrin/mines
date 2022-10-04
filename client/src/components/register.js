import React from 'react';
import axios from 'axios';
import AuthForm from "./authform.js";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isError: ""
        }

        this.submit = this.submit.bind(this);
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
            this.setState({isError: error.response.data.message});
        });
    }

    render(){
        return(
            <AuthForm isSignup={true} submit={this.submit} isError={this.state.isError}/>
        );
    }
}

export default Register;