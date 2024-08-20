import React, { useRef, useState} from 'react'
import "./ImageGenerator.css"
import default_image from '../Assets/default_image.png'
const ImageGenerator = () => {

  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value==="") {                   //if nothing is entered in the text box
        return 0;
    }
    const response = await fetch(
        "https://api.openai.com/v1/images/generations",    
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 
                "Bearer sk-proj-nvOsU5JxTP2OYsbV1Jp8T3BlbkFJ4h5qBTw9lyU2Nx1POUFM", 
                "User-Agent": "Chrome",
            },
            body: JSON.stringify( {
                prompt: `${inputRef.current.value}`,
                n:1,         //beacause we want only 1 image
                size: "1024x1024",  //size of image
            }),
        }
    );
    const data = await response.json();
    console.log(data)
    // let data_array = data.data;
    // setImage_url(image);
  }
  return (
    <div className="ai-image-generator">
        <div className="header">AI Image <span>Generator</span> </div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"?default_image:image_url} ></img></div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder="Describe what you want to see" />
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator
