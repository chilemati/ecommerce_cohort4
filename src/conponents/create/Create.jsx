import React from 'react'

const Create = () => {
  return (
      <div>
          <h1>Create A Product!</h1>
          <form
              action='http://localhost:4000/api/fool/products/product'
              method='POST' encType='multipart/form-data' >
              <div className="img">
                  <span>Image </span> <input
                      type="file"
                      name='prodImg'
                      required
                  />
              </div>
              <div className="prodIntro">
                  <span>Intro </span> <textarea
                      name="prodIntro"
                      cols="30"
                      rows="2"
                    required
                  ></textarea>
              </div>

              <div className="prodDis">
                  <span>Full Details </span> <textarea
                      name="prodDetails"
                      cols="30"
                      rows="10"
                    required
                  ></textarea>
              </div>

              <div className="prodPrice">
                  <span>Price</span> <input
                      type="number"
                      required
                      name='prodPrice'
                  />
              </div>

              <div className="prodName">
                  <span>Name</span> <input
                      type="text"
                      required
                      name='prodName'
                  />
              </div>
              <div className="btn">
                  <button>Create Product?</button>
              </div>
              
          </form>
          
    </div>
  )
}

export default Create