import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Protractor from "./protractor.png";

import './App.css';
import imageCompression from "browser-image-compression";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

function DragDrop() {

  const [file, setFile] = useState<File | null>(null);

  const handleChange = async (file: React.SetStateAction<File | null>) => {

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    }

    console.log("Checking file integrity..");

    const imageFile: File = file as File;
    console.log("Image file:"+imageFile)

    if(imageFile != null) {
      if (imageFile == null) {
        console.log("Error: Could not find file, or file is incorrect.")
        return
      }

      try {
        if (imageFile != null) {
          console.log("Uploading image..")
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  
          // await uploadToServer(compressedFile); // write your own logic
          console.log("Setting file image to compressed image..")
          await setFile(compressedFile);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Image file is null");
      setFile(null);
    }
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);




    

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
    <div style={{ position: 'absolute'}}>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        onDraggingStateChange={(dragging: any) => console.log("dragging:" + dragging)}
        children={fileUploaderStack}
        hoverTitle="Drop Here"
        onDrop={(file: any) => console.log("dropped:" + file)}
        onSelect={(file: any) => console.log("selected:" + file)}
        dropMessageStyle={{ backgroundColor: 'red' }}
        onSizeError={(error: any) => { console.log(error) }}
        onTypeError={(error: any) => { console.log(error) }}
        label={"Drop your image here or click to upload an image"}
      />
      {
        file && (
          <button onClick={(event) => { handleChange(null) }}>
            Remove files
          </button>
        )
      }
    </div>
  );
}

export default DragDrop;