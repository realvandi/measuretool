import React, { useState } from "react";

import './App.css';
import Protractor from "./protractor.png";

import { FileUploader } from "react-drag-drop-files";
import imageCompression from "browser-image-compression";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const imageOffsetInit = "0%"
const imageOffsetWithImage = "-100px"

function DragDrop() {

  const [file, setFile] = useState<File | null>(null);

  console.log(file);
  const imgOffset = (file != null) ? imageOffsetWithImage : imageOffsetInit

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
      border: '3px solid black',
      height: '10em',
      width: '20em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translate(-50%,-50%)',
      top: imgOffset,
      transition: 'all 0.2s ease-in-out',
      borderRadius: '10px',
      zIndex: '2'
    }}>
      <img src={Protractor} height="50%" />
      <div style={{ fontSize: '0.3em' }} >
        Drop your files here or click to upload your file
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'absolute', height: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
    }}>
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
            // <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '500px' }}>
            //   <img
            //     alt="Your image for measurement"
            //     height="100%"
            //     src={URL.createObjectURL(file)}
            //     style={{ objectFit: 'cover' }}
            //   />
            //   <button onClick={(event) => { handleChange(null); console.log("removed files") }}>
            //     Remove files
            //   </button>

              <div style={{ position: 'absolute', zIndex: '0', height: '100vh', width: '100vw' }}>
                <TransformWrapper
                  initialScale={1}
                  initialPositionX={0}
                  initialPositionY={0}
                  limitToBounds={false}
                > 
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                      <div style={{ position:'absolute', zIndex: '1', width: '100%', textAlign: 'center' }}>
                        <button onClick={() => zoomIn()}>+</button>
                        <button onClick={() => zoomOut()}>-</button>
                        <button onClick={() => resetTransform()}>x</button>
                      </div>
                      <TransformComponent wrapperStyle={{ height: '100%', width: '100%' }}>
                        <img src={URL.createObjectURL(file)} />
                      </TransformComponent>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            // {/* </div > */}
          )
          :
          null
      }
    </div>
  );
}

export default DragDrop;