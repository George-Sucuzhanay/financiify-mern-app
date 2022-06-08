import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export const TrendStocks = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

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

  return (
    // <h1>Trending Stocks!</h1>
    <Container className="parentDiv">
      <Row>
        {(trends || []).slice(0, 6).map((trend, index) => {
          return (
            <Col key={index}>
              <h4>{trend.companyName}</h4>
              <h5>{trend.delayedPrice}</h5>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
