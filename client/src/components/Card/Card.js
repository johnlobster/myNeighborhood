import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';




function Card(props) {
  return(
      <article className='article'>
          <h2 className="article_title">{props.item_info.title}</h2>
          <a href={props.item_info.site} className="article_excerpt">{props.item_info.site}</a>
      </article>
  )
}
        



export default Card;