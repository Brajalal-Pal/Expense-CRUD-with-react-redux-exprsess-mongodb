import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { expenseActionCreators } from "../../state/actionCreators/index";

const Category = () =>{
    const [category, setCategory] = useState("");
    const categories = useSelector((state)=> state.categoryStore);        
    const dispatch = useDispatch(null);
    const { addCategory, updateCategory, deleteCategory } = bindActionCreators(expenseActionCreators, dispatch);
    
    useEffect(()=>{
        console.log("Store", categories);
    }, [categories]);

    const onChangeHandler = (event) => {
        setCategory(event.target.value);
    }
    const onAddCategoryHandler = () => {
        addCategory(category);
    }

    return (
        <div>
            <label htmlFor="category">Category</label>
            <input type="text" id="category" name="category" onChange={onChangeHandler} value={category} />
            <button onClick={onAddCategoryHandler}>Add</button>
            <br/>
            <h3>Category List:</h3>
            <ul>
            {
                categories.map && categories.map((category)=> {
                    return <li key={category}>{category}</li>
                }) 
            }
            </ul>
        </div>
    )
}
export default Category;
