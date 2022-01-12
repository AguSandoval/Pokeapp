import { Flex, SkeletonText } from "@chakra-ui/react";
import React, { useState } from "react";
import { IPokemon } from "../../interfaces/Interfaces";
import CardHeader from "./CardHeader";
import CardImage from "./CardImage";
import PokemonDescription from "../Pokemon/PokemonDescription";
import PokemonTypes from "../Pokemon/PokemonTypes";
import PokemonStats from "../Pokemon/PokemonStats";

const Card: React.FC<{
    pokemon: IPokemon;
    typeColor: string;
    isLoading: boolean;
}> = ({ pokemon, typeColor, isLoading }) => {
    const [toggleStats, setToggleStats] = useState<boolean>(false);

    return (
        <Flex
            direction="column"
            align="center"
            h="450px"
            w="600px"
            bg="white"
            boxShadow="lg"
            borderRadius="8px"
        >
            <Flex
                direction="column"
                h="150px"
                w="100%"
                bg={typeColor}
                mb="3em"
                pt="1em"
                borderRadius="8px 8px 0 0"
            >
                <CardHeader isLoading={isLoading} name={pokemon?.name} />
                <CardImage
                    isLoading={isLoading}
                    typeColor={typeColor}
                    imageProps={{
                        name: pokemon.name,
                        image: pokemon.image,
                        largeImage: pokemon.largeImage,
                    }}
                />
            </Flex>
            <PokemonTypes isLoading={isLoading} types={pokemon?.type} />
            <Flex
                align="center"
                justify="center"
                onClick={() => setToggleStats(!toggleStats)}
                _hover={{
                    background: "gray.100",
                }}
                transition="background-color .25s ease-in"
                w="85%"
                borderRadius="8px"
                cursor="pointer"
            >
                <SkeletonText
                    w="100%"
                    p={2}
                    borderRadius="8px"
                    isLoaded={!isLoading}
                    noOfLines={4}
                    spacing="4"
                >
                    {!toggleStats ? (
                        <PokemonDescription description={pokemon.description} />
                    ) : (
                        <PokemonStats
                            measures={{
                                height: pokemon.height,
                                weight: pokemon.weight,
                            }}
                            stats={pokemon?.stats}
                        />
                    )}
                </SkeletonText>
            </Flex>
        </Flex>
    );
};

export default Card;
