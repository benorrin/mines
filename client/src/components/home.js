import {
    Flex,
    Stack,
    Link,
    Button,
    Heading,
    Text
    } from '@chakra-ui/react';

const Home = () => {
    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'5xl'}>SolMines</Heading>
                    <Text fontSize='3xl'>Classic Minesweeper With a Twist</Text>
                </Stack>
                <Stack spacing={8} align={'center'}>
                <Link href='https://mines.orrin.uk/play'>
                    <Button colorScheme='whatsapp' height='1em' width='100%'>
                        Play Now
                    </Button>
                </Link>
                </Stack>
            </Stack>
        </Flex>
)};

export default Home;