import { Skeleton, Text } from "@chakra-ui/react";
import React from "react";

const CardHeader: React.FC<{ isLoading: boolean; name: string }> = ({
    isLoading,
    name,
}) => {
    return (
        <Skeleton isLoaded={!isLoading} h="1.8em" w="80%" m="0 auto 1.5em auto">
            <Text
                fontSize="2xl"
                fontWeight="bold"
                casing="capitalize"
                textAlign="center"
                color="white"
                h="1.8em"
                transition="transform .3s ease-in-out"
                _hover={{
                    transform: "scale(1.3)",
                }}
            >
                {name}
            </Text>
        </Skeleton>
    );
};

export default CardHeader;
