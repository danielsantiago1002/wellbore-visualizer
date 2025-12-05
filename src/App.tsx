import "./app.css"

function App() {

  return (
    <>
      <header className="wellbore-visualizer-header">
          <div>
            <h1 className="wellbore-visualizer-header-title">
              WellBore Visualizer
            </h1>
          </div>
          <div className="wellbore-visualizer-header-links">
          <span>
            <a href="https://www.linkedin.com/in/danielavila1002/" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/linkedin-svgrepo-com.svg" alt="linkedin" style={{
                display: "inline-block",
                width: "30px"
              }} />
            </a>
          </span>
          <span>
            <a href="https://github.com/danielsantiago1002" target="_blank" rel="noopener noreferrer">
              <img src="/src/assets/github-svgrepo-com.svg" alt="linkedin" style={{
                display: "inline-block",
                width: "30px"
              }} />
            </a>
          </span>
        </div>
      </header>
      <main className="wellbore-visualizer-main-container">

      </main>
    </>
  )
}

export default App
