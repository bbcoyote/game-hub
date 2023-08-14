import { Badge } from "@chakra-ui/react";

// this interface defines the prop for score
interface Props {
  score: number;
}

// this component is our critic score in our game card
const CriticScore = ({ score }: Props) => {
  // this variable sets the score color based on height of score
  const color = score > 92 ? "green" : score > 84 ? "yellow" : "orange";
  return (
    // badge is a chakra component used to highlight an item in our case the critic score
    <Badge
      colorScheme={color}
      fontSize={"14px"}
      paddingX={2}
      borderRadius={"4px"}>
      {score}
    </Badge>
  );
};

export default CriticScore;
