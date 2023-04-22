import React, { useState } from "react";
import "../Css/Hero.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Hero = () => {
  const [text, settext] = useState("");

  const convertCap = () => {
    const newtext = text.toUpperCase();
    settext(newtext);
  };
  const change = (event) => {
    settext(event.target.value);
  };
  const convertlow = () => {
    const newtext = text.toLowerCase();
    settext(newtext);
  };

  const generatePdf = () => {
    const input = document.getElementById("preview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  const removeSpace = () => {
    const newWord = text.split(/[ ]+/);
    settext(newWord.join(" "));
  };

  const textToSpeech = () => {
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

 const clearText=()=>{
  settext("")
 }
 const copyText=()=>{
  navigator.clipboard.writeText(text);
  alert("Copied to Clipboard !!")
 }
  return (
    <>
      <div className="hero-section">
        <h1>TextTools :</h1>
        <span>Tools to make your words shine</span>
        <div className="container">
          <textarea
            className="text-area"
            placeholder="Enter the text here"
            onChange={change}
            value={text}
          ></textarea>
        </div>
        <div className="btn-container">
          <button onClick={convertCap}>Convert UpperCase</button>
          <button onClick={convertlow}>Convert LowerCase</button>
          <button onClick={removeSpace}>Remove Extra space</button>
          <button onClick={textToSpeech}>Read Text</button>
          <button onClick={copyText}>Copy Text</button>
          <button onClick={clearText}>Clear Text</button>
         
        </div>

        <p className="words">
          {text.split(/\s+/).length} words and {text.length} character
        </p>
        <p className="sec">{(0.008 * text.split(/\s+/).length).toFixed(3)} min to read</p>
        <h2>Preview</h2>
        <p className="preview" id="preview">
          {text}
        </p>
        <button className="downloadBtn" onClick={generatePdf}>
          Download PDF
        </button>
      </div>
    </>
  );
};

export default Hero;
