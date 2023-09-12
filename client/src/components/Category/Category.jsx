import React, { useState, useEffect } from "react";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { SET_CATEGORIES } from "../../utils/actions";
import { Link } from "react-router-dom";

function Category() {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  const categories = categoryData?.getCategories || [];

  useEffect(() => {
    if (categories.length > 0) {
      dispatch({ type: SET_CATEGORIES, categories: categories });
    }
  }, [categories, dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsHovered(false);
  };

  return (
    <div className="category-dropdown" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <button className="category-dropdown-button">Categories</button>
      {isHovered && (
        <div className="category-dropdown-menu">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products/${category._id}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
      {selectedCategory && <Redirect to={`/products/${selectedCategory._id}`} />}
    </div>
  );
}

export default Category;