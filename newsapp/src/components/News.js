import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country:'us',
    pagesize:3,
    category:'general'
  };

  static propTypes = {
    country : PropTypes.string,
    pagesize : PropTypes.number,
    category:PropTypes.string
  };

  constructor(props){
    super(props);
    console.log("hello");
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=a3063431959341b48ca277d919a5e679`;
    this.setState({loading:true});
    let data =await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,loading:false});
  }

  handleNextClick= async()=>{
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/2))){
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3063431959341b48ca277d919a5e679&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
    this.setState({loading:true});
    let data =await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:parsedData.articles,
      page: this.state.page+1,
      loading:false
    });
  }
  }

  handlePreviousClick= async()=>{
    let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3063431959341b48ca277d919a5e679&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
    this.setState({loading:true})
    let data =await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:parsedData.articles,
      page: this.state.page-1,
      loading:false
    });
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="container my-3 text-center" style={{margin:'40px-0px'}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}        
        <div className="row">
          {!this.state.loading && this.state.articles.map((e)=>{
            return <div className="col-md-4" key={e.url}>
            <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl = {e.url} author = {e.author} date={e.publishedAt} source={e.source.name}/>
          </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
