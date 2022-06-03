import { Layout } from "../shared/Layout";
import { DisplayStock } from "./DisplayStock";
import { TrendStocks } from "./TrendStocks";

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
            <DisplayStock/>
          </div>
        </div>
        <div className="trending-stocks">
          <TrendStocks/>
        </div>
      </div>
    </Layout>
  );
};
