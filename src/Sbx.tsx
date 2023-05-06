import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Protractor from "./protractor.png";

const Sbx = () => {
    return (
        <div className="App" style={{
            backgroundColor: 'steelblue',
            height: '100%',
            width: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
                limitToBounds={false}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div className="tools">
                            <button onClick={() => zoomIn()}>+</button>
                            <button onClick={() => zoomOut()}>-</button>
                            <button onClick={() => resetTransform()}>x</button>
                        </div>
                        <TransformComponent wrapperStyle={{height:'100%', width: '100%'}}>
                            <img src={Protractor}/>
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
        </ div>
    )
}

export default Sbx