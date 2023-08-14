import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

// defining genre props
interface Genre {
  id: number;
  name: string;
}

// defining props we get from the api
interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

// our custom hook we are using to fetch and handle API requests for genre data, manages loading states, and handles errors.
const useGenres = () => {
  // this hook stores our fetched genre data and setGenres updates our state
  const [genres, setGenres] = useState<Genre[]>([]);
  //   this holds our error messages related to the api request
  const [error, setError] = useState("");
  //   this handles our loading state and indicates when data is being fetched and loaded
  const [isLoading, setLoading] = useState(false);

  //   this hook is performing an abortcontroller function, handling isLoading state, initiates the api request, catches and updates error messages and peforms a cleanup function at the end before the component unmounts from the DOM
  useEffect(() => {
    // first the hook created this instance incase the component unmounts before the api request is complete
    const controller = new AbortController();

    // setLoading adds some state to let the user know content is being loaded
    setLoading(true);
    // Then the get method is called to initiate the api request from the genre endpoint. the signal: controller.signal is passed to the request config and will abort the api request incase the component unmounts before it completes
    apiClient
      .get<FetchGenreResponse>("/genres", { signal: controller.signal })
      //   here the api response is handled. setGenres updates the genre state with genre data this data is extracted from the results property. and the isLoading state is set back to false.
      .then((res) => {
        setGenres(res.data.results);
        setLoading(false);
      })
      //   in the catch block any errors that occur during the api request are handled.
      .catch((err) => {
        // the if statement checks if it was an intentional the block returns early without taking any action.
        if (err instanceof CanceledError) return;
        // in the event there was an actual error regarding the api request the error message is stored in the error state. and the isLoading state is set back to false concluding the loading process
        setError(err.message);
        setLoading(false);
      });
    // the use effect returns back a cleanup function this is what aborts the api request when the component that uses useGenres hook is unmounted it calls controller.abort() and cancels any ongoing request before the component is removed from the DOM
    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
