import { Layout } from "../shared/Layout";
import Hero from "../../assets/hero.png"
export const Home = () => {
  
  return (
    <Layout>
      <div className="home-container">
        <div className="home-top-container myParent">
          <div className="myChild2 heroText">
            <h1>Learning how to invest</h1>
            <h1>is hard enough</h1>
            <br></br>
            <h2 id="herotext2">✨Financify simplifies this✨</h2>
          </div>
          <div className="myChild2">
           <img id="hero"src={Hero} alt=""></img>
          </div>
          
        </div>
        <div className="home-middle-container">
          <h1>Learning the Fundamentals of Stock Trading</h1>
            <div className="row">
              <div className="column">
                <h1>Idea 1</h1>
              </div>
              <div className="column">
                <h1>Idea 1</h1>
              </div>
              <div className="column">
                <h1>Idea 1</h1>
              </div>
            </div>
        </div>
        <div className="home-bottom-container myParent">
          <h1>Home</h1>
        </div>
      </div>
    </Layout>
  );
};
