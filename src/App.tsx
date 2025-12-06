import "./app.css";
import { Wellbore } from "./components/Wellbore";
import linkedInIcon from "./assets/linkedin-svgrepo-com.svg";
import githubIcon from "./assets/github-svgrepo-com.svg";

function App() {

  return (
    <>
      <header className="wellbore-visualizer-header">
        <div>
          <h1 className="wellbore-visualizer-header-title">
            Wellbore Visualizer
          </h1>
        </div>
        <div className="wellbore-visualizer-header-links">
          <div>
            <a href="https://www.linkedin.com/in/danielavila1002/" target="_blank" rel="noopener noreferrer">
              <img src={linkedInIcon} alt="linkedin" />
            </a>
          </div>
          <div>
            <a href="https://github.com/danielsantiago1002" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="github" />
            </a>
          </div>
        </div>
      </header>
      <main className="wellbore-visualizer-main-container">
        <Wellbore />
      </main>
    </>
  );
}

export default App;
