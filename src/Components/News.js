import React, {useState,useEffect} from 'react'
import NewsItems from './NewsItems'
import Loading from './Loading';
import PropTypes from 'prop-types';

const News=(props)=> {
  
  const [articles,setArticles] = useState([]);
  const [page,setPage]=useState(1);
  const [loading, setLoading]= useState(true)
  const [totalResults,setTotalResults] =useState(0)



 const updateNews=async()=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=89f297a060484821b44e32edd078bca5&page=${page}&pageSize=12`;
    setLoading(true);
    const data=await fetch(url);
    props.setProgress(30);
    const parsedData= await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false) ;
      props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])

 const componentDidMount=async()=>{
    updateNews();
  }
const handlePrevClick=async ()=>{
  setPage(page-1);
  updateNews();
}
const handleNextClick=async () =>{
  if (page +1 > Math.ceil(totalResults/12)) {
    
  } else {
    setPage(page+1)
    updateNews();
  }

  
}

 
    console.log("second");
    return (
      <div>
        <div className='container my-3'>
            <h2>Headlines</h2>
            {loading && <Loading/>}
            <div className='row'>
              {!loading && articles.map((element)=>{

                return <div className='col-md-4 my-3' key={element.url}>
                  <NewsItems title={element.title? element.title.slice(0,50):" "} description={element.description? element.description.slice(0,50):" "} imgUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
              })}
                
                
            </div>
            <div className="container d-flex justify-content-between">
            <button type="button" disabled={page<=1} className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
            <button type="button" disabled={page +1 > Math.ceil(totalResults/12)} className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
      </div>
    )
  
}
News.defaultProps={
  country: 'us',
  pageSize: 12,
  category: 'general'
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News