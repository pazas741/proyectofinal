import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {createRoot} from "react-dom/client";
import App from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
  <routes>
    <Route path='/*' element={<App/>}></Route>
  </routes>
  </BrowserRouter>
)

