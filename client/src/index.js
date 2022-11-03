import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from "./components/navbar.js";
import Home from "./components/home.js";
import Login from "./components/login.js";
import Logout from "./components/logout.js";
import Register from "./components/register.js";

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            authState: false,
            token: "",
            username: ""
        }

        this.setAuthState = this.setAuthState.bind(this);
        this.checkAuthState = this.checkAuthState.bind(this);
    }

    componentDidMount() {
        console.log("App container has loaded");
        this.checkAuthState();
    }

    checkAuthState(){
        if(localStorage.getItem("token")){
            this.setAuthState(true);
            this.setState({token: localStorage.getItem("token"), username: localStorage.getItem("username")});
        }
    }

    setAuthState(authState){
        this.setState({authState: authState});
    }

    render(){
        return (
            <BrowserRouter>
                <Navbar state={this.state} />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login state={this.state} setAuthState={this.setAuthState} />}></Route>
                    <Route path="/logout" element={<Logout token={this.state.token} setAuthState={this.setAuthState} />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>
);