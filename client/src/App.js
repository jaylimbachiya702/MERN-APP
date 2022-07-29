import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';
import {Routes, Route} from 'react-router-dom';
import Detail from './Detail';

function App() {
  return (
    <>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/view/:id' element={<Detail/>}/>
        </Routes>
    </>
  );
}

export default App;
