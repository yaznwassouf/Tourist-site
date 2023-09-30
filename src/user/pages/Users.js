import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import img2 from "./ph4.jpg";
import img3 from "./ph2.jpg";
import img4 from "./ph3.jpg";
import "./AllPlaces.css";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <h1 className="h2">
        welcome to <h2>My Trip</h2>
      </h1>
      <h2 className="q">make your distinctive experience  with us!</h2>
      <div>
        <img
          className="photo2"
          src={img2}
          alt="photo1"
          width={320}
          height={320}
        />
        <img
          className="photo3"
          src={img3}
          alt="photo2"
          width={320}
          height={320}
        />
        <img
          className="photo4"
          src={img4}
          alt="photo3"
          width={320}
          height={320}
        />
      </div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
