import React, { useEffect, useRef, useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import { Button } from "react-bootstrap";
import { axios } from "axios";

const Canvas = (props) => {
    
    let canvasRef = useRef(null);
    const [predictedNumber, setPredictedNumber] = useState(-1)
    let duplicateRef = useRef(null);

    let predictData = (event)=>{

      console.log(canvasRef.current);

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

              fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                body: formData,
              })
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
      // console.log(base64String);

      // const byteString = atob(base64String.split(",")[1]);
      // const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
      // console.log(mimeString);
      // const arrayBuffer = new ArrayBuffer(byteString.length);
      // console.log(arrayBuffer);
      // const uint8Array = new Uint8Array(arrayBuffer);
      // console.log(uint8Array);

      // for (let i = 0; i < byteString.length; i++) {
      //   uint8Array[i] = byteString.charCodeAt(i);
      // }

      // const blob = new Blob([arrayBuffer], { type: mimeString });

      // console.log(blob);

      // const formData = new FormData();
      // formData.append("file", blob, "image.jpg");

      // Send the image file to the backend
      // fetch("http://127.0.0.1:8000/predict", {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((response) =>response.json())
      //   .then(res=>{
      //     console.log(res);
      //     setPredictedNumber(res.predictedNumber);
      //   })
      //   .catch((error) => {
      //     // Handle any errors
      //   });


    };



    return (
      <div>
        <CanvasDraw
          ref={canvasRef}
          brushRadius={5}
          catenaryColor={"#fff"}
          hideGrid={true}
          // brushColor={"#fff"}
          brushColor={"#000"}
          canvasHeight={200}
          canvasWidth={200}
          // imgSrc={
          //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAue1E3iTJs-7LIlAlS-G5P1coKNjbcNT-TbNZvziqU2My-l3qWtzGxycQS0sh_rUyZZA&usqp=CAU"
          // }
        />

        <div className='p-2'>

          <Button
            onClick={() => {
              console.log(canvasRef);
              canvasRef.current.clear();
            }}
          >
            Reset
          </Button>
          <span>{" "}</span>

          <Button onClick={predictData}>Predict Data</Button>
        </div>


        <div>Prediction {predictedNumber}</div>


        <canvas ref={duplicateRef} style={{ visibility: "hidden" }} height={200} width={200} ></canvas>
      </div>
    );
}

export default Canvas;