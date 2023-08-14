import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

// interface is defining the props for the Box component. the prop Children is allowing us to have children components in our main.tsx file for the GameCardContainer component
interface Props {
  children: ReactNode;
}
// this is a container by default renders a div. this container is like a box that holds our card elements.
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box width="300px" borderRadius={10} overflow="hidden">
      {children}
    </Box>
  );
};

export default GameCardContainer;
