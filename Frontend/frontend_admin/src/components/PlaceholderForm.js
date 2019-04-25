import React from "react";
import { db, messaging } from "../firebase";

import history from "../history";

const handleFormSubmit = e => {
  e.preventDefault();
  var eventualID = "";
  const submitTime = new Date();
  db.collection("updates").add({
    type: "client-create",
    userID: "none",
    requester: e.target.elements[0].value,
    subject: e.target.elements[2].value,
    group: e.target.elements[3].value,
    content: e.target.elements[4].value,
    updatedTime: submitTime
  });
  db.collection("tickets")
    .add({
      requester: e.target.elements[0].value,
      email: e.target.elements[1].value,
      subject: e.target.elements[2].value,
      group: e.target.elements[3].value,
      content: e.target.elements[4].value,
      submitTime: submitTime,
      lastUpdatedTime: submitTime,
      status: "Unviewed",
      statusInt: "0"
    })
    .then(response => {
      eventualID = response.id;
      document.querySelector(".form").reset();

      history.push({
        pathname: `/placeholderform=${eventualID}`
      });
    });
};

const PlaceholderForm = () => {
  return (
    <div>
      <h1>
        This is a placeholder form. The eventual form will be the chatbot.
      </h1>
      <br />
      <h1>
        To access the admin dashboard go to{" "}
        <a
          style={{ textDecoration: "underline", color: "purple" }}
          href="https://acnapi-335c7.firebaseapp.com"
        >
          https://acnapi-335c7.firebaseapp.com
        </a>
      </h1>
      <br />
      <form
        className="form"
        onSubmit={handleFormSubmit}
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
      >
        <label htmlFor="Name">Name: </label>
        <input type="text" required />
        <label htmlFor="Email">Email: </label>
        <input type="text" required />
        <label htmlFor="Name">Subject: </label>
        <input type="text" required />
        <label htmlFor="Name">Group: </label>
        <input type="text" required />
        <label htmlFor="Name">Content: </label>
        <textarea type="text" required />
        <label type="text">Upload Media: </label>
        <input type="file" multiple />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PlaceholderForm;
