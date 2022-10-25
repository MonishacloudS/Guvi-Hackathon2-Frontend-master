import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchMessage = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/contactus", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          number,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSuccess(data.response);
      setName("");
      setEmail("");
      setNumber("");
      setMessage("");
    };

    fetchMessage();
  };

  return (
    <div className="wrapper my-4">
      {success && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          <strong>{success}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <form>
        <p className="text-center fs-2">Contact Rent App</p>
        <p>
          Contact us with any questions you may have and we will get in touch
          soon!
        </p>

        <label className="form-label text-bold" htmlFor="name">
          Name
        </label>
        <div className="mandatory">*</div>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="form-label text-bold" htmlFor="email">
          Email
        </label>
        <div className="mandatory">*</div>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label text-bold" htmlFor="phone">
          Phone
        </label>
        <div className="mandatory">*</div>
        <input
          type="number"
          className="form-control"
          id="phone"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />

        <label className="form-label text-bold" htmlFor="floatingTextarea2">
          Message
        </label>
        <div className="mandatory">*</div>
        <textarea
          className="form-control"
          placeholder="Leave a Message here"
          id="floatingTextarea2"
          style={{ height: "100px" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <div className="mt-2">
          <div className="mandatory">*</div>
          <span className="text-bold">indicates required field</span>
        </div>

        <button
          className="btn btn-primary my-4 w-100 button-design"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;






