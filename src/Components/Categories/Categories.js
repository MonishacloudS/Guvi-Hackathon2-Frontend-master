import React, { useState, useEffect } from "react";
import "./Categories.css";

const Categories = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCatData = async () => {
      const res = await fetch("https://guvi-hackathon2-manojkrthapa.herokuapp.com/api/categories");
      const data = await res.json();
      setCats(data);
    };
    fetchCatData();
  }, []);

  return (
    <div className="container">
      <h2 className="m-4 text-center">All Categories</h2>
      <div className="row">
        {cats.map((cat) => {
          return (
            <div key={cat._id} className="col-md-6 col-lg-4 p-3">
              <div className="card card-design">
                <img
                  src={cat.photo}
                  className="card-img-top"
                  alt="Category"
                  height="330"
                />
                <div className="card-body text-center">
                  <div className="button-hover">
                    <h5 className="card-title">{cat.name}</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;









