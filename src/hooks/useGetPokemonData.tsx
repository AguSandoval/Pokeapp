import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface IType {
    name: string;
    color: string;
}

interface IStats {
    name: string;
    value: number;
}

interface IPokemon {
    id: number;
    name: string;
    image: string;
    largeImage?: string;
    description?: string;
    weight: number;
    height: number;
    type: IType[];
    stats: IStats[];
    weakness?: IType[];
    strongness?: IType[];
}

const fetchPokemon = async (id: number | string) => {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
};

const fetchDescription = async (url: string) => {
    const data = await axios.get(url),
        description = await data.data.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
        );
    return await description?.flavor_text;
};

const fetchFightIndices = async (url: string) => {
    const data = await axios.get(url),
        weakness = await data?.data?.damage_relations?.double_damage_from?.map(
            (type: any) => type.name
            // ),
            // strongness = await data?.data?.damage_relations?.double_damage_to?.map(
            //     (type: any) => type.name
            // );
            // return { weakness, strongness };
        );
    return weakness;
};

const useGetPokemonData = (choose: string) => {
    const [description, setDescription] = useState<string>("");
    const [pokeId, setPokeId] = useState<number | string>(choose);
    const { data, isLoading, error } = useQuery(`getPokemon${pokeId}`, () => {
        return fetchPokemon(pokeId);
    });

    useEffect(() => {
        !isNaN(Number(choose))
            ? setPokeId(Number(choose))
            : setPokeId(choose.toLowerCase());
    }, [choose]);

    data?.data?.species?.url &&
        fetchDescription(data?.data.species.url).then((description: string) => {
            setDescription(description);
        });

    const typeColorSelector = (type: string) => {
        switch (type) {
            case "normal":
                return { color: "gray.200", name: "Normal" };
            case "fire":
                return { color: "red.500", name: "Fire" };
            case "water":
                return { color: "blue.300", name: "Water" };
            case "electric":
                return { color: "yellow.300", name: "Electric" };
            case "grass":
                return { color: "green.300", name: "Grass" };
            case "ice":
                return { color: "cyan.500", name: "Ice" };
            case "fighting":
                return { color: "red.400", name: "Fighting" };
            case "poison":
                return { color: "purple.300", name: "Poison" };
            case "ground":
                return { color: "orange.500", name: "Ground" };
            case "flying":
                return { color: "teal.200", name: "Flying" };
            case "psychic":
                return { color: "pink.500", name: "Psychic" };
            case "bug":
                return { color: "green.500", name: "Bug" };
            case "rock":
                return { color: "gray.400", name: "Rock" };
            case "ghost":
                return { color: "purple.100", name: "Ghost" };
            case "dragon":
                return { color: "yellow.500", name: "Dragon" };
            case "dark":
                return { color: "gray.500", name: "Dark" };
            case "steel":
                return { color: "teal.300", name: "Steel" };
            case "fairy":
                return { color: "pink.400", name: "Fairy" };
            default:
                return { color: "gray.500", name: "Unknown" };
        }
    };

    const pokemon: IPokemon = {
        id: data?.data?.id,
        name: data?.data?.name,
        image: data?.data?.sprites?.front_default,
        largeImage: data?.data?.sprites?.other?.home?.front_default,
        description: description,
        type: data?.data?.types?.map((type: any) => {
            // console.log(fetchFightIndices(type.type.url));
            return typeColorSelector(type.type.name);
        }),

        weight: parseFloat((data?.data?.weight * 0.1).toFixed(2)),
        height: parseFloat((data?.data?.height * 0.1).toFixed(2)),
        stats: data?.data?.stats?.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
        })),
    };
    // data?.data?.species?.url && fetchDescription(data?.data?.species?.url);
    return { pokemon, isLoading, error };
};

export default useGetPokemonData;
