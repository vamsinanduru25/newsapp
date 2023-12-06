import React from 'react'

const NewsItems =(props)=> {
  
    
      let {title,description,imgUrl,newsUrl}=props;
    return (
      <div>
        <div className="card" >
  <img src={!imgUrl ? "https://ichef.bbci.co.uk/news/1024/branded_news/18449/production/_131910499_atkins.jpg": imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target='_blank' className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItems