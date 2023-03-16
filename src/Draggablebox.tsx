import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

type DraggableBoxProps = {
    id: string
}

const DraggableBox = ({id} : DraggableBoxProps) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div id={id} style={{border: 'grey solid 1px', borderRadius: '50%', padding: '0px', textAlign: 'center', width: '0em', height: '0em'}}>
                {id}
            </div>
        </Draggable>
    );
};

export default DraggableBox