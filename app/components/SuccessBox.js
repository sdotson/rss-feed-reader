import React from 'react';

const SuccessBox = ({ title, link, articles }) => {
  return (
    <div>
      <h3><a href={link} target="_blank">{title}</a></h3>
      <ul>
        { articles.map((article, index) => {
            return (
              <li key={index}>
                <a href={article.link} target="_blank">{article.title}</a>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default SuccessBox;
