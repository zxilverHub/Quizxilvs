import { createSlice } from "@reduxjs/toolkit"
import data from "../data.json"

export const appSlice = createSlice({
    name: "app",
    initialState: {
        data: data,
        app: {
            category: null,
            isCatClicked: false,
            isSumbited: false,
            isHard: true
        },

        userAnswer: []
    },

    reducers: {
        setCategory: (state, action) => {
            state.app.category = action.payload,
            state.app.isCatClicked = true
        },

        handleUserAnswer: (state, action) => {
            if(!state.userAnswer.some((answer) => answer.questionId == action.payload.questionId)) {
                state.userAnswer.push(action.payload)
            } else {
                let newAnswers = state.userAnswer
                newAnswers.forEach(answer => {
                    if(answer.questionId == action.payload.questionId) {
                        answer.userAnswer = action.payload.userAnswer
                        answer.isCheck = answer.correctAnswer.toLowerCase() == action.payload.userAnswer.toLowerCase()
                    }
                })

                state.userAnswer = newAnswers
            }
        },

        handleSubmitQuiz: (state, action) => {
            state.app.isSumbited = action.payload
        },

        handleBack: (state) => {
            state.app.category = null
            state.app.isCatClicked = false
            state.app.isSumbited = false
            let reset = []
            state.userAnswer = reset
        },

        setType: (state) => {
            state.app.isHard = !state.app.isHard
        }
    }
})

export const { setCategory, handleUserAnswer, handleSubmitQuiz, handleBack, setType } = appSlice.actions
export default appSlice.reducer