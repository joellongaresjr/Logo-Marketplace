import React from "react";

const ProductList = () => {
  const products = [
    {
      "_id": "64fd43e91c9aa8cd3c82c56f",
      "name": "Elegant Soft Chicken",
      "description": "Assumenda voluptas temporibus. Saepe ea quis aliquid quam sequi voluptatibus deserunt. Nesciunt totam beatae possimus vel similique sapiente explicabo et non. Vel minus laudantium cum rerum numquam numquam iusto.",
      "price": 558,
      "stockQuantity": 65,
      "imageUrl": "https://loremflickr.com/500/500?lock=6109508336091136",
      "category": {
        "name": "Electronics"
      }
    },
  ];

  return (
    <div className="product-list">
      <h2>Featured Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">In Stock: {product.stockQuantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;