import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchPokemon: React.FC<{
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setSearch }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
        }
    };

    return (
        <Flex direction="column" justify="center" align="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<BiSearchAlt color="gray.300" />}
                />
                <Input
                    type="text"
                    placeholder="Search by Pokémon..."
                    onKeyDown={handleKeyDown}
                />
            </InputGroup>
            <Text fontWeight="bold" color="gray.500" mt={2}>
                OR
            </Text>
            <Button
                mt={2}
                colorScheme="blue"
                onClick={() =>
                    setSearch(Math.floor(Math.random() * 850).toString())
                }
            >
                Random
            </Button>
        </Flex>
    );
};

export default SearchPokemon;
