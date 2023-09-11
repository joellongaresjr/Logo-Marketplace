import { useEffect } from "react";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';


function Category() {
    const [state, dispatch] = useStoreContext();
  
    const { categories } = state;
  
    const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  
    useEffect(() => {
        console.log("categoriesData:", categoryData);
    }, [categoryData, dispatch]);
     

        return (
            <div>
              <label htmlFor="category">Select a category:</label>
              <select
                id="category"
                className="form-control"
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_CURRENT_CATEGORY",
                    currentCategory: e.target.value,
                  })
                }
                value={state.currentCategory}
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          );
        }
    
    export default Category;