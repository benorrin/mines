import React from 'react';
import AuthForm from "./authform.js";

class Login extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <AuthForm isSignup={false}/>
        );
    }
}

export default Login;