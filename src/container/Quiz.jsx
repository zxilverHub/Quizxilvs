import { useCallback, useState } from "react"
import "./quiz.css"
import { useSelector, useDispatch } from "react-redux"
import { handleUserAnswer, handleSubmitQuiz, handleBack } from "../features/AppSlice"

function answerObject(question, answer) {
    return {
        question: question.question,
        correctAnswer: question.answer,
        userAnswer: answer,
        isCheck: question.answer.toLowerCase() == answer.toLowerCase(),
        questionId: question.id
    }
}

function Quiz() {
    const data = useSelector( state => state.data )
    const category = useSelector( state => state.app.category)
    const answerPest = data.pest[category]
    const questions = data.app[category]
    const isHard = useSelector(state => state.app.isHard)
    const dispatch = useDispatch()


    const getQuestions = ()=> {
        let prevQuestion = questions
        let newQuestion = []

        while(newQuestion.length < questions.length) {
            let rand = Math.floor(Math.random() * questions.length)

            if(!newQuestion.includes(prevQuestion[rand])) {
                newQuestion.push(prevQuestion[rand])
            }
        }

        return newQuestion
    }

    const getChoices = (ans) => {
        let answerPosition = Math.floor(Math.random() * 4)
        let pest = []

        while(pest.length < 4) {
            let rand = Math.floor(Math.random() * answerPest.length)
            if(answerPosition == pest.length)
                pest.push(ans)

            if(!pest.includes(answerPest[rand]) && pest.length < 4 && answerPest[rand]!=ans)
                pest.push(answerPest[rand])
        }

        return pest
    }

    const handleAnswer = useCallback((question, ans) => {
        dispatch(handleUserAnswer(answerObject(question, ans)))
    }, [])

    
  return (
    <div className="container quiz">
        <button className="btn-toggle blacktext"
            onClick={()=>dispatch(handleBack())}>Back</button>
        { getQuestions().map((question, i)=> (
            <div className="question-card" key={i}>

                <p className="question">{i+1}. {question.question}</p>

                { isHard?
                <input type="text" onChange={(e)=> handleAnswer(question, e.target.value)} className="answer-input" /> :

                <div className="choices">
                    { getChoices(question.answer).map((choices, j)=> (
                        <label htmlFor={question.div} key={j} onClick={()=> handleAnswer(question, choices)}>
                            <input type="radio" id={question.id} name={question.id} />
                            <span>{choices}</span>
                        </label>
                    )) }
                </div>
                }

            </div>
        )) }

        <button className="submit-btn" onClick={()=>dispatch(handleSubmitQuiz(true))}>Submit</button>
    </div>
  )
}

export default Quiz