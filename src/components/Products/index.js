import React, { useEffect, useState } from "react";
import './index.css'

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  const fetchProductList = () => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProductList(data?.products || []);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="card-container">
      <h1>Products</h1>
      {loading && (
        <div>
          <h3>Fetching products.....</h3>
        </div>
      )}
      {!loading && productList.length && (
        <div className="cards">
          <table className="procduct-table">
            <thead>
              <tr>
                <td>Product Name</td>
                <td>Description</td>
                <td>Image</td>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index}>
                  <td>{product?.title}</td>
                  <td>{product?.description}</td>
                  <td>
                    <img src={product.thumbnail} alt={product.title} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
