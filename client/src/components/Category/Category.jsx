import React, { useState, useEffect } from "react";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { SET_CATEGORIES } from "../../utils/actions";

function Category() {
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.currentCategory);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  console.log(categoryData);

  const categories = categoryData?.getCategories.map((category) => category.name) || [];


  console.log(categories)

  useEffect(() => {
    if (categories) {
      console.log("Category data:", categories);
      dispatch({ type: SET_CATEGORIES, categories: categories });
    }
  }, [categoryData, dispatch]);

  if (loading) {
    return <div>Loading categories..</div>;
  }

  return (
    <>
      <h2>Choose a category:</h2>
      {categories.map((category, index) => (
        <button key={index}>{category}</button>
      ))}
    </>
  );
}

export default Category;
