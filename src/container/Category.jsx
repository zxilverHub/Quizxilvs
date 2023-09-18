import "./category.css"
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../features/AppSlice"

function Category() {
    const categories = Object.keys(useSelector(state => state.data.pest))
    const dispatch = useDispatch()

  return (
    <div className="category container">
        { categories.map((cat, i)=> (
            <button key={i} className="cat-button" onClick={()=>dispatch(setCategory(cat))}>
                {cat.replace("_", " ")}
            </button>
        )) }
    </div>
  )
}

export default Category