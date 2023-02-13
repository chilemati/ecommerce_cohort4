import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './products.scss'
// import { product } from '../products'
import {FaHeart,FaCartPlus} from 'react-icons/fa'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { cartNum } from '../global/cart'

const Products = () => {
    let { id } = useParams();
    let [product, setProduct] = useState(null);
    let [likes, setLikes] = useState(0);
    let [cart, setCart] = useState("");
    let [num, setNum] = useRecoilState(cartNum);

    useEffect(() => {
        axios.get('http://localhost:4000/api/fool/products/').then((reply) => {
            setProduct(reply.data);
        }).catch((err) => {
            console.log(err);
        })
        
    }, [product,likes,cart]);

    function handleLIkes(x) {
        axios.post('http://localhost:4000/api/fool/products/likes', { id: x }).then((reply) => {
            setLikes(reply.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleCart(x) {
        axios.post('http://localhost:4000/api/fool/products/addcart', { id: x }).then((reply) => {
            let c = 0;
            setCart('Added');
            setNum(c = c + 1);
        }).catch((err) => {
            console.log(err);
        })
    }


  return (
      <div className='container'>
          <h1>Recent Products</h1>
          <div className="gallary">
              
              {
                 product && product.map((x) => (
                      <div className="card" key={x._id}>
                  <div className="img">
                      <Link to={`/product/${x._id}`} > <img src={x.prodImg_url} alt="A Product Image" /> </Link>
                  </div>
                  <div className="dis">
                      <h4> {x.prodName} </h4>
                      <p> {x.prodIntro} </p>
                      <div className="flex">
                          <span className="price"> $ {x.prodPrice} </span>
                          <span className="like"><FaHeart className='heart' onClick={()=> handleLIkes(x._id) } /> <span className="like_num"> {x.prodLike} </span> </span>
                          <span className="cart"><FaCartPlus onClick={()=> handleCart(x._id)} /> {x.prodCart} </span>
                      </div>
                         </div>
                         
              </div>
                  ))
              }
              
          </div>
          
    </div>
  )
}

export default Products