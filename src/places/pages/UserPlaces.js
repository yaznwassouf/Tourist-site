import React, { useEffect, useState } from "react";

import "./UserPlaces.css";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/hooks/http-hook";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scraper in the world",
//     imageUrl:
//       "data:image/jpeg;base64,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",
//     address: "20 W 34th St., New York, NY 10001",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9878584,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Empire State Building",
//     description: "One of the most famous sky scraper in the world",
//     imageUrl:
//       "data:image/jpeg;base64,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",
//     address: "V7J7+XGC",
//     location: {
//       lat: 34.8780271,
//       lng: 36.2568243,
//     },
//     creator: "u2",
//   },
// ];
const UserPlaces = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <div>
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedPlaces && (
          <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
        )}
      </React.Fragment>
    </div>
  );
};

export default UserPlaces;