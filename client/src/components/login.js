import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from "./authform.js";

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isError: ""
        }

        this.submit = this.submit.bind(this);
    }

    submit(values){
        axios.post('https://api.mines.orrin.uk/login', {
            username: values.email,
            password: values.password
        }).then(response => {
            if(response.data) {
                console.log("LOGIN: Login successful")
                localStorage.setItem('loggedin', true)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.user)
                this.props.setAuthState(true);
                this.props.navigate('/')
            } else {
                console.log("Error: Login error 1")
            }
        }).catch(error => {
            this.setState({isError: error.response.data.message});
            this.props.setAuthState(false);
        });
    }

    render(){
        return(
            <AuthForm isSignup={false} submit={this.submit} isError={this.state.isError}/>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
}

export default WithNavigate