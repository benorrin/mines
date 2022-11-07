import React from 'react';
import axios from 'axios';
import { Box, Button, Grid } from '@chakra-ui/react';

class Mines extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            game_id: "",
            buttons: 25,
            gameActive: false,
            gameState: [],
            btndisabled: "1"
        }

        this.token = localStorage.getItem("token");

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    newGame() {
        console.log("New Game");

        let gameState = [];

        for (let i = 0; i < this.state.buttons; i++) {
            gameState.push(0);
            this.setState({gameState: gameState});
        }

        this.setState({gameActive: true});
        this.setState({btndisabled: "1"});

        axios.post('http://localhost:3000/newgame', {}, {
            headers: {
                'Authorization': `Bearer `+ this.token
            }
        }).then(response => {
            if(response.data) {
                console.log("GAME: new game successful")
                this.state.game_id = response.data.game_id
            } else {
                console.log("GAME: Game creation error")
            }
        }).catch(error => {
            console.log("catch error");
            console.log(error);
        })
    }

    handleUpdate(event) {
        const target = event.target;
        const name = target.name;
        console.log(name);

        if(this.state.gameActive == true) {
        
            let gameState = this.state.gameState;

            axios.post('http://localhost:3000/move', {
                game_id: this.state.game_id,
                square: name
            }, {
                headers: {
                    'Authorization': `Bearer `+ this.token
                }
            }).then(response => {
                if(response.data) {
                    console.log("GAME: move successful")
                    console.log(response.data.revealed)

                    let revealed = response.data.revealed
                    let game_status = response.data.game_status

                    Object.keys(revealed).forEach(function(key) {
                        gameState[key] = revealed[key] + 1;
                    })
                    this.setState({gameState: gameState})

                    if(game_status == 1) {
                        //Game over
                        this.setState({gameActive: false})
                        this.setState({btndisabled: ''})
                        console.log("GAME: game over")
                    }
                } else {
                    console.log("GAME: move error")
                }
            }).catch(error => {
                console.log("catch error");
                console.log(error);
            })
        }

    }

    render() {
        let _this = this;
        let buttons = [];
        let displayText = "";
        let btndisabled = this.state.btndisabled;

        this.state.gameState.forEach(function (item, index) {
            switch (item) {
                case 0:
                    displayText = "";
                    break;
                case 1:
                    displayText = "💎";
                    break;
                case 2:
                    displayText = "❌";
                    break;
                default:
                    console.log("error");
            }
            buttons.push(<Button disabled={!btndisabled} colorScheme='blue' name={index} key={index} onClick={_this.handleUpdate}>{displayText}</Button>);
        });

        return (
            <div>
                <Flex align={'center'} justify={'center'}>
                    <Box rounded={'lg'} boxShadow={'lg'} p={4}>
                        <Button colorScheme='green' onClick={() => this.newGame()}>New Game</Button>
                        <Button colorScheme='green' onClick={() => this.newGame()}>Cash Out</Button>
                    </Box>
                    <Box rounded={'lg'} boxShadow={'lg'} p={4}>
                        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
                            {buttons}
                        </Grid>
                    </Box>
                </Flex>
            </div>
        );
    }
}

export default Mines;
