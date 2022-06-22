import { useState, useEffect } from "react";
import axios from "axios";
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
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="trending">
      {(trends || []).slice(0, 13).map((trend, index) => {
        if (trend.changePercent < 0) {
          return (
            <Col key={index} className="mytrends">
              <p>{trend.symbol}</p>
              <div className="mytrendsdata">
                <p>{trend.latestPrice}</p>
                <p style={{ color: "red" }}>
                  ({trend.changePercent.toString().substr(0, 5)}%)
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
                  (+{trend.changePercent.toString().substr(0, 4)}%)
                </p>
              </div>
            </Col>
          );
        }
      })}
    </div>
  );
};
