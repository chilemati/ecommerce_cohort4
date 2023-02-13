import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
      <div>
          <h1>I'm Sorry, You are Lost !!!</h1>
          <Link to={'/'} >Go Home ?</Link>
    </div>
  )
}

export default Error