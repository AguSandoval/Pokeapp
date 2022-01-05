import {
    Button,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Tag,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import useGetPokemonData from "../hooks/useGetPokemonData";
import { BiSearch } from "react-icons/bi";

interface IType {
    name: string;
    color: string;
}

interface IStats {
    name: string;
    value: number;
}

const PokeApp = () => {
    const [search, setSearch] = useState<string>(
        Math.floor(Math.random() * 850).toString()
    );
    const [typeColor, setTypeColor] = useState<string>("gray.200");
    const [toggleStats, setToggleStats] = useState<boolean>(false);
    const [toggleImage, setToggleImage] = useState<boolean>(false);
    const { pokemon, isLoading, error } = useGetPokemonData(search);
    const toast = useToast();

    const getTypeColor = () => {
        pokemon?.type?.map((type: IType, index: number) => {
            index === 0 && setTypeColor(type.color);
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearch(e.currentTarget.value);
        }
    };

    useEffect(() => {
        getTypeColor();
    }, [pokemon]);

    return (
        <>
            <Container mt="2em">
                <Center>
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        borderRadius="8px"
                        width="600px"
                        height="450px"
                        boxShadow="lg"
                        backgroundColor="white"
                    >
                        <Flex
                            display="flex"
                            flexDirection="column"
                            height="150px"
                            backgroundColor={typeColor}
                            w="100%"
                            mb="3em"
                            pt="1em"
                            borderRadius="8px 8px 0 0"
                        >
                            <Skeleton
                                isLoaded={!isLoading}
                                h="1.8em"
                                w="80%"
                                m="0 auto 1.5em auto"
                            >
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    casing="capitalize"
                                    textAlign="center"
                                    color="white"
                                    h="1.8em"
                                >
                                    {pokemon.name}
                                </Text>
                            </Skeleton>
                            <SkeletonCircle
                                isLoaded={!isLoading}
                                w="8em"
                                h="8em"
                                m="0 auto"
                                cursor="pointer"
                                onClick={() => setToggleImage(!toggleImage)}
                                boxShadow="lg"
                            >
                                <Flex
                                    borderRadius="full"
                                    boxSize="8em"
                                    backgroundColor={typeColor}
                                    align="center"
                                    _hover={{
                                        img: {
                                            transition: "all .3s ease-in-out",
                                            transform: "scale(1.3)",
                                        },
                                    }}
                                >
                                    {toggleImage ? (
                                        <Image
                                            src={pokemon.image}
                                            alt={pokemon.name}
                                            boxSize="8em"
                                            m="0 auto"
                                        />
                                    ) : (
                                        <Image
                                            src={pokemon?.largeImage}
                                            alt={pokemon.name}
                                            w="100%"
                                            mb="2em"
                                        />
                                    )}
                                </Flex>
                            </SkeletonCircle>
                        </Flex>
                        <Skeleton
                            isLoaded={!isLoading}
                            height="1.5em"
                            w="50%"
                            my=".5em"
                        >
                            <HStack align="center" justifyContent="center">
                                {pokemon.type?.map((type: IType) => (
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
                        <Flex
                            align="center"
                            justifyContent="center"
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
                                    <Text
                                        textAlign="center"
                                        mt="1"
                                        fontSize=".8em"
                                    >
                                        {pokemon.description}
                                    </Text>
                                ) : (
                                    <Grid
                                        templateColumns="repeat(6, 1fr)"
                                        autoRows="auto"
                                        columnGap={14}
                                        rowGap={4}
                                        fontSize=".7em"
                                    >
                                        <GridItem
                                            display="flex"
                                            colSpan={3}
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Text
                                                fontWeight="bold"
                                                color="gray.500"
                                            >
                                                Height
                                            </Text>
                                            <Text>{pokemon.height}m</Text>
                                        </GridItem>

                                        <GridItem
                                            display="flex"
                                            flexDirection="column"
                                            colSpan={3}
                                            alignItems="center"
                                        >
                                            <Text
                                                fontWeight="bold"
                                                color="gray.500"
                                            >
                                                Weight
                                            </Text>
                                            <Text>{pokemon.weight}kg</Text>
                                        </GridItem>

                                        {pokemon?.stats?.map((stat: IStats) => (
                                            <GridItem
                                                display="flex"
                                                flexDirection="column"
                                                colSpan={3}
                                                alignItems="center"
                                                key={stat.name}
                                            >
                                                <Text
                                                    fontWeight="bold"
                                                    casing="capitalize"
                                                    color="gray.500"
                                                >
                                                    {stat.name}
                                                </Text>
                                                <Text>{stat.value}</Text>
                                            </GridItem>
                                        ))}
                                    </Grid>
                                )}
                            </SkeletonText>
                        </Flex>
                    </Flex>
                </Center>
                <Center my={8}>
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        align="center"
                    >
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BiSearch color="gray.300" />}
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
                                setSearch(
                                    Math.floor(Math.random() * 850).toString()
                                )
                            }
                        >
                            Random
                        </Button>
                    </Flex>
                </Center>
            </Container>
            {error &&
                toast({
                    title: `Pokemon not found.`,
                    description: `Please try with another Pokémon.`,
                    status: "error",
                    position: "top",
                    isClosable: true,
                })}
        </>
    );
};

export default PokeApp;
