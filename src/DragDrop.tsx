import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Protractor from "./protractor.png";

import './App.css';

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: React.SetStateAction<File | null>) => {
    setFile(file);
  };

  const fileUploaderStack = (
    <div className="middle-content">
      {
        file ?
          (
            <div>
              <img
                alt="not found"
                width="300px"
                src={URL.createObjectURL(file)}
              />
            </div >
          )
          :
          (
            <div>
              <img src={Protractor} width={"200px"} style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }
              } />
              <div>
                Drop your files here or click to upload your file
              </div>
            </div>
          )
      }
    </div >
  );

  return (
    <>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        onDraggingStateChange={(dragging: any) => console.log("dragging:" + dragging)}
        children={fileUploaderStack}
        hoverTitle="Drop Here"
        onDrop={(file: any) => console.log("dropped:"+file)}
        onSelect={(file: any) => console.log("selected:"+file)}
        dropMessageStyle={{backgroundColor: 'red'}}
        onSizeError={(error: any)=>{console.log(error)}}
        onTypeError={(error: any)=>{console.log(error)}}
        label={"Drop your image here or click to upload an image"}
      />
      {
        file && (
          <button onClick={(event) => { setFile(null) }}>
            Remove files
          </button>
        )
      }
    </>
  );
}

export default DragDrop;