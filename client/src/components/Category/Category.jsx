import React, { useState, useEffect } from "react";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { SET_CATEGORIES } from "../../utils/actions";

function Category() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      console.log("Category data:", categoryData);
      dispatch({ type: SET_CATEGORIES, categories: categoryData.categories });
    }
  }, [categoryData, dispatch]);

  if (!categories || categories.length === 0) {
    return <div>Loading categories..</div>;
  }
}

export default Category;
