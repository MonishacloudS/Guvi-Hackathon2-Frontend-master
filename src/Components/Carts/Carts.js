import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Datepicker from "../DatePicker/DatePicker";
import Modal from "../Modal/Modal";
import Order from "../Order/Order";
import "./Cart.css";

const Carts = () => {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(1);
  const [qtyprice, setQtyPrice] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const res = await fetch(
        "https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/cart"
      );
      const data = await res.json();
      setCart(data);
    };
    fetchCartData();
  }, []);

  const removeFromCart = (item) => {
    const removeItemFromCart = async () => {
      const res = await fetch(
        "https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/cart",
        {
          method: "DELETE",
          body: JSON.stringify({
            name: item.name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await res.json();
    };
    removeItemFromCart();

    if (!localStorage.getItem(item.name)) {
      localStorage.setItem(
        "total",
        JSON.stringify({
          price: JSON.parse(localStorage.getItem("total")).price - item.price,
          items: JSON.parse(localStorage.getItem("total")).items - 1,
        })
      );
    }

    if (localStorage.getItem(item.name)) {
      localStorage.setItem(
        "total",
        JSON.stringify({
          price:
            JSON.parse(localStorage.getItem("total")).price -
            JSON.parse(localStorage.getItem(item.name)).quantity * item.price,
          items: JSON.parse(localStorage.getItem("total")).items - 1,
        })
      );
      localStorage.removeItem(item.name);
    }
    setCart(cart.filter((cartItem) => cartItem.name !== item.name));
  };

  const handleIncreaseQty = (item) => {
    if (localStorage.getItem(item.name)) {
      const prod = JSON.parse(localStorage.getItem(item.name));
      prod.quantity += 1;
      prod.price = prod.quantity * item.price;
      localStorage.setItem(item.name, JSON.stringify(prod));

      localStorage.setItem(
        "total",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("total")),
          price: JSON.parse(localStorage.getItem("total")).price + item.price,
        })
      );

      setQty(prod.quantity);
      setQtyPrice(prod.quantity * item.price);
    } else {
      localStorage.setItem(
        "total",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("total")),
          price: JSON.parse(localStorage.getItem("total")).price + item.price,
        })
      );
      localStorage.setItem(
        item.name,
        JSON.stringify({ quantity: 2, price: 2 * item.price })
      );
      setQty(2);
      setQtyPrice(2 * item.price);
    }
  };

  const handleDecreaseQty = (item) => {
    let itm = JSON.parse(localStorage.getItem(item.name));
    if (!itm) {
      removeFromCart(item);
      return;
    }
    const totalQty = itm.quantity;
    if (totalQty === 1) {
      removeFromCart(item);
      return;
    }
    localStorage.setItem(
      item.name,
      JSON.stringify({
        quantity: totalQty - 1,
        price: (totalQty - 1) * item.price,
      })
    );
    localStorage.setItem(
      "total",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("total")),
        price: JSON.parse(localStorage.getItem("total")).price - item.price,
      })
    );
    setQty(JSON.parse(localStorage.getItem(item.name)).quantity);
    setQtyPrice(JSON.parse(localStorage.getItem(item.name)).price);
  };

  return (
    <>
      <h1 className="m-4 text-center">Carts</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 cart-adjustment">
            {cart.map((item) => {
              return (
                <div key={item._id} className="row border my-2 py-2">
                  <div className="col-md-3 my-0">
                    <img
                      className="my-2"
                      src={item.photo}
                      alt="cart"
                      width="140"
                    />
                    <div className="counter">
                      <button
                        className="button-counter"
                        onClick={() => handleDecreaseQty(item)}
                      >
                        -
                      </button>
                      <div className="quantity">
                        {JSON.parse(localStorage.getItem(item.name))
                          ? JSON.parse(localStorage.getItem(item.name)).quantity
                          : 1}
                      </div>
                      <button
                        className="button-counter"
                        onClick={() => handleIncreaseQty(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-5 items-design">
                    <div className="fs-5 item-name px-2">{item.name}</div>
                    <div className="p-2">{item.category}</div>
                    <div className="fs-4 p-2">
                      <b>
                        ₹
                        {!JSON.parse(localStorage.getItem(item.name))
                          ? item.price
                          : JSON.parse(localStorage.getItem(item.name)).price}
                      </b>
                    </div>
                    <button
                      key={item._id}
                      className="btn btn-light border button-cart"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove from Cart
                      <span
                        className="iconify default-color cursor-pointer mx-3"
                        data-icon="bi:cart-x-fill"
                        data-width="25"
                        data-height="25"
                      ></span>
                    </button>
                  </div>
                  <div className="col-md-4">
                    <Datepicker item={item} />
                  </div>
                </div>
              );
            })}
            <Modal
              show={show}
              handleClose={() => {
                localStorage.removeItem("userName");
                localStorage.removeItem("userNumber");
                localStorage.removeItem("userAddress");
                setShow(false);
              }}
            >
              <Order cart={cart} />
            </Modal>
            {cart.length > 0 && (
              <button
                className="btn btn-primary fs-5 px-3"
                onClick={() => setShow(true)}
              >
                Place Order
              </button>
            )}
          </div>
          <div className="col-lg-4 cart-adjustment px-5">
            {cart.length > 0 && (
              <>
                <p className="fs-3 text-center">Total Bill Amount</p>
                <h4>
                  Items:
                  {localStorage.getItem("total") &&
                    JSON.parse(localStorage.getItem("total")).items}
                </h4>
                <h4>
                  Price: ₹
                  {localStorage.getItem("total") &&
                    JSON.parse(localStorage.getItem("total")).price}
                </h4>
              </>
            )}
          </div>
        </div>
      </div>
      {cart.length === 0 && (
        <div className="error-cart-message text-center">
          <h3>
            <span
              className="iconify"
              data-icon="bi:cart-x-fill"
              style={{ color: "#000000" }}
              data-width="100"
              data-height="100"
            ></span>
          </h3>
          <p className="fs-2 my-0">Your cart is empty!</p>
          <p>Add items to it now.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Rent Now
          </button>
        </div>
      )}
    </>
  );
};

export default Carts;











