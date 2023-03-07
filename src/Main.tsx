import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Ruler from './Ruler';
import Protractor from './Protractor';
const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ruler' element={<Ruler />} />
      <Route path='/protractor' element={<Protractor />} />
    </Routes>
  );
}
export default Main;