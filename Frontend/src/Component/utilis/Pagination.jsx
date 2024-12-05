import React from 'react'
import './Pagination.scss'
import {Link} from 'react-router-dom'

const Pagination = () => {
  return (
    <div className='pageination'>
      <Link>Previous</Link>
      <Link>Next</Link>
    </div>
  )
}

export default Pagination
