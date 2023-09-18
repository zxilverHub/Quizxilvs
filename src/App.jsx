import React from 'react'
import "./App.css"

import Category from './container/Category'
import { useSelector } from 'react-redux'
import Quiz from './container/Quiz'
import Result from './container/Result'

function App() {
  const path = useSelector(state => state.app.isCatClicked)
  const submited = useSelector(state => state.app.isSumbited)

  return (
    <>
    { !path?
      <Category />:
      <>
        { submited?
          <Result /> :
          <Quiz />
        }
      </>
    }
    </>
  )
}

export default App