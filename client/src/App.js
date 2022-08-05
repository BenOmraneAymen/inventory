import './App.css';
import * as React from 'react';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPage from './objectEditPage/objectEditPage';
import TypeEditPage from './typeEditPage/typeEditPage';
import TypeListPage from './typeListPage/typeListPage';
import ProtectedRoute from './protectedRoute/protectedRoute';

function App() {
  return (
  <>
  <Router>
      <Routes>
        <Route path='/Dashboard/:type' element={
          <Dashboard/>
        } />
        <Route path='/' element={
          <Login/>
        } />
        <Route path='/Dashboard/editObjet/:id' element={
          <EditPage/>
        }/>
        <Route path='/Dashboard/editType/' element={
          <TypeListPage/>
        }  />
        <Route path='/Dashboard/editType/:type' element={
          <TypeEditPage/>
        }  />
        <Route path='/hello' element={
          <ProtectedRoute/>
        }/>
      </Routes>
  </Router>
  </>

  );
}

export default App;
