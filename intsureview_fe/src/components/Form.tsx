import React, { useState } from "react";

const Form: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("#000000");
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState("0");
  const [deleteCheckbox, setDeleteCheckbox] = useState(false);
  const [showConfirmationError, setShowConfirmationError] = useState(0); // State variable to control showing confirmation error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all confirmations are true
    if (!firstName || !lastName || !color) {
      setShowConfirmationError(1);
      return;
    } else if (!readyToSubmit || !confirm || !(confirmNumber === "1")) {
      setShowConfirmationError(2);
      return;
    }

    setShowConfirmationError(0);

    try {
      if (deleteCheckbox) {
        // Send a delete request to delete the person
        await fetch(`http://localhost:8000/delete/${firstName}/${lastName}/`, {
          method: "DELETE",
        });
      } else {
        // Send a put request to add/update the person

        await fetch("http://localhost:8000/submit/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            color,
          }),
        });
      }

      // Reset the form after successful submission
      handleReset();
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
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
    setShowConfirmationError(0);
  };

  return (
    <form
      className="relative self-center max-w-lg p-6 mx-auto my-8 mt-8 bg-white rounded shadow-md lg:w-2/5 md:3/5 sm:4/5"
      onSubmit={handleSubmit}
    >
      {/* First Name input */}
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

      {/* Last Name input */}
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

      {/* Color input */}
      <div className="mb-4">
        <label className="text-text" htmlFor="color">
          Color
        </label>
        <input
          className="px-3 mt-1 ml-2 border border-gray-300 rounded-md"
          type="color"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/* Ready to submit? select */}
      <div className="mb-4">
        <label className="text-text" htmlFor="readyToSubmit">
          Ready to submit?
        </label>
        <select
          className="px-3 py-2 mt-1 ml-2 border border-gray-300 rounded-md"
          id="readyToSubmit"
          defaultValue="No"
          onChange={(e) => setReadyToSubmit(e.target.value === "Yes")}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>{" "}
        </select>
      </div>

      {/* Confirmation radio buttons */}
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

      {/* Confirmation number input */}
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

      {/* Yes checkbox */}
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

      {/* Display error message */}
      {showConfirmationError === 1 && (
        <p className="text-red-500">Please fill out all fields.</p>
      )}
      {showConfirmationError === 2 && (
        <p className="text-red-500">Please confirm all the fields.</p>
      )}

      {/* Submit and reset buttons */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 font-bold text-white rounded bg-primary-button hover:bg-primary-button-hover"
          type="submit"
        >
          Submit
        </button>
        <button
          className="px-4 py-2 font-bold text-white rounded bg-secondary-button hover:bg-secondary-button-hover"
          type="reset"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
