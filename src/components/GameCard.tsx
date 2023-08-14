import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";

// this interface is allowing us to use the prop Game from our useGame component so we can render its props to the UI
interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card>
      {/* Image is a chakra component that renders an image. in our image component we are cropping the image fro the api to speed up our rendering */}
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
        <HStack justifyContent="space-between">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore score={game.metacritic} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameCard;
