import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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

// this interface defines props for us to set the games data
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

// this is a custom hook we are using to manage our state, fetch and handle API requests for games data, errors and loading states
const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // this hook is performing an abortcontroller function, handling isLoading state, initiates the api request, catches and updates error messages and peforms a cleanup function at the end before the component unmounts from the DOM
  useEffect(() => {
    // first the hook created this instance incase the component unmounts before the api request is complete
    const controller = new AbortController();
    // setLoading adds some state to let the user know content is being loaded
    setLoading(true);
    // Then the get method is called to initiate the api request from the games endpoint. the signal: controller.signal is passed to the request config and will abort the api request incase the component unmounts before it completes
    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      //   here the api response is handled. setGenres updates the genre state with game data this data is extracted from the results property. and the isLoading state is set back to false.
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      //   in the catch block any errors that occur during the api request are handled.
      .catch((err) => {
        if (err instanceof CanceledError) return;
        // in the event there was an actual error regarding the api request the error message is stored in the error state. and the isLoading state is set back to false concluding the loading process
        setError(err.message);
        setLoading(false);
      });
    // the use effect returns back a cleanup function this is what aborts the api request when the component that uses useGames hook is unmounted it calls controller.abort() and cancels any ongoing request before the component is removed from the DOM
    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
