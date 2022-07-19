import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from './components/Login'
import Sales from '.componentes/Sales';
import ProductsAdmin from './components/products/ProductsAdmin';
import ProductsAdd from './components/products/ProductsAdd';
import ProductsEdit from './components/products/ProductsEdit';

import ClientsAdmin from './components/clients/ClientsAdmin';
import ClientsAdd from './components/clients/ClientsAdd';
import ClientsEdit from './components/clients/ClientsEdit';

import UserAdmin from './components/clients/UserAdmin';
import UserAdd from './components/clients/UserAdd';
import UserEdit from './components/clients/UserEdit';

function App() {
  return (
    <div className='App'>
      <Routes>
        <route path='/' element={<login/>}></route>
        <route path='/sales' element={<Sales/>}></route>
        <route path='/products' element={<ProductsAdmin/>}></route>
        <route path='/products/add' element={<ProductsAdd/>}></route>
        <route path='/products/edit' element={<ProductsEdit/>}></route>
        <route path='/clients' element={<ClientsAdmin/>}></route>
        <route path='/clients/add' element={<ClientsAdd/>}></route>
        <route path='/clients/edit' element={<ClientsEdit/>}></route>
        <route path='/user' element={<UserAdmin/>}></route>
        <route path='/user/add' element={<UserAdd/>}></route>
        <route path='/user/edit' element={<UserEdit/>}></route>
      </Routes>
    </div>
  );
}

export default App;
