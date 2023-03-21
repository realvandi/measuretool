import Draggable, { DraggableData, DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";
import generateRandomInteger from "./Tools";

type DraggableBoxProps = {
    id: string
}

const onDragHandler: DraggableEventHandler = (event, data) => {
    console.log("Point Location: " + data.x + ',' + data.y)
}

const DraggableBox = ({ id }: DraggableBoxProps) => {

    useXarrow();

    return (
        <>
            <Draggable onDrag={onDragHandler} defaultPosition={{ x: generateRandomInteger(0, 500), y: generateRandomInteger(0, 500) }}>
                <div id={id} style={{ border: 'grey solid 1px', borderRadius: '50%', padding: '0px', textAlign: 'center', width: '1em', height: '1em' }}>
                    {id}
                </div>
            </Draggable>
        </>
    );
};

export default DraggableBox