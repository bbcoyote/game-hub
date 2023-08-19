import { GameQuery } from "../App";
import useData from "./useData";

// this interface is defining our Platform props to render playstation, xbox, etc
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// this interface defines our game props to pass to our functions to rendert games to our cards
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

// this is a custom hook we are using to manage our state, fetch and handle API requests for games data, errors and loading states
const useGames = (gameQuery: GameQuery) =>
  useData<Game>(
    "/games",
    {
      params: {
        genres: gameQuery.genre?.id,
        platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
      },
    },
    [gameQuery]
  );

export default useGames;
