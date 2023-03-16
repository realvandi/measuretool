import { useEffect, useRef, useState } from "react";
import DragDrop from "./DragDrop";
import ProtractorPointClass from "./ProtractorPointClass";
import position from "./GeneralTypes";

const Protractor = () => {

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

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

      <DragDrop />

      <ProtractorPointClass position={mouseCoords}/>
      <ProtractorPointClass position={mouseCoords}/>

    </div>
  );
}

export default Protractor; 