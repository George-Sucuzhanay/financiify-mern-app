import axios from "axios";
import { useEffect, useState } from "react";
import { StockPurchase } from "./StockPurchase";
export const StockProfiles = ({ symbol }) => {
  const [company, setCompany] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [quote, setQuote] = useState([]);
  // const [news, setNews] = useState([])

    useEffect(() => {
      if(symbol) {
        fetchProfile()
      }
    }, [symbol])
   
   
    const fetchProfile = async () => {
          try {
            const stockProfile = await axios
              .get(`https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/batch?types=quote,company,logo,news&range=1m&last=5&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`)
              .then(stockProfile => {
                setCompany(stockProfile.data.company)
                setPhoto(stockProfile.data.logo)
                setQuote(stockProfile.data.quote)
                // setNews(stockProfile.data.news)
              });
          } catch (error) {
            console.log(error)
          }
    };


  return (
    <div className="stock-data-container">
      <div className="stock-data-header">
        <img className="stock-image" src={photo.url} alt=""></img>
        <div className="stock-data-sub-header">
          <h1>
            <b>{company.companyName}</b>
          </h1>
          <p>
            {company.symbol}
            <img
              className="stock-image"
              src="https://s3-symbol-logo.tradingview.com/country/US.svg"
              alt=""
            ></img>{" "}
            {company.exchange}
          </p>
        </div>
      </div>
      <div className="stock-data-change">
        <h1>
          <span style={{ fontWeight: "900", fontSize: "2.5rem" }}>
            {quote.latestPrice}
          </span>{" "}
          <span style={{ fontSize: "25px" }}>
            {quote.currency} {quote.change} ({quote.changePercent}%)
          </span>
        </h1>
      </div>

      <div className="data-table">
        <div className="myChild left-align">
          <h3 id="upper-left">Volume</h3>
          <h3>Day's High ($)</h3>
          <h3 id="lower-left">Day's Low ($)</h3>
        </div>
        <div className="myChild left-align">
          <h3>{quote.volume}</h3>
          <h3>{quote.high}</h3>
          <h3>{quote.low}</h3>
        </div>
        <div className="myChild left-align">
          <h3>Market Cap</h3>
          <h3>52 Week High ($)</h3>
          <h3>52 Week Low ($)</h3>
        </div>
        <div className="myChild left-align">
          <h3 id="upper-right">{quote.marketCap}</h3>
          <h3>{quote.week52High}</h3>
          <h3 id="lower-right">{quote.week52Low}</h3>
        </div>
      </div>
      {quote && company ? (
        <StockPurchase
          symbol={quote.symbol}
          price={quote.latestPrice}
          company={company}
        />
      ) : null}

      {/* <br></br> */}
      {/* <h2>Industries: </h2>

                  
                  <ul className="industries">
                    {(profile.tags || []).map((tag, key) => {
                      return (
                        <li key={key}>{tag}</li>
                      )
                    })}
                  </ul> */}

      {/* <h2>Industries: </h2>
                  
                  <ul className="industries">
                    {(news || []).map((tag, key) => {
                      return (
                        <div>
                          <h3 key={key}>{tag.headline}</h3>
                          <h5 key={key}>{tag.summary}</h5>

                        </div>
                      )   
                    })}
                  </ul> */}

      {/* <div className="myChild">
            <p id="profileDescription">{company.description}</p>
          </div> */}
    </div>
  );
};
