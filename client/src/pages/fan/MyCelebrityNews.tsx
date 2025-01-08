import React from 'react'

export const MyCelebrityNews = ()=>{
    return(
        <div className="w-100 bg-white rounded-lg shadow p-4">  <h1 className="text-3xl font-title text-primary mb-4">Celebrity News</h1>
  <div className="relative w-100 mb-4">
    <div className="input-group">
      <input
        type="text"
        placeholder="Search news by celebrity..."
        className="form-control rounded-md"
      />
      <span className="input-group-text bg-white border-neutral-300 text-neutral-500">
        <span className="material-symbols-outlined">search</span>
      </span>
    </div>
  </div>
  <div className="d-flex flex-column gap-4">
    <div className="bg-light p-3 rounded-md">
      <h2 className="text-xl font-semibold text-primary mb-3">Celebrity Name 1</h2>
      <ul className="d-flex flex-column gap-3">
        <li className="text-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur...
          <a href="/news-details" className="text-primary underline ms-1">more...</a>
        </li>
        <li className="text-dark">
          Donec vehicula turpis at tortor venenatis, sit amet gravida ante...
          <a href="/news-details" className="text-primary underline ms-1">more...</a>
        </li>
      </ul>
    </div>

  </div>
</div>
    )
}