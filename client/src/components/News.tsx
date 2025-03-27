import React from 'react';
const celebrityNews = [
  {
    name: 'Celebrity Name 1',
    news: [
      { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur...', link: '/news-details' },
      { content: 'Donec vehicula turpis at tortor venenatis, sit amet gravida ante...', link: '/news-details' }
    ]
  },
  {
    name: 'Celebrity Name 2',
    news: [
      { content: 'Sed quis euismod libero. Nullam consequat nisl id neque porttitor...', link: '/news-details' },
      { content: 'Mauris tincidunt, est ac malesuada consequat, mi sem...', link: '/news-details' }
    ]
  },
  {
    name: 'Celebrity Name 3',
    news: [
      { content: 'Quisque commodo nunc non elit vehicula, sed pharetra ligula...', link: '/news-details' },
      { content: 'Vivamus cursus purus at nunc placerat, vel dictum metus...', link: '/news-details' }
    ]
  }
];

export const News = () => {
  return (
    <div className="w-100 bg-white rounded-lg shadow p-4">
      <h1 className="text-3xl font-title text-primary mb-4">Celebrity News</h1>
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
        {celebrityNews.map((celebrity, index) => (
          <div key={index} className="bg-light p-3 rounded-md">
            <h2 className="text-xl font-semibold text-primary mb-3">{celebrity.name}</h2>
            <ul className="d-flex flex-column gap-3">
              {celebrity.news.map((item, idx) => (
                <li key={idx} className="text-dark">
                  {item.content}
                  <a href={item.link} className="text-primary underline ms-1">more...</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};