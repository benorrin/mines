import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


class Logout extends React.Component{

    componentDidMount() {
        console.log("App container has loaded");
        this.checkAuthState();
    }

    logoutUser(){
        axios.post('https://api.mines.orrin.uk/logout', {}, {
            headers: {
                'Authorization': `Bearer `+ this.token
            }
        }).then(response => {
            if(response.data) {
                console.log("LOGOUT: Logout successful")
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                this.props.setAuthState(false);
                this.props.navigate('/')
            } else {
                console.log("Error: Logout error")
            }
        }).catch(error => {
            this.setState({isError: error.response.data.message});
            this.props.setAuthState(false);
        });
    }

    render(){
        return(
            <p></p>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Logout {...props} navigate={navigate} />
}

export default WithNavigate;