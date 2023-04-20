import React, { useRef, useEffect } from "react";
import styled from "styled-components";

interface RulerProps {
  width: number;
  height: number;
  units: string;
}

const RulerContainer = styled.div`
  position: relative;
`;

const RulerLine = styled.div<{ length: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ length }) => length}px;
  height: 2px;
  background-color: black;
`;

const RulerText = styled.div<{ top: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 0;
  font-size: 10px;
`;

const RulerBar: React.FC<RulerProps> = ({ width, height, units }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpi = window.devicePixelRatio;
    console.log(window.devicePixelRatio);
    const pixelsPerUnit = 96 / 2.54; // assuming 96 DPI, 2.54 cm in an inch

    // calculate the size of the ruler in pixels
    const rulerWidth = width * pixelsPerUnit * dpi;
    const rulerHeight = height * pixelsPerUnit * dpi;

    // set the container size
    container.style.width = `${rulerWidth}px`;
    container.style.height = `${rulerHeight}px`;

    // draw the ruler lines and labels
    const lines = [];
    const labels = [];
    for (let i = 0; i <= width; i++) {
      const isMajor = i % 10 === 0;
      const length = isMajor ? 10 : 5;
      const top = isMajor ? 0 : 5;
      const left = i * pixelsPerUnit * dpi;
      const labelText = isMajor ? `${i} ${units}` : "";

      lines.push(<RulerLine key={`line-${i}`} length={length} style={{ left }} />);
      labels.push(<RulerText key={`label-${i}`} top={top} style={{ left }}>{labelText}</RulerText>);
    }

    const rulerHtml = [...lines, ...labels].map((element) => element.props.children).join("");
    container.innerHTML = rulerHtml;
  }, [width, height, units]);

  return <RulerContainer ref={containerRef} />;
};

export default RulerBar;