import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './app.scss';
import Cart from './conponents/cart/Cart';
import Create from './conponents/create/Create';
import Detail from './conponents/details/Detail';
import Error from './conponents/error/Error';

import Nav from "./conponents/nav/Nav";
import Products from './conponents/products/Products';



function App() {


 

  return (
    <RecoilRoot>
    <BrowserRouter>
    <div className="App">
      <Nav />
        <Routes >
          <Route path='/' element={<Products />} />
          <Route path='/create' element={<Create />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<Detail />} />
          <Route path='*' element={<Error />} />

        </Routes>
        </div>
      </BrowserRouter>
      </RecoilRoot>
  );
}

export default App;
