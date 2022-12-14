import React from 'react';
import axios from 'axios';
import { Alert, AlertIcon, Box, Button, Flex, Grid, GridItem, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Stat, StatLabel, StatNumber, VStack, StackDivider } from '@chakra-ui/react';

class Mines extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            error: "",
            game_id: "",
            buttons: 25,
            gameActive: false,
            gameState: [],
            btndisabled: "",
            bet: 500,
            balance: 0,
            moves: 0,
            winnings: 0
        }

        this.token = localStorage.getItem("token");

        this.handleUpdate = this.handleUpdate.bind(this);
        this.betInputUpdate = this.betInputUpdate.bind(this);
    }

    componentDidMount() {
        this.generateBoard();
        this.getUserBalance();
    }

    getUserBalance() {
        axios.post('https://api.mines.orrin.uk/user', {}, {
            headers: {
                'Authorization': `Bearer `+ this.token
            }
        }).then(response => {
            if(response.data) {
                this.setState({balance: response.data.balance})
            } else {
                this.setState({error: "Error getting user data"})
            }
        }).catch(error => {
            console.log(error);
        })
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

        this.setState({moves: 0});
        this.setState({winnings: 0});

        axios.post('https://api.mines.orrin.uk/game/new', { bet: this.state.bet}, {
            headers: {
                'Authorization': `Bearer `+ this.token
            }
        }).then(response => {
            if(response.data) {
                this.setState({game_id: response.data.game_id})
                this.setState({balance: response.data.balance})
                this.setState({gameActive: true})
                this.setState({btndisabled: "1"})
            } else {
                this.setState({error: "Error creating new game"})
            }
        }).catch(error => {
            console.log(error);
        })
    }

    endGame() {
        console.log("End game");

        axios.post('https://api.mines.orrin.uk/game/end', { game_id: this.state.game_id }, {
            headers: {
                'Authorization': `Bearer `+ this.token
            }
        }).then(response => {
            if(response.data) {
                this.setState({game_id: response.data.game_id})
                this.setState({balance: response.data.balance})
                this.setState({gameActive: false})
                this.setState({btndisabled: ""})
            } else {
                this.setState({error: "Error ending game"})
            }
        }).catch(error => {
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

            axios.post('https://api.mines.orrin.uk/game/move', {
                game_id: this.state.game_id,
                square: name
            }, {
                headers: {
                    'Authorization': `Bearer `+ this.token
                }
            }).then(response => {
                if(response.data) {
                    let revealed = response.data.revealed
                    let game_status = response.data.game_status
                    let winnings = (this.state.bet * response.data.moves);

                    Object.keys(revealed).forEach(function(key) {
                        gameState[key] = revealed[key] + 1;
                    })
                    this.setState({gameState: gameState})
                    this.setState({moves: response.data.moves})
                    this.setState({winnings: winnings})

                    if(game_status === 1) {
                        //Game over
                        this.setState({gameActive: false})
                        this.setState({btndisabled: ''})
                    }
                } else {
                    console.log("GAME: move error")
                }
            }).catch(error => {
                console.log(error);
            })
        }

    }

    render() {
        let _this = this;
        let buttons = [];
        let displayText = "";
        let displayError = "";
        let displayBet = (this.state.bet / 100).toFixed(2);
        let gameDisabled = '';
        let newGameDisabled = '';
        let cashoutDisabled = '';

        let displayBalance = this.state.balance > 0 ? this.state.balance / 100 : 0;

        let displayWinnings = this.state.winnings > 0 ? this.state.winnings / 100 : 0;

        if(this.state.error !== "") {
            displayError =  <Alert mt={2} status='error'>
                                <AlertIcon />
                                {this.state.error}
                            </Alert>;
        }

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
                    displayText = "????";
                    break;
                case 2:
                    displayText = "???";
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
                                            <StatNumber>??{displayBalance}</StatNumber>
                                        </Stat>
                                    </Box>
                                    <Box>
                                        <NumberInput disabled={!newGameDisabled} onChange={(valueString) => this.betInputUpdate(valueString)} defaultValue={5} min={1} max={100} step={1}>
                                        <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        {displayError}
                                        <Button mt={2} w='100%' disabled={!newGameDisabled} colorScheme='green' onClick={() => this.newGame()}>New Game</Button>
                                    </Box>
                                    <Box>
                                        <Stat mt={2}>
                                            <StatLabel>Inital Bet</StatLabel>
                                            <StatNumber>??{displayBet}</StatNumber>
                                        </Stat>
                                        <Stat mt={2}>
                                            <StatLabel>Current Mulitiplier</StatLabel>
                                            <StatNumber>x{this.state.moves}</StatNumber>
                                        </Stat>
                                        <Stat mt={2}>
                                            <StatLabel>Winnings</StatLabel>
                                            <StatNumber>??{displayWinnings}</StatNumber>
                                        </Stat>
                                        <Button mt={2} w='100%' disabled={!cashoutDisabled} colorScheme='green' onClick={() => this.endGame()}>Cash Out</Button>
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
