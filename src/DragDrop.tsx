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
    console.log("Image file:" + imageFile)

    if (imageFile != null) {
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
      console.log("File: " + file)
      setFile(null);
    }
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  };

  const fileUploaderStack = (
    <div style={{ 
      position: 'absolute',
      margin: 'auto',
      border: '10px solid black', 
      height: '10em', 
      width: '20em', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      transform: 'translate(-50%,-50%)'
  }}>
      <img src={Protractor} height="50%" />
      <div style={{ fontSize: '0.3em' }} >
        Drop your files here or click to upload your file
      </div>
  </div>
  );

  return (
    <div style={{ position: 'absolute', zIndex: '1', height: '100%', width: '100%', backgroundColor: 'red',
   display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        onDraggingStateChange={(dragging: any) => console.log("dragging:" + dragging)}
        children={fileUploaderStack}
        hoverTitle="Drop Here"
        onDrop={(file: any) => console.log("dropped:" + file)}
        onSelect={(file: any) => console.log("selected:" + file)}
        onSizeError={(error: any) => { console.log(error) }}
        onTypeError={(error: any) => { console.log(error) }}
        label={"Drop your image here or click to upload an image"}
      />
      {
        file ?
          (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '500px' }}>
              <img
                alt="Your image for measurement"
                height="100%"
                src={URL.createObjectURL(file)}
                style={{ objectFit: 'cover' }}
              />
              <button onClick={(event) => { handleChange(null) }}>
                Remove files
              </button>
            </div >
          )
          :
          null
      }
    </div>
  );
}

export default DragDrop;