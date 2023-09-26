import "./category.css"
import { useSelector, useDispatch } from "react-redux"
import { setCategory, setType } from "../features/AppSlice"

function Category() {
    const categories = Object.keys(useSelector(state => state.data.pest))
    const dispatch = useDispatch()

    const isHard = useSelector(state => state.app.isHard)


  return (
    <div className="category container">
        <p className={`btn-toggle ${!isHard? "green": "red"}`} onClick={()=>dispatch(setType())}>{isHard? "Hard":"Easy"}</p>
        { categories.map((cat, i)=> (
            <button key={i} className="cat-button" onClick={()=>dispatch(setCategory(cat))}>
                {cat.replaceAll("_", " ")}
            </button>
        )) }
    </div>
  )
}

export default Category