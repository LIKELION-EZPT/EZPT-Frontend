import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './Pages/MainPage';
import { RegisterPage } from './Pages/RegisterPage';
import { LoginPage } from './Pages/LoginPage';
function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage></LoginPage>}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>
      <Route path='/main' element={<RegisterPage></RegisterPage>}></Route>
    </Routes>
  );
}

export default App;
