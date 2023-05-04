import { useEffect, useRef, useState } from "react";
import DragDrop from "./DragDrop";
import Xarrow, { Xwrapper } from "react-xarrows";
import DraggableBox from "./Draggablebox";
import { PointDictionary, position } from "./GeneralTypes";
import { getAngle } from "./Tools";
import AngleArc from "./AngleArc";

const Protractor = () => {

  const [mouseCoords, setMouseCoords] = useState<position>({ x: 0, y: 0 });
  const [pointDictionary, setPointDictionary] = useState<PointDictionary>({});
  const [angle, setAngle] = useState<number>(0);

  const [file, setFile] = useState<File | null>(null);

  const yPointOffsetMagicNumber = 35;

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

  useEffect(() => {
    const firstPointPosition = pointDictionary['1'];
    const secondPointPosition = pointDictionary['2'];
    const thirdPointPosition = pointDictionary['3'];

    if (firstPointPosition && secondPointPosition && thirdPointPosition) {
      setAngle(getAngle(firstPointPosition, secondPointPosition, thirdPointPosition))
    }

  }, [pointDictionary])


  return (
    <div style={{ position: 'relative', backgroundColor: 'purple', height: '100vh', width: '100vw' }}>
      {/* <div>
        Coord: {mouseCoords.x}, {mouseCoords.y}
      </div> */}
      {/* {
        <ul>
          {Object.entries(pointDictionary).map(([id, position]) => (
            <li key={id}>
              {id} = {position.x}, {position.y}
            </li>
          ))}
          <li>
            Angle = {angle}
          </li>
        </ul>
      } */}

      <DragDrop />

      {
        pointDictionary['2'] ?
          <div style={{
            position: 'absolute', left: pointDictionary['2'].x, top: pointDictionary['2'].y + yPointOffsetMagicNumber,
            width: '1em', height: '1em', zIndex: '10'
          }}>
            {angle}
          </div>
          : null
      }

      <div style={{ position: 'absolute', zIndex: '3'}}>
        <Xwrapper>
          <DraggableBox id={'1'} pointDictionary={pointDictionary} setPointDictionary={setPointDictionary} />
          <DraggableBox id={'2'} pointDictionary={pointDictionary} setPointDictionary={setPointDictionary} />
          <DraggableBox id={'3'} pointDictionary={pointDictionary} setPointDictionary={setPointDictionary} />
          <Xarrow start={'1'} end={'2'} path="straight" showHead={false} startAnchor={'middle'} endAnchor={'middle'} />
          <Xarrow start={'3'} end={'2'} path="straight" showHead={false} startAnchor={'middle'} endAnchor={'middle'} />
        </Xwrapper>
      </div>

      {
      pointDictionary['2'] != null ?
        <AngleArc xPos={pointDictionary['2'].x} yPos={pointDictionary['2'].y} angle={angle} pointDic={pointDictionary}></AngleArc> : null
      }

    </div>
  );
}

export default Protractor; 