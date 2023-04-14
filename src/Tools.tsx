import { position } from "./GeneralTypes";

export function generateRandomInteger(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export const getAngle = (first: position, second: position, third: position): number => {
    const radians = Math.atan2(third.y - second.y, third.x - second.x) - Math.atan2(first.y - second.y, first.x - second.x);
    return radians * (180 / Math.PI);
}

// Get the SVG path for the arc
export function getArcPath(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    startAngle: number,
    sweepAngle: number
  ): string {
    // 0 degrees, no path
    if (!sweepAngle) return `M${cx} ${cy}`;
    
    // mod angles to 360 degrees
    startAngle %= 360;
    sweepAngle %= 360;
    
    // If arc is 360 degrees, the sweep angle is 0 due to mod
    var isClosed = (sweepAngle === 0);
    
    // If closed, we'll need to use 2 arcs with an angle of 180 degrees
    if (isClosed) {
      sweepAngle = 180;
    }
    
    // Make angle positive to simplify large arc flag
    if (sweepAngle < 0) {
      sweepAngle += 360;
    }
    
    var largeArc = sweepAngle > 180 ? 1 : 0;
    
    // Convert degrees to radians
    var a1 = startAngle * Math.PI / 180;
    var a2 = (startAngle + sweepAngle) * Math.PI / 180;
    
    // Calculate start and end coords for arc. Starts at 12 o'clock
    var x1 = cx + rx * Math.sin(a1);   
    var y1 = cy - ry * Math.cos(a1);
  
    var x2 = cx + rx * Math.sin(a2); 
    var y2 = cy - ry * Math.cos(a2);
      
    /*
    NOTE: To orient the starting point to 3 o'clock instead of 12 o'clock,
    add 90 degrees to the start angle, or change the code above to this...
  
    var x1 = cx + rx * Math.cos(a1);   
    var y1 = cy + ry * Math.sin(a1);
  
    var x2 = cx + rx * Math.cos(a2); 
    var y2 = cy + ry * Math.sin(a2);
    */
    
    // Related demo using arc path
    // https://codepen.io/osublake/pen/VbWKMj/
    return isClosed
      ? `
          M ${x1} ${y1}
          A ${rx} ${ry} 0 1 1 ${x2} ${y2}
          A ${rx} ${ry} 0 1 1 ${x1} ${y1}z`
      : `
          M ${x1} ${y1}
          A ${rx} ${ry} 0 ${largeArc} 1 ${x2} ${y2}
          L ${cx} ${cy}z`;
  }
