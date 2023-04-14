import Draggable, { DraggableData, DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";
import './styles.css';
import { PointDictionary, position } from "./GeneralTypes";
import { useCallback, useEffect } from "react";
import { generateRandomInteger } from "./Tools";

type DraggableBoxProps = {
    id: string
    pointDictionary: PointDictionary
    setPointDictionary: React.Dispatch<React.SetStateAction<PointDictionary>>
}

/*
Curried function alternative for onDragHandler [DEPRECATED]
Originally called whenever a Draggable is onDrag so it consumes @param id, event, and data which
contains location and outputs in console.
TODO: Learn curried functions
*/
/*
const onDragHandler = (id: string, pointDictionary: PointDictionary, setPointDictionary: React.Dispatch<React.SetStateAction<PointDictionary>>): DraggableEventHandler => (event, data) => {
    console.log(`ID: ${id}, Point Location: ${data.x},${data.y}`);
    const position = { x: data.x, y: data.y };
    setPointDictionary(prevState => ({ ...prevState, [id]: position }));
}
*/

const DraggableBox = ({ id, pointDictionary, setPointDictionary }: DraggableBoxProps) => {

    useXarrow();

    const xDefaultPosition = generateRandomInteger(0,500);
    const yDefaultPosition = generateRandomInteger(0,500);

    useEffect(() => {
        setPointDictionary(prevState => ({ ...prevState, [id]: {x: xDefaultPosition, y: yDefaultPosition} }));
    },[])

    /* TODO: Learn React useCallback() */
    const onDragHandler = useCallback(
        (event: any, data: any) => {
          const position = { x: data.x, y: data.y };
          setPointDictionary(prevState => ({ ...prevState, [id]: position }));
          console.log(`ID: ${id}, Point Location: ${data.x},${data.y}`);
        },
        [id, setPointDictionary]
      );

    return (
        <div>
            <Draggable onDrag={onDragHandler} defaultPosition={{ x: xDefaultPosition, y: yDefaultPosition }}>
                <div id={id} 
                  className="draggableButton"
                >
                    <div style={{userSelect: 'none'}}>
                        
                    </div>
                </div>
            </Draggable>
        </div>
    );
};

export default DraggableBox