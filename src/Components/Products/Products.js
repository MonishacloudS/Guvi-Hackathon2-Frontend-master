import React, { useState, useEffect } from "react";
import "./Products.css";

const Products = (props) => {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [currentcat, setCurrentCat] = useState("");
  const [currentsearch, setCurrentSearch] = useState(false);
  const [removecart, setRemoveCart] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/products");
      const data = await res.json();
      setItems(data);
    };
    fetchProductData();

    const fetchCatData = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/categories");
      const data = await res.json();
      setCats(data);
    };
    fetchCatData();

    const fetchCartData = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/cart");
      const data = await res.json();
      let totalItems = [];
      for (let c of data) {
        totalItems.push(c.name);
      }
      setRemoveCart(totalItems);
    };
    fetchCartData();
  }, []);

  const onFilterCat = (e) => {
    const fetchProductData = async () => {
      setCurrentCat(e.target.textContent);
      const res = await fetch(`https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/products?cat=${e.target.textContent}`);
      const data = await res.json();
      setItems(data);
      setCurrentSearch(false);
    };
    fetchProductData();
  };

  const findSearchProducts = (e) => {
    const fetchSearchData = async () => {
      const res = await fetch(`https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/products?search=${e.target.value}`);
      const data = await res.json();
      setItems(data);
      setCurrentSearch(true);
    };
    fetchSearchData();
  };

  const addToCart = (item) => {
    const addItemToCart = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/cart", {
        method: "POST",
        body: JSON.stringify({
          category: item.category,
          name: item.name,
          price: item.price,
          photo: item.photo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
    };
    addItemToCart();

    const localCart = localStorage.getItem("total");
    if (!localCart) {
      localStorage.setItem(
        "total",
        JSON.stringify({ price: item.price, items: 1 })
      );
    } else {
      localStorage.setItem(
        "total",
        JSON.stringify({
          price: JSON.parse(localStorage.getItem("total")).price + item.price,
          items: JSON.parse(localStorage.getItem("total")).items + 1,
        })
      );
    }

    setRemoveCart([...removecart, item.name]);
  };

  const removeFromCart = (item) => {
    const removeItemFromCart = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/cart", {
        method: "DELETE",
        body: JSON.stringify({
          name: item.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    setRemoveCart(removecart.filter((cartItem) => cartItem !== item.name));
  };

  return (
    <div className="container">
      {!currentcat && <h2 className="m-4 text-center">All Products</h2>}
      {currentcat && currentsearch && (
        <h2 className="m-4 text-center">All Products</h2>
      )}
      {!currentsearch && currentcat && (
        <h2 className="m-4 text-center">{currentcat}</h2>
      )}
      <div className="row">
        <div className="col-md-5 p-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products"
            onChange={(e) => findSearchProducts(e)}
          />
        </div>
        <div className="col-md-5 p-3">
          <div className="btn-group">
            <button type="button" className="btn btn-primary">
              Filter by Categories
            </button>
            <button
              type="button"
              className="btn btn-primary dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              {cats.map((cat) => {
                return (
                  <li key={cat._id} onClick={(e) => onFilterCat(e)}>
                    <span className="dropdown-item list-item">{cat.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {items.map((item) => {
          return (
            <div key={item._id} className="col-md-6 col-lg-4 p-4">
              <div className="card">
                <img
                  src={item.photo}
                  className="card-img-top"
                  alt="Item"
                  height="330"
                />
                <div className="card-body product-design">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    <b>₹</b>
                    {item.price}
                  </p>
                  {removecart.includes(item.name) ? (
                    <button
                      key={item._id}
                      className="btn btn-light border button-cart-design"
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
                  ) : (
                    <button
                      key={item._id}
                      className="btn btn-light border button-cart-design"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                      <span
                        className="iconify default-color cursor-pointer mx-3"
                        data-icon="el:shopping-cart"
                        data-width="25"
                        data-height="25"
                      ></span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <h2 className="text-center error-message">
            <span
              className="iconify"
              data-icon="tabler:face-id-error"
              style={{ color: "#000000" }}
              data-width="100"
              data-height="100"
            ></span>
            <p>Nothing Found, Please Search Again</p>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Products;








