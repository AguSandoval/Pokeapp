import { HStack, Skeleton, Tag } from "@chakra-ui/react";
import React from "react";
import { IType } from "../../interfaces/Interfaces";

const PokemonTypes: React.FC<{ isLoading: boolean; types: IType[] }> = ({
    isLoading,
    types,
}) => {
    return (
        <Skeleton isLoaded={!isLoading} height="1.5em" w="50%" my=".5em">
            <HStack align="center" justifyContent="center">
                {types?.map((type: IType) => (
                    <Tag
                        key={type.name}
                        bg={type.color}
                        fontSize="sm"
                        fontWeight="semibold"
                        mx="1em"
                    >
                        {type.name}
                    </Tag>
                ))}
            </HStack>
        </Skeleton>
    );
};

export default PokemonTypes;
