import React from 'react';
import axios from 'axios';
import { Box, Button, Flex, Grid, GridItem, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Stat, StatLabel, StatNumber, VStack, StackDivider } from '@chakra-ui/react';

class Mines extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            game_id: "",
            buttons: 25,
            gameActive: false,
            gameState: [],
            btndisabled: "",
            bet: 0
        }

        this.token = localStorage.getItem("token");

        this.handleUpdate = this.handleUpdate.bind(this);
        this.betInputUpdate = this.betInputUpdate.bind(this);
    }

    componentDidMount() {
        this.generateBoard();
    }

    generateBoard() {
        let gameState = [];

        for (let i = 0; i < this.state.buttons; i++) {
            gameState.push(0);
            this.setState({gameState: gameState});
        }
    }

    newGame() {
        console.log("New Game");

        this.generateBoard();

        this.setState({gameActive: true});
        this.setState({btndisabled: "1"});

        axios.post('http://localhost:3000/newgame', { bet: this.state.bet}, {
            headers: {
                'Authorization': `Bearer `+ this.token
            }
        }).then(response => {
            if(response.data) {
                console.log("GAME: new game successful")
                this.setState({game_id: response.data.game_id})
            } else {
                console.log("GAME: Game creation error")
            }
        }).catch(error => {
            console.log("catch error");
            console.log(error);
        })
    }

    betInputUpdate(valueString) {
        let bet = valueString * 100;
        this.setState({ bet: bet });
    }

    handleUpdate(event) {
        const target = event.target;
        const name = target.name;
        console.log(name);

        if(this.state.gameActive === true) {
        
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

                    if(game_status === 1) {
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
        let gameDisabled = '';
        let newGameDisabled = '';
        let cashoutDisabled = '';

        if(this.state.gameActive === false) {
            newGameDisabled = 'active';
            cashoutDisabled = '';
            gameDisabled = '';
        } else {
            newGameDisabled = '';
            cashoutDisabled = 'active';
            gameDisabled = 'active';
        }

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
            buttons.push(<Button disabled={!gameDisabled} h={20} colorScheme='blue' name={index} key={index} onClick={_this.handleUpdate}>{displayText}</Button>);
        });

        return (
            <div>
                <Flex align={'center'} justify={'center'}>
                    <Stack spacing={8} mx={'auto'} maxW={'4xl'} py={12} px={6}>
                        <Grid w={'3xl'} templateColumns='repeat(3, 1fr)' gap={6}>
                            <GridItem colSpan={1}>
                                <VStack
                                divider={<StackDivider borderColor='gray.200' />}
                                spacing={4}
                                align='stretch'
                                >
                                    <Box>
                                        <Stat>
                                            <StatLabel>Balance</StatLabel>
                                            <StatNumber>£10,000.00</StatNumber>
                                        </Stat>
                                    </Box>
                                    <Box>
                                        <NumberInput onChange={(valueString) => this.betInputUpdate(valueString)} defaultValue={5} min={1} max={100} step={1}>
                                        <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Button mt={2} w='100%' disabled={!newGameDisabled} colorScheme='green' onClick={() => this.newGame()}>New Game</Button>
                                    </Box>
                                    <Box>
                                        <Stat mt={2}>
                                            <StatLabel>Inital Bet</StatLabel>
                                            <StatNumber>£10.00</StatNumber>
                                        </Stat>
                                        <Stat mt={2}>
                                            <StatLabel>Current Mulitiplier</StatLabel>
                                            <StatNumber>x10</StatNumber>
                                        </Stat>
                                        <Stat mt={2}>
                                            <StatLabel>Winnings</StatLabel>
                                            <StatNumber>£100.00</StatNumber>
                                        </Stat>
                                        <Button mt={2} w='100%' disabled={!cashoutDisabled} colorScheme='green' onClick={() => this.newGame()}>Cash Out</Button>
                                    </Box>
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Grid templateColumns='repeat(5, 1fr)' gap={2}>
                                    {buttons}
                                </Grid>
                            </GridItem>
                        </Grid>
                    </Stack>
                </Flex>
            </div>
        );
    }
}

export default Mines;
