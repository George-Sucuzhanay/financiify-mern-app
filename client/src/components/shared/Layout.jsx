import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
export const Layout = (props) => {
  return (
    <div className="layout-container">
      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
