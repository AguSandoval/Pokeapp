import { Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { IStats } from "../../interfaces/Interfaces";

const PokemonStats: React.FC<{
    measures: { height: number; weight: number };
    stats: IStats[];
}> = ({ measures, stats }) => {
    const { height, weight } = measures;
    return (
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
                <Text fontWeight="bold" color="gray.500">
                    Height
                </Text>
                <Text>{height}m</Text>
            </GridItem>

            <GridItem
                display="flex"
                flexDirection="column"
                colSpan={3}
                alignItems="center"
            >
                <Text fontWeight="bold" color="gray.500">
                    Weight
                </Text>
                <Text>{weight}kg</Text>
            </GridItem>

            {stats?.map((stat: IStats) => (
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
    );
};

export default PokemonStats;
