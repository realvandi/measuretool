import React, { useState } from "react";

import './App.css';
import Protractor from "./protractor.png";

import { FileUploader } from "react-drag-drop-files";
import imageCompression from "browser-image-compression";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const ddOffsetInit = 'translate(calc(50vw - 50%), calc(50vh - 50%))'
const ddOffsetWithImage = 'translate(calc(50vw - 50%), calc(20%))'

function DragDrop() {

  const [file, setFile] = useState<File | null>(null);

  console.log(file);
  const ddOffset = (file != null) ? ddOffsetWithImage : ddOffsetInit

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
      height: '10em',
      width: '20em',
      
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      transform:ddOffset,

      transition: 'all 0.2s ease-in-out',

      zIndex: '2',

      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      border: '5px dashed black',
      borderRadius: '10%'
    }}>
      <img src={Protractor} height="50%" />
      <div style={{ fontSize: '0.3em' }} >
        Drop your files here or click to upload your file
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'absolute', height: '100vh', width: '100vw', backgroundColor: 'rgba(200, 200, 200, 1)'
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
      />
      {
        file ?
          (
            <div style={{ position: 'absolute', zIndex: '0', height: '100vh', width: '100vw' }}>
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                limitToBounds={false}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <div style={{ position: 'absolute', zIndex: '1', width: '100%', textAlign: 'center' }}>
                      <button onClick={() => zoomIn()}>+</button>
                      <button onClick={() => zoomOut()}>-</button>
                      <button onClick={() => resetTransform()}>x</button>
                    </div>
                    <TransformComponent wrapperStyle={{ height: '100vh', width: '100vw', position: 'absolute' }}>
                      <img src={URL.createObjectURL(file)} />
                    </TransformComponent>
                    <div style={{ position: 'relative', zIndex: '1', width: '100%', textAlign: 'center', top: '100%', transform: 'translateY(-100%)' }}>
                      <button onClick={() => zoomIn()}>HELLO!</button>
                    </div>
                  </React.Fragment>
                )}
              </TransformWrapper>
              
            </div>
          )
          :
          null
      }
    </div>
  );
}

export default DragDrop;