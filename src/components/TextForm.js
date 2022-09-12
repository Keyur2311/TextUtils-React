import React, { useState } from "react";
import jsPDF from "jspdf";

export default function TextForm(props) {

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("converted to Uppercase", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("converted to Lowercase", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Your text has been cleared ", "success");
  };

  const handleRandomClick = () => {
    let newText =
      text +
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio rem voluptatibus beatae iste, ipsa dignissimos.";
    setText(newText);
    props.showAlert("Random text has been added", "success");
  };

  const handleInverseClick = () => {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      let ch = text.charAt(i);
      if (ch >= "a" && ch <= "z") {
        ch = ch.toUpperCase();
      } else if (ch >= "A" && ch <= "Z") {
        ch = ch.toLowerCase();
      }
      newText += ch;
      setText(newText);
    }
    props.showAlert("converted to Invercase ", "success");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("copied to clipboard", "success");
  };


  const handlePdfClick = () => {
    let doc = new jsPDF();
    doc.text(10, 10, text);
    doc.save("generated pdf");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  let [text, setText] = useState("Enter Text Here");

  //const [variable-name , function name which runs on updation of text] = useState(default value of variable)
  //   text = "new text" <- wrong way to change the state
  // setText("new text") <- coorect way to change the state

  return (
    <>
      <div className={`container text-${props.mode === 'light' ? 'dark' : 'light'}`}>
        <h3 className="mb-2">{props.heading} </h3>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="7"
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : 'black'
            }}
          ></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-primary my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>

        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          className="btn btn-primary mx-2 my-1"
          onClick={handleRandomClick}
        >
          Add Random Text
        </button>
        <button disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleInverseClick}
        >
          Convert to Inversecase
        </button>
        <button disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleCopyClick}
        >
          Copy Text
        </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handlePdfClick}>
          Generate pdf
        </button>
      </div>
      <div className={`container my-2 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
        <h1>Your text summary</h1>
        <p>
          {
            text.split(/\s+/).filter(function (n) {
              return n !== "";
            }).length
          }{" "}
          words ,{text.trim().length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter(function (n) {
              return n !== "";
            }).length}{" "}
          minutes to read
        </p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}
