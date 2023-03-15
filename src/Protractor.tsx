import { useEffect, useRef, useState } from "react";
import DragDrop from "./DragDrop";
import ProtractorPointClass from "./ProtractorPointClass";
import position from "./GeneralTypes";

const reactDrawLine = require('react-drawline');
const { StraightLine } = reactDrawLine;

const Protractor = () => {

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const lineRef = useRef(null); // new ref for the straight line

  const [mouseCoords, setMouseCoords] = useState<position>({x: 0, y: 0});

  useEffect(() => {
    const handleWindowMouseMove = (event: { clientX: any; clientY: any; }) => {
      setMouseCoords({
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

       <div>
        Coord: {mouseCoords.x}, {mouseCoords.y}
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
        ref={lineRef} // pass the new ref to the straight line
      />

      <DragDrop />

      <ProtractorPointClass position={mouseCoords} forwardedRef={box1Ref}/> // pass the new refs to the ProtractorPointClass components
      <ProtractorPointClass position={mouseCoords} forwardedRef={box2Ref}/>

    </div>
  );
}

export default Protractor; 