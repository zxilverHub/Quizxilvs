import "./result.css"
import { useSelector, useDispatch } from "react-redux"
import { handleBack } from "../features/AppSlice"

function Result() {
  const dispatch = useDispatch()
  const results = useSelector(state => state.userAnswer)

  const getScore =()=> {
    let score = 0;
    results.forEach(result => {
      if(result.isCheck) {
        score+=1
      }
    })

    return score
  }

  return (
    <div className='result container'>
        <p>{getScore()}/{results.length}</p>
        { results.map((result, i) => (
            <div className="result-card" key={i}>
                <p className="question">{result.question}</p>

                <div className={`answers ${result.isCheck? "green": "red"}`}>
                  { result.isCheck?
                  <p className="answer">{result.userAnswer}</p>:
                  <p className="answer">Correct answer: {result.correctAnswer} <span>Your answer: {result.userAnswer}</span></p>
                  }
                </div>
            </div>
        )) }

        <button className="back-btn" onClick={()=> dispatch(handleBack())}>Back</button>
    </div>
  )
}

export default Result