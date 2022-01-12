import { Center, Container, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import SearchPokemon from "./components/Pokemon/SearchPokemon";
import useGetPokemonData from "./hooks/useGetPokemonData";
import { IType } from "./interfaces/Interfaces";

const App = () => {
    const [search, setSearch] = useState<string>(
        Math.floor(Math.random() * 850).toString()
    );
    const [typeColor, setTypeColor] = useState<string>("gray.200");
    const { pokemon, isLoading } = useGetPokemonData(search);
    const toast = useToast();

    const getTypeColor = () => {
        pokemon?.type?.map((type: IType, index: number) => {
            index === 0 && setTypeColor(type.color);
        });
    };

    useEffect(() => {
        getTypeColor();
    }, [pokemon]);

    return (
        <>
            <Container mt="2em">
                <Center>
                    <Card
                        typeColor={typeColor}
                        pokemon={pokemon}
                        isLoading={isLoading}
                    />
                </Center>
                <Center my={8}>
                    <SearchPokemon setSearch={setSearch} />
                </Center>
            </Container>
        </>
    );
};

export default App;
