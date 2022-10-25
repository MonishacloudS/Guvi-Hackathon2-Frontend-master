import React, { useState } from "react";
import "./Modal.css";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(false);
    };
    document.body.appendChild(script);
  });
};

const Order = ({ handleClose, show, children }) => {
  const [payment, setPayment] = useState({ payment_id: "", order_id: "" });

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const displayRazorPay = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
    } catch (err) {
      alert("Error in loading Razorpay Checkout");
    }

    const res = await fetch(
      "https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/razorpay",
      {
        method: "POST",
        body: JSON.stringify({
          amount: JSON.parse(localStorage.getItem("total")).price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    var options = {
      key: process.env.REACT_APP_key_id,
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
      name: JSON.parse(localStorage.getItem("total")).items + " items",
      description: "Test Transaction",
      image: "https://tinyurl.com/paythroughrazorpay",
      handler: function (response) {
        setPayment({
          payment_id: response.razorpay_payment_id,
          order_id: data.id,
        });
      },
      prefill: {
        name: localStorage.getItem("userName"),
        contact: localStorage.getItem("userNumber"),
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className={showHideClassName}>
        <section className="modal-main">
          {payment.payment_id && (
            <div
              className="alert alert-primary alert-dismissible fade show w-75 mx-auto mt-1"
              role="alert"
            >
              Thank you for your order, {localStorage.getItem("userName")}{" "}
              <br />
              Payment ID: {payment.payment_id} <br />
              Order ID: {payment.order_id}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {children}
          <button
            onClick={() => displayRazorPay()}
            className="btn btn-primary m-4 px-3 fs-5"
            type="button"
          >
            Checkout for Payment
          </button>
          <button
            className="btn btn-danger px-3 fs-5"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
        </section>
      </div>
    </>
  );
};

export default Order;








