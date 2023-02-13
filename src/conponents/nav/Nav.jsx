import React from 'react'
import { Link } from 'react-router-dom';
import './nav.scss';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartNum } from '../global/cart';
import axios from 'axios';

const Nav = () => {
  let [numm, setNum] = useRecoilState(cartNum);
  useEffect(() => {
    axios.get('http://localhost:4000/api/fool/products/cart').then((reply) => {
      setNum(reply.data.length);
    })
  }, [numm,cartNum]);

  return (
      <div className='nav'>
          <div className="logo">Logo</div>
          <div className="box"> <Link to="/">Products</Link></div>
          <div className="box"> <Link to="/category">Category</Link></div>
          <div className="box"> <Link to="/create">Create-Product</Link></div>
          <div className="box"> <Link to="/cart">Cart [{numm}] </Link></div>
          <div className="box"> <Link to="/about">About</Link></div>
      <div className="box"> <Link to="#">&#9776;</Link></div>
      

    </div>
    
  )
}

export default Nav