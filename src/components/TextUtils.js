import React, { useState } from "react";

export default function TextForm(props) {
  const [Text, setText] = useState("");
  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  const handleUpClick = () => {
    const newText = Text.toUpperCase();
    setText(newText);
    props.showAlert("Success", "Converted text to uppercase")
  };
  const handleLowClick = () => {
    const newText = Text.toLowerCase();
    setText(newText);
    props.showAlert("Success", "Converted text to lowercase") 
  };

  const handleCapClick = () => {
    const newText = Text.toLowerCase().split(' ');
    for (var i = 0; i < newText.length; i++) {
        // You do not need to check if i is larger than newText length, as your for does that for you
        // Assign it back to the array
        newText[i] = newText[i].charAt(0).toUpperCase() + newText[i].substring(1);     
    }
    // Directly return the joined string
    
    props.showAlert("Success", "Capitalized the letters")
    return setText(newText.join(' ')); 
  }

  const handleClrClick = () => {
    setText("");
    props.showAlert("Success", "Screen cleared")
  };

  const handleExtraSpaces = () => {
    let newText = Text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Success", "Extra spaces removed");
  }

  const handleCopyTxt = () => {
    navigator.clipboard.writeText(Text);
    document.getSelection().removeAllRanges();
    props.showAlert("Success", "Copied to clipboard");
  }

  const minLength = 0.08 * Text.split(" ").length;
  minLength.toPrecision(1);

  // props.mode === "dark" && setColor({color: "white"})
  return (
    <>
      <div className="container" style={{ color: (props.mode === "dark"?"white":"black")}}>
        <div className="row">
          <div className="col-lg-8">
            <h1>{props.heading}</h1>
            <div className="input-group mb-3">
              <textarea
                className="form-control"
                style={{ 
                  color: props.mode === "dark"?"white":"black", 
                  backgroundColor: props.mode === "dark"?"#2b2f32":"white",
              }}
                placeholder="Enter the text here"
                value={Text}
                onChange={handleOnChange}
                aria-label="With textarea"
                rows={8}
              ></textarea>
            </div>
            <h3 className="my-3">Your Text Summary</h3>
            <p>
              {Text.length>0?Text.split(/\s+/).filter((ele)=>{return ele.length!==0}).length:0} words and {Text.length} characters
            </p>
            <p>{minLength} is the minutes taken to read</p>
            <h3>Preview</h3>
            <p>{Text.length>0?Text:"Nothing to preview!"}</p>
          </div>
          <div className="col align-items-center d-flex flex-column">
            <button disabled={Text.length===0} onClick={handleUpClick} className="btn btn-primary mt-3">
              Convert to Uppercase
            </button>
            <br/>
            <button disabled={Text.length===0} onClick={handleLowClick} className="btn btn-primary">
              Convert to Lowercase
            </button>
            <button disabled={Text.length===0} onClick={handleCapClick} className="btn btn-primary mt-3 px-3">
              Capitalize all words
            </button>
            <button disabled={Text.length===0} onClick={handleClrClick} className="btn btn-primary mt-3 px-5">
              Clear text
            </button>
            <button disabled={Text.length===0} onClick={handleCopyTxt} className="btn btn-primary mt-3 px-3">
              Copy Text
            </button>
            <button disabled={Text.length===0} onClick={handleExtraSpaces} className="btn btn-primary mt-3 px-5">
              Remove extra spaces
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
