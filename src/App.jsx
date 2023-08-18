import './App.css';
import { Route, Routes } from 'react-router-dom';
import  MainPage  from './MainPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage></MainPage>}></Route>
{/*       <Route path='/main' element={<MainPage></MainPage>}></Route> */}
    </Routes>
  );
}

export default App;
