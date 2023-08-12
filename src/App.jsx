import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './Pages/MainPage';
import { RegisterPage } from './Pages/RegisterPage';
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
    </Routes>
  );
}

export default App;
