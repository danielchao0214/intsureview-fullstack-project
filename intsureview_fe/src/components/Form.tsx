import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const Form: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("#000000");
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState("0");
  const [deleteCheckbox, setDeleteCheckbox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successMessageColor, setSuccessMessageColor] = useState("#000000");

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all confirmations are true
    if (!firstName || !lastName || !color) {
      setErrorMessage("Please fill out all fields");
      return;
    } else if (!readyToSubmit || !confirm || !(confirmNumber === "1")) {
      setErrorMessage("Please confirm all fields");
      return;
    }

    // Otherwise, everything's good, so reset the error message
    setErrorMessage("");

    try {
      let url;
      let method;

      // Determine the URL and method based on the delete checkbox
      if (deleteCheckbox) {
        url = `http://localhost:8000/delete/${firstName}/${lastName}/`;
        method = "DELETE";
      } else {
        url = "http://localhost:8000/submit/";
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          color,
        }),
      });

      // Check the response status
      if (response.ok) {
        const data = await response.json();
        const personColor = data.color; // Get the color of the person from the response
        setUser({
          firstName: data.first_name,
          lastName: data.last_name,
          color: data.color,
        });

        // Reset the form after successful submission
        handleReset();
        setSuccessMessage(
          deleteCheckbox ? "Successfully deleted" : "Successfully submitted"
        );
        setSuccessMessageColor(personColor);
      } else {
        setSuccessMessage("");
        setErrorMessage(
          response.status === 404
            ? "404 Error: Not found"
            : "Something went wrong"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
      setErrorMessage("Something went wrong");
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setColor("#000000");
    setReadyToSubmit(false);
    setConfirm(false);
    setConfirmNumber("0");
    setDeleteCheckbox(false);
    setErrorMessage("");
  };

  return (
    <form
      className="relative self-center max-w-lg p-6 mx-auto my-8 mt-8 bg-white rounded shadow-md lg:w-2/5 md:3/5 sm:4/5"
      onSubmit={handleSubmit}
    >
      {/*First Name input*/}
      <div className="mb-4">
        <label className="text-text" htmlFor="firstName">
          First Name
        </label>
        <input
          className="px-3 py-2 mt-1 ml-2 border border-gray-300 rounded-md"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/*Last Name input*/}
      <div className="mb-4">
        <label className="text-text" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="px-3 py-2 mt-1 ml-2 border border-gray-300 rounded-md"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/*Favorite Color input*/}
      <div className="mb-4">
        <label className="text-text" htmlFor="color">
          Favorite Color
        </label>
        <input
          className="px-3 mt-1 ml-2 border border-gray-300 rounded-md"
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/*Ready to submit input*/}
      <div className="mb-4">
        <label className="text-text" htmlFor="readyToSubmit">
          Ready to submit?
        </label>
        <select
          className="px-3 py-2 mt-1 ml-2 border border-gray-300 rounded-md"
          id="readyToSubmit"
          value={readyToSubmit ? "Yes" : "No"}
          onChange={(e) => setReadyToSubmit(e.target.value === "Yes")}
        >
          <option value=""></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/*Confirm input*/}
      {readyToSubmit && (
        <div className="mb-4">
          <label className="text-text">Are you sure?</label>
          <div className="flex items-center mt-1">
            <input
              className="border border-gray-300 rounded-md text-accent"
              type="radio"
              name="confirm"
              checked={confirm}
              onChange={() => setConfirm(true)}
            />
            <span className="ml-2">Yes</span>
          </div>
          <div className="flex items-center mt-1">
            <input
              className="border border-gray-300 rounded-md text-accent"
              type="radio"
              name="confirm"
              checked={!confirm}
              onChange={() => setConfirm(false)}
            />
            <span className="ml-2">No</span>
          </div>
        </div>
      )}

      {/*Confirm number input*/}
      {readyToSubmit && confirm && (
        <div className="mb-4">
          <label className="text-text" htmlFor="confirmNumber">
            Type 1 to confirm
          </label>
          <input
            className="px-3 py-2 mt-1 ml-2 border border-gray-300 rounded-md"
            type="number"
            id="confirmNumber"
            value={confirmNumber}
            onChange={(e) => setConfirmNumber(e.target.value)}
          />
        </div>
      )}

      {/*Delete checkbox input*/}
      {readyToSubmit && confirm && confirmNumber === "1" && (
        <div className="mb-4">
          <div className="flex items-center">
            <input
              className="border-gray-300 rounded text-accent focus:outline-none focus:ring-accent"
              type="checkbox"
              id="yesCheckbox"
              checked={deleteCheckbox}
              onChange={(e) => setDeleteCheckbox(e.target.checked)}
            />
            <label className="ml-2" htmlFor="deleteCheckbox">
              Delete?
            </label>
          </div>
        </div>
      )}

      {/*Error and success messages*/}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && (
        <p style={{ color: successMessageColor }}>{successMessage}</p>
      )}

      {/*Submit and reset buttons*/}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 font-bold text-white rounded bg-primary-button hover:bg-primary-button-hover"
          type="submit"
        >
          Submit
        </button>
        <input
          className="px-4 py-2 font-bold text-white rounded bg-secondary-button hover:bg-secondary-button-hover"
          type="reset"
          onClick={handleReset}
        />
      </div>
    </form>
  );
};

export default Form;
