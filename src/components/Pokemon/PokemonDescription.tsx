import { Text } from "@chakra-ui/react";
import React from "react";

const PokemonDescription: React.FC<{ description: string }> = ({
    description,
}) => {
    return (
        <Text textAlign="center" mt="1" fontSize=".8em">
            {description}
        </Text>
    );
};

export default PokemonDescription;
