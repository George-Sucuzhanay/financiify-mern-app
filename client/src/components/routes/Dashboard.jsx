import { Layout } from "../shared/Layout";

export const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-left-elements">
          <div className="overview">
            <h1>Overview</h1>
          </div>
          <div className="latest-transactions">
            <h1>Latest Transactions</h1>
          </div>
        </div>

        <div className="dashboard-right-elements">
          <div className="purchasable-stocks">
            <h1>Purchasable Stocks</h1>
          </div>
        </div>
        <div className="trending-stocks">
          <h1>Trending Stocks</h1>
        </div>
      </div>
    </Layout>
  );
};
