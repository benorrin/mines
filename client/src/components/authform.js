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
    let text;
    let link;

    if(props.isSignup === true){
        heading = "Create a new account";
        button = <Button bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500'}}>Sign up</Button>;
        text = "Already have an account?";
        link = <Link color={'blue.400'}>Login</Link>
    } else{
        heading = "Sign in to your account";
        button = <Button bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500'}}>Sign in</Button>;
        text = "Don't have an account yet?";
        link = <Link color={'blue.400'}>Register</Link>;
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
                            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            {button}
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                {text} {link}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}