import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from "./authform.js";
const variables = require('../variables.js');

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isError: ""
        }

        this.submit = this.submit.bind(this);
    }

    submit(values){
        axios.post(process.env.API_URL + '/register', {
            username: values.email,
            password: values.password
        }).then(response => {
            if(response.data) {
                console.log("SIGNUP: Signup successful")
                this.props.navigate('/login')
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

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Register {...props} navigate={navigate} />
}

export default WithNavigate