import { Layout } from "../shared/Layout";
import { DisplayStocks } from "./DisplayStocks";

export const Dashboard = () => {
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

        <DisplayStocks />

        <div className="trending-stocks">
          <p>Trending Stocks</p>
        </div>
      </div>
    </Layout>
  );
};
