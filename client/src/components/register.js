import React from 'react';
import AuthForm from "./authform.js";

class Register extends React.Component{
    constructor(props){
        super(props);

    }

    submit(values){
        console.log(values);
    }

    render(){
        return(
            <AuthForm isSignup={true} submit={this.submit}/>
        );
    }
}

export default Register;