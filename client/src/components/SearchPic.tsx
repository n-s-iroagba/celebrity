import React from 'react'
import image from '../assets/images/search-for-a-star-1x.png'
import '../assets/styles/SearchPic.css'
const SearchPic =()=>(
     <div className="d-flex w-100 justify-content-center mb-3 ">
      <img
        src={image}
        alt="stars"
        className="responsive-image"
      />
      </div>
)
export default SearchPic