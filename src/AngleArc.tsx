import React, { useEffect, useRef, useState } from "react";
import QuickSettings from "quicksettings";
import './App.css'
import { getAngle, getArcPath } from "./Tools";
import { PointDictionary, position } from "./GeneralTypes";

type ArcType = {
  shape: SVGEllipseElement | null;
  path: SVGPathElement | null;
  showStroke: boolean;
  startAngle: number;
  sweepAngle: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

type AngleArcProps = {
  xPos: number
  yPos: number
  angle: number
  pointDic: PointDictionary
}

/* Arc offset magic numbers */
const arcXOffset = 17.5
const arcYOffset = 16

const AngleArc = ({xPos, yPos, angle, pointDic}: AngleArcProps) => {
  const [arc, setArc] = useState<ArcType>({
    shape: null,
    path: null,
    showStroke: false,
    startAngle: 0,
    sweepAngle: 135,
    cx: xPos,
    cy: yPos,
    rx: 100,
    ry: 100,
  });

  const [arcPos, setArcPos] = useState<position>({x:xPos,y:yPos});

  // Add useRef hooks for the shape and path elements
  const shapeRef = useRef<SVGEllipseElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    // Update the shape and path properties of the arc state object
    setArc({
      ...arc,
      shape: shapeRef.current,
      path: pathRef.current,
    });
    //Arc shape debug tool
    // if(arc.shape != null && arc.path != null && arc != null)
    // {
    //   QuickSettings.create(5, 5, "Arc Settings")
    //   .bindRange("startAngle", -360, 360, arc.startAngle, 1, arc)
    //   .bindRange("sweepAngle", -360, 360, arc.sweepAngle, 1, arc)
    //   .bindBoolean("showStroke", arc.showStroke, arc)
    //   .setGlobalChangeHandler(update);
    // }
  }, [arc.shape, arc.path]);

  useEffect(() => {
    console.log("Arc location updated")
    arc.cx = xPos + arcXOffset
    arc.cy = yPos + arcYOffset
    arc.sweepAngle = angle
    arc.startAngle = getAngle({x:pointDic['2'].x, y:pointDic['2'].y + 100}, pointDic['2'], pointDic['1'] ) + 180
    update()
  },[xPos, yPos, angle, pointDic])

  // Update the arc whenever the settings change
  function update() {
    console.log("Arc updated");
    if (arc.shape != null && arc.path != null) {
      var d = getArcPath(arc.cx, arc.cy, arc.rx, arc.ry, arc.startAngle, arc.sweepAngle);
      arc.path.style.strokeOpacity = arc.showStroke ? "1" : "0";
      arc.path.setAttribute("d", d);

      arc.shape.setAttribute("cx", arc.cx.toString());
      arc.shape.setAttribute("cy", arc.cy.toString());
      arc.shape.setAttribute("rx", arc.rx.toString());
      arc.shape.setAttribute("ry", arc.ry.toString());
    }
  }

  return (
    <svg className="arc-svg" style={{zIndex:-1}}>
      <ellipse id="arc-shape" ref={shapeRef} />
      <path id="arc-path" ref={pathRef} />
    </svg>
  );
};

export default AngleArc;