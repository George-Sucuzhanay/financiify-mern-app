export const Footer = () => {
  return (
    <footer>
      <div className="external-links">
        <div className="external-link">
          <a href="https://github.com/tapia81">
            <img
              src={require("../../assets/anthony_logo.jpg")}
              alt="Gitub Logo"
            />
          </a>
          <p>Anthony's Github</p>
        </div>

        <div className="external-link">
          <a href="https://www.linkedin.com/in/anthonytapia81/">
            <img
              src={require("../../assets/linkedin.png")}
              alt="Linkedin Logo"
            />
          </a>
          <p>Anthony's Linkedin</p>
        </div>

        <div className="external-link">
          <a href="https://github.com/George-Sucuzhanay">
            <img
              src={require("../../assets/anthony_logo.jpg")}
              alt="Gitub Logo"
            />
          </a>
          <p>George's Github</p>
        </div>

        <div className="external-link">
          <a href="https://www.linkedin.com/in/georgesucuzhanay/">
            <img
              src={require("../../assets/linkedin.png")}
              alt="Linkedin Logo"
            />
          </a>
          <p>George's Linkedin</p>
        </div>
      </div>{" "}
    </footer>
  );
};
