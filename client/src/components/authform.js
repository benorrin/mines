import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text
    } from '@chakra-ui/react';

export default function AuthForm(props) {

    let heading;
    let button;
    let promptText;
    let promptLink;
    let forgotPassword;

    if(props.isSignup === true){
        heading = "Create a new account";
        button = <Button bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500'}}>Sign up</Button>;
        promptText = "Already have an account?";
        promptLink = <Link color={'blue.400'}>Login</Link>

    } else{
        heading = "Sign in to your account";
        button = <Button bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500'}}>Sign in</Button>;
        promptText = "Don't have an account yet?";
        promptLink = <Link color={'blue.400'}>Register</Link>;
        forgotPassword = <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                            <Link color={'blue.400'}>Forgot password?</Link>
                        </Stack>;

    }

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>{heading}</Heading>
                </Stack>
                <Box rounded={'lg'} boxShadow={'lg'} p={4}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            {forgotPassword}
                            {button}
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                {promptText} {promptLink}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}