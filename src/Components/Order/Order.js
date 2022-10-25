import React from "react";

const Order = ({ cart }) => {
  return (
    <div>
      <h1 className="text-center m-4">Order</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="row h-100">
              <h4>Shipping Details</h4>
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  onChange={(e) =>
                    localStorage.setItem("userName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="col-md-12 ">
                <label htmlFor="number" className="form-label">
                  Number
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  className="form-control"
                  placeholder="Enter number"
                  onChange={(e) =>
                    localStorage.setItem("userNumber", e.target.value)
                  }
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="address" className="form-label mt-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="Address"
                  className="form-control"
                  placeholder="Enter address"
                  onChange={(e) =>
                    localStorage.setItem("userAddress", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            {cart.map((item) => {
              return (
                <div key={item._id} className="row border py-2">
                  <div className="col-lg-4 my-0">
                    <img
                      className="my-2"
                      src={item.photo}
                      alt="cart"
                      width="80"
                    />
                  </div>
                  <div className="col-lg-8">
                    <div className="fs-5 item-name px-2">{item.name}</div>
                    <div className="p-2">
                      Quantity: &nbsp;
                      {localStorage.getItem(item.name)
                        ? JSON.parse(localStorage.getItem(item.name)).quantity
                        : 1}
                    </div>
                    <div className="fs-4 p-2">
                      <b>
                        ₹
                        {localStorage.getItem(item.name)
                          ? JSON.parse(localStorage.getItem(item.name)).price
                          : item.price}
                      </b>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="fs-4 p-2">
              <b>
                Items:
                {localStorage.getItem("total") &&
                  JSON.parse(localStorage.getItem("total")).items}
              </b>
              <br />
              <b>
                Total Price: ₹
                {localStorage.getItem("total") &&
                  JSON.parse(localStorage.getItem("total")).price}
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
