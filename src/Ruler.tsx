import AngleArc from "./AngleArc";
import RulerBar from "./RulerBar";

const Ruler = () => {
  return (
    <div>
      <p>Ruler</p>
      <RulerBar width={100} height={100} units="cm" />
    </div>
  );
}
export default Ruler;