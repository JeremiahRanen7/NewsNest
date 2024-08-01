import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async (pageNo = 1) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    console.log(parsedData);
    setArticles(parsedData.articles || []); // Ensure articles is an array
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsNest`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles || [])); // Ensure articles is an array
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <div className="content dim d-flex flex-column justify-content-center align-items-center text-center content-container">
        <h1 className="display-4">Welcome to NewsNest</h1>
        <p className="lead">
          Your premier destination for cutting-edge news and insights across industries.
        </p>
        <p className="lead">
          Join us on the journey of discovery and exploration. Ignite your curiosity with NewsNest.
        </p>
        <a className="btn btn-lg btn-style" href="/" role="button"><b>Read More</b></a>
      </div>
      <h2
        className="text-center color-primary-text"
        style={{ margin: "30px 0px", marginTop: "90px" }}
      >
        NewsNest - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage ? element.urlToImage : "https://source.unsplash.com/1600x1000/?news"}
                  newsUrl={element.url ? element.url : ""}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
      <div className="footer">
        Designed by <a href="https://github.com/JeremiahRanen7">Jeremiah Ranen R</a>
      </div>
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
