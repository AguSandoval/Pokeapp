import React from "react";
import PokeApp from "./components/PokeApp";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider>
            <PokeApp />
        </ChakraProvider>
    );
}

export default App;
