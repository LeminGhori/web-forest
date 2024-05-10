import Form from './components/Form/Form';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import { useState } from 'react';
import RepositoryList from './components/List/RepositoryList';
import Search from './components/List/Search';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      {
        isLogin ?
          <Routes>
            <Route index element={<Search />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          :
          <Routes>
            <Route index element={<Form setIsLogin={setIsLogin} />} />
          </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
