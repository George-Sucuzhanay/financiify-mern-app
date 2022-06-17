import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const TrendStocks = () => {
  const [trends, setTrends] = useState([]);
  const [color, setColor] = useState("");

  const fetchData = async () => {
    try {
      const trendingStocks = await axios
        .get(
          `https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`
        )
        .then((trendingStocks) => setTrends(trendingStocks.data));
      // console.log(trendingStocks);
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    // <h1>Trending Stocks!</h1>
    <div className="trending">
      {(trends || []).slice(0, 6).map((trend, index) => {
        if (trend.changePercent < 0) {
          return (
            <Col key={index} className="mytrends">
              <p>{trend.symbol}</p>
              <div className="mytrendsdata">
                <p>{trend.latestPrice}</p>
                <p style={{ color: "red" }}>
                  ({trend.changePercent.toString().substr(0, 5)})
                </p>
              </div>
            </Col>
          );
        } else {
          return (
            <Col key={index} className="mytrends">
              <p>{trend.symbol}</p>
              <div className="mytrendsdata">
                <p>{trend.latestPrice}</p>
                <p style={{ color: "green" }}>
                  ({trend.changePercent.toString().substr(0, 5)})
                </p>
              </div>
            </Col>
          );
        }
      })}
    </div>
  );
};
