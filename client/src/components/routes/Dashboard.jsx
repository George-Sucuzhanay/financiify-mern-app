import { Layout } from "../shared/Layout";
import { DisplayStock } from "./DisplayStock";
import { DisplayStocks } from "./DisplayStocks";
import { TrendStocks } from "./TrendStocks";

export const Dashboard = () => {

  'single-stock-select' // 'sss'
  'default-view' // 'dv'
 
  // const [mode, setMode] = useState('dv')
  // const [ticker, setTicker] = useState("");

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-left-elements">
          <div className="overview">
            <p>Overview</p>
          </div>

          <div className="latest-transactions">
            <p>Latest Transactions</p>
          </div>
        </div>
        {/* We are using lifting state up to track the stockTicker acrossFrom com1 into com2 */}
        {/* We are using another useState for the different screens of the right-side of the dashboard */}

        {/* {mode === 'dv' &&<div className="dashboard-right-elements">
          <div className="api-stocks">
            <DisplayStock setMode={setMode} setTicker={setTicker}/>
          </div>
          <DisplayStocks />
        </div>}
        {mode === 'sss' && <SingleStockView ticker={ticker} setMode={setMode} />} */}
        <div className="dashboard-right-elements">
          <div className="api-stocks">
            <DisplayStock/>
            </div>
            <DisplayStocks />
        </div>



        <div className="trending-stocks">
          <TrendStocks />
        </div>
      </div>
    </Layout>
  );
};
