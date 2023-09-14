import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { SET_CATEGORIES } from "../../utils/actions";
import { Link } from "react-router-dom";

function Category() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData?.getCategories) {
      setCategories(categoryData.getCategories);
      dispatch({ type: SET_CATEGORIES, categories: categoryData.getCategories });
    }
  }, [categoryData, dispatch]);

  const handleCloseDropdown = () => {
    document.getElementById("category-dropdown").click();
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="category-dropdown">
        Categories
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item
            key={category._id}
            as={Link}
            to={`/products/category/${category._id}`}
            onClick={handleCloseDropdown}
          >
            {category.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Category;
