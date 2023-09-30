import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/components/hooks/form-hook";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./FormPlace.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, InputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/places", "POST", formData);
      history.push("/");
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="ETNTER THE NAME!"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter a valid title."
          onInput={InputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="ADD A DESCRIPTION!"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="please enter a valid desc at least(5 characters )."
          onInput={InputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Adress"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter a valid title."
          onInput={InputHandler}
        />

        <div className="place-item__actions">
          <ImageUpload
            id="image"
            onInput={InputHandler}
            errorText="Please Provide an image. "
          />
          <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
          </Button>
          <Button>CONNECT</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
