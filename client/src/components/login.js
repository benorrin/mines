import React from 'react';
import AuthForm from "./authform.js";

class Login extends React.Component{
    constructor(props){
        super(props);

    }

    submit(values){
        console.log(values);
    }

    render(){
        return(
            <AuthForm isSignup={false} submit={this.submit}/>
        );
    }
}

export default Login;