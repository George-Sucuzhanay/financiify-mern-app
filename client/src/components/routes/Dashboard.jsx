import { Layout } from "../shared/Layout";

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

        <div className="dashboard-right-elements">
          <div className="purchasable-stocks">
            <p>Purchasable Stocks</p>
          </div>
        </div>
        <div className="trending-stocks">
          <p>Trending Stocks</p>
        </div>
      </div>
    </Layout>
  );
};
