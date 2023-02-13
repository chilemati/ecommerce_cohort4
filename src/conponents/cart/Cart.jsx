import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { cartNum } from '../global/cart';
import { RiDeleteBin2Fill } from 'react-icons/ri';


const Cart = () => {
    let [product, setProduct] = useState(null);
    let [nums, setNum] = useRecoilState(cartNum);
    let [remcart, setRemcart] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:4000/api/fool/products/cart').then((reply) => {
            setProduct(reply.data);
            setNum(reply.data.length);
        }).catch((err) => {
            console.log(err);
        })
    }, [product,nums,remcart]);

    function handleDelete(x) {
        let c = 0;
        axios.post('http://localhost:4000/api/fool/products/removecart', { id: x }).then((reply) => {
            setRemcart(c=c+1);
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
      <div>
          <h1>Your Cart Products: {nums} </h1>
           <div className="gallary">
              
              {
                 product && product.map((x) => (
                      <div className="card" key={x._id}>
                  <div className="img">
                       <img src={x.prodImg_url} alt="A Product Image" />
                  </div>
                  <div className="dis">
                      <p> {x.prodIntro} </p>
                      <div className="flex">
                      <span> {x.prodName} </span>
                                 <span className="price"> $ {x.prodPrice} </span>
                                 <span> <RiDeleteBin2Fill
                                     className="delete"
                                     onClick={()=> handleDelete(x._id)}
                                 /> </span>
                      </div>
                         </div>
                         
              </div>
                  ))
              }
              
          </div>
    </div>
  )
}

export default Cart