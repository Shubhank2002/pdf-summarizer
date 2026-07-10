import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }
    setLoading(true)

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("http://localhost:3000/api/post-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      if (!response.body) {
        throw new Error("Streaming not supported");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let streamed_summary = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        streamed_summary += decoder.decode(value, { stream: true });
        setSummary(streamed_summary);
      }
    } catch (error) {

    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <h1>PDF Summarizer</h1>
      <div className="mt-5">
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button disabled={loading} onClick={handleFileUpload}>{loading?'Uploading...':'Upload'}</button>
      </div>
      <div>{summary}</div>
    </>
  );
}

export default App;
