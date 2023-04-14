import React, { useEffect, useRef, useState } from "react";
import QuickSettings from "quicksettings";
import './App.css'
import { getArcPath } from "./Tools";

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

const AngleArc: React.FC = () => {

  const [arc, setArc] = useState<ArcType>({
    shape: null,
    path: null,
    showStroke: false,
    startAngle: 0,
    sweepAngle: 135,
    cx: 500,
    cy: 500,
    rx: 250,
    ry: 250,
  });

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
    if(arc.shape != null && arc.path != null && arc != null)
    {
      QuickSettings.create(5, 5, "Arc Settings")
      .bindRange("startAngle", -360, 360, arc.startAngle, 1, arc)
      .bindRange("sweepAngle", -360, 360, arc.sweepAngle, 1, arc)
      .bindRange("rx", 0, 480, arc.rx, 1, arc)
      .bindRange("ry", 0, 480, arc.ry, 1, arc)
      .bindBoolean("showStroke", arc.showStroke, arc)
      .setGlobalChangeHandler(update);
    }

  }, [arc.shape, arc.path]);

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
    <svg className="arc-svg" >
      <ellipse id="arc-shape" ref={shapeRef} />
      <path id="arc-path" ref={pathRef} />
    </svg>
  );
};

export default AngleArc;