import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    console.log("hello");
    this.state={
      articles:[],
      loading:false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/everything?q=apple&from=2026-03-05&to=2026-03-05&sortBy=popularity&apiKey=a3063431959341b48ca277d919a5e679"
    let data =await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles});
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="container my-3">NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((e)=>{
            return <div className="col-md-4" key={e.url}>
            <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl = {e.url}/>
          </div>
          })}
        </div>
      </div>
    )
  }
}

export default News
