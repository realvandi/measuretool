import { useEffect, useRef, useState } from "react";
import protractor from './protractor.png'
import DragDrop from "./DragDrop";

const reactDrawLine = require('react-drawline');
const { StraightLine } = reactDrawLine;

const Protractor = () => {

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [coords, setCoords] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleWindowMouseMove = (event: { clientX: any; clientY: any; }) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);


  return (
    <div>
      {/* {selectedImage && (
        <div>
          <img
            alt="not found"
            width="1000px"
            src={URL.createObjectURL(selectedImage)}
          />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
       */}

       <div>
        Coord: {coords.x}, {coords.y}
       </div>

      <div ref={box1Ref} style={{ position: 'absolute', left: '100px', top: '200px'}}>
        O
      </div>
      <div ref={box2Ref} style={{ position: 'absolute', left: '250px', top: '400px'}}>
        O
      </div>

      <StraightLine
        startingElement={{
          ref: box1Ref,
          x: "center",
          y: "mid",
        }}
        endingElement={{
          ref: box2Ref,
          x: "center",
          y: "mid",
        }}
        style={{ backgroundColor: "red" }}
        className="beautiful-class-name"
      />

      <DragDrop />

    </div>
  );
}

export default Protractor; 