import { Flex, Image, SkeletonCircle } from "@chakra-ui/react";
import React, { useState } from "react";

const CardImage: React.FC<{
    isLoading: boolean;
    typeColor: string;
    imageProps: {
        name: string;
        image: string;
        largeImage: string;
    };
}> = ({ isLoading, typeColor, imageProps }) => {
    const [toggleImage, setToggleImage] = useState<boolean>(false);
    const { image, largeImage, name } = imageProps;
    return (
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
            >
                <Image
                    src={toggleImage ? image : largeImage}
                    alt={name}
                    w="100%"
                    mb={toggleImage ? "0" : "2em"}
                    transition="transform .3s ease-in-out"
                    _hover={{
                        transform: "scale(1.3)",
                    }}
                />
            </Flex>
        </SkeletonCircle>
    );
};

export default CardImage;
