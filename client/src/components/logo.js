import React from "react";
import { Link, Box, Text } from "@chakra-ui/react";

export default function Logo(props) {
    return (
        <Box {...props}>
            <Text fontSize="4xl" fontWeight="bold">
                <Link href='https://mines.orrin.uk' isExternal>
                    SolMines
                </Link>
            </Text>
        </Box>
    );
}
    