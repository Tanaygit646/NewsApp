import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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

  capitalizeFirstLetter=(string) =>{
    if (string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("hello");

    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    };

    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pagesize=${this.props.pagesize}`;

    this.setState({loading:true});

    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData);

    this.setState({
      articles:parsedData.articles,
      loading:false,
      totalResults:parsedData.totalResults
    });
  }

  // handleNextClick= async()=>{
  //   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize))){
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
  //   this.setState({loading:true});
  //   let data =await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles:parsedData.articles,
  //     page: this.state.page+1,
  //     loading:false
  //   });
  // }
  // }

  // handlePreviousClick= async()=>{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
  //   this.setState({loading:true})
  //   let data =await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     articles:parsedData.articles,
  //     page: this.state.page-1,
  //     loading:false
  //   });
  //}

  fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      page:this.state.page+1
    });
  };

  render() {
    return (
      <div className="container my-3">

        <h1 className="container my-3 text-center" style={{margin:'40px 0px'}}>
          NewsMonkey - Top Headlines
        </h1>

        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

        <div className='container'>
        <div className="row">

          {!this.state.loading && this.state.articles.map((e)=>{
            return (
              <div className="col-md-4" key={e.url}>
                <NewsItem
                  title={e.title}
                  description={e.description}
                  imageUrl={e.urlToImage}
                  newsUrl={e.url}
                  author={e.author}
                  date={e.publishedAt}
                  source={e.source.name}
                />
              </div>
            )
          })}

        </div>
        </div>

        </InfiniteScroll>

        {/* Pagination Buttons (Old Method) */}
        {/* <div className='container d-flex justify-content-between'>
          <button type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>&larr; previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      </div>
    )
  }
}

export default News