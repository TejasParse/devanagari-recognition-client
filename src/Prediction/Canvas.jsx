import React, { useEffect, useRef, useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import { Button } from "react-bootstrap";
import { axios } from "axios";

import one from "./images/one.png";
import two from "./images/two.png";
import three from "./images/three.png";
import four from "./images/four.png";
import five from "./images/five.png";
import six from "./images/six.png";
import seven from "./images/seven.png";
import eight from "./images/eight.png";
import nine from "./images/nine.png";

const Canvas = (props) => {
    
    let canvasRef = useRef(null);
    const [predictedNumber, setPredictedNumber] = useState(-1)
    let duplicateRef = useRef(null);
    let [allowed, setAllowed] = useState(true);

    let predictData = (event)=>{

      console.log(canvasRef.current);
      setAllowed(false);
      setTimeout(() => {
          setAllowed(true)
      }, 100000);

      // canvasRef.current.clear();
      let base64String = canvasRef.current.getDataURL();
      

      if (duplicateRef.current) {
        let ctx = duplicateRef.current.getContext("2d");
        let img = new Image();
        img.onload = function () {
            ctx.rect(1, 1, 200, 200);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.drawImage(img, 1, 1);
            let imageData = ctx.getImageData(1, 1, 200, 200);

            let d = imageData.data;
            // console.log(d);
            for (let i = 0; i < d.length; i += 4) {
              if(d[i]==0 && d[i+1]==0 && d[i+2]==0) {
                d[i] = 255
                d[i + 1] = 255
                d[i + 2] = 255
                d[i + 3] = 255
              } else {
                d[i] = 0;
                d[i + 1] = 0;
                d[i + 2] = 0;
                d[i + 3] = 255
              }
            }
            ctx.putImageData(imageData, 1, 1);

            duplicateRef.current.toBlob(function(blob) {
              const formData = new FormData();
              formData.append("file", blob, "image.jpg");
              const url = URL.createObjectURL(blob);

              fetch(
                "http://127.0.0.1:8000/predict",
                // "https://devanagari-recognition-server-production.up.railway.app/predict",
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then((response) => response.json())
                .then((res) => {
                  console.log(res);
                  setPredictedNumber(res.predictedNumber);
                })
                .catch((error) => {
                  // Handle any errors
                });
            })

            // console.log(duplicateRef.current.toDataURL("image/jpeg"));

            // canvasRef.current.clear()
        }
        img.src = base64String;

      }

    };


    return (
      <div>
        <div className="row">
          <span className="col-2"></span>

          <div className="col-3">
            <CanvasDraw
              ref={canvasRef}
              brushRadius={5}
              catenaryColor={"#808080"}
              hideGrid={true}
              // brushColor={"#fff"}
              brushColor={"#000"}
              canvasHeight={200}
              canvasWidth={200}
            />

            <div className="pt-3">
              <Button
                className="me-4"
                onClick={() => {
                  console.log(canvasRef);
                  canvasRef.current.clear();
                  setPredictedNumber(-1);
                }}
              >
                Reset
              </Button>
              <Button onClick={predictData} disabled={!allowed}>
                Predict Data
              </Button>
            </div>
          </div>

          <span className="col-2"></span>

          <span className="col-2">
            <span className="d-flex flex-column bg-dark text-light align-items-center pt-3 rounded">
              <span>Prediction</span>
              <span
                style={{ fontSize: "6em" }}
                className={`${predictedNumber == -1 ? "invisible" : "visible"}`}
              >
                {predictedNumber}
              </span>
            </span>
          </span>

          <span className="col-3"></span>
        </div>

        <div
          className={`${allowed == true ? "invisible" : "visible"} text-danger pb-3`}
        >
          <br /> There is timeout of 100 seconds after every prediction to
          reduce load on server. It may take over 5-10 seconds to predict
        </div>

        <div>
          <div className="pb-3" style={{ fontSize: "1.5em" }}>
            Since there are several ways to represent certain numbers in
            devanagari. The model was trained using the following images
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <img style={{ width: "5em" }} src={one} alt="" />
            <img style={{ width: "5em" }} src={two} alt="" />
            <img style={{ width: "5em" }} src={three} alt="" />
            <img style={{ width: "5em" }} src={four} alt="" />
            <img style={{ width: "5em" }} src={five} alt="" />
            <img style={{ width: "5em" }} src={six} alt="" />
            <img style={{ width: "5em" }} src={seven} alt="" />
            <img style={{ width: "5em" }} src={eight} alt="" />
            <img style={{ width: "5em" }} src={nine} alt="" />
          </div>
        </div>

        <canvas
          ref={duplicateRef}
          // className='invisible'
          style={{ visibility: "hidden" }}
          height={200}
          width={200}
        ></canvas>
      </div>
    );
}

export default Canvas;