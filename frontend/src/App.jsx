
import "./App.css";

import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCorrectCode() {
 setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/correct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });

    

    const data = await response.text();

    setResult(data);
    setLoading(false);

  } catch (error) {
    alert("Error: " + error.message);
  }
 }
  return (
   <div className="container">
  <h1>AI Code Corrector</h1>

  <p>Paste your code below</p>

  <textarea
  rows="10"
  cols="80"
  placeholder="Paste your code here..."
  value={code}
  onChange={(e) => setCode(e.target.value)}
></textarea>
  <br />
<br />
<button onClick={handleCorrectCode}>
  Correct Code
</button>
<h2>Your Code:</h2>
<pre>{code}</pre>
<h2>AI Result:</h2>
{loading && <p>Correcting code...</p>}

<pre>{result}</pre>
</div>
  );
}

export default App;