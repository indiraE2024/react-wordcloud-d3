import { useEffect } from "react";
import * as d3 from "d3";

function App() {
  useEffect(() => {
    d3.selectAll(".text").style("color", "skyblue").text("Hello, D3.js!");
  }, []);

  return (
    <div className="texts">
      <p className="text"></p>
      <p className="text"></p>
      <p className="text"></p>
      <p className="text"></p>
    </div>
  );
}

export default App;