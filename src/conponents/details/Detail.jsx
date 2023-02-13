import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Detail = () => {
  let { id } = useParams();
  let [pro, setPro] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:4000/api/fool/products/details', { id: id }).then((reply) => {
      setPro(reply.data);
    })
  })
  return (
    <div>
      <h1> Single Product Details for Product_Number: {id} </h1>

      {
        pro && 
        <div key={pro._id}>
            <img src={pro.prodImg_url} alt={pro.prodName} />
            <h1> {pro.prodName} </h1>
            <div className="flex">
              <span>$ {pro.prodPrice} </span>
            </div>
            <p> {pro.prodDetails} </p>
          </div>
      }
     
          
    </div>
  )
}

export default Detail