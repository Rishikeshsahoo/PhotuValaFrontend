import React from 'react'
import ClientImageModal from './Client/ClientImageModal'
import Pin from "./Pin"
export default function ImageApp({Data,base ,dest,username}) {
    console.log("dataa",Data)
    const sizes=["small","medium","large"]
    const [show,setShow]=React.useState(false)
    const [image,setImage]=React.useState(null)


  return (
    <div className="ImageApp">
      <ClientImageModal image={image} show={show} setShow={setShow}/>
      <div className="main">
        

        <div className="mainContainer">
          {Data &&
            Data.map((data,idx) => (
              <Pin
                base={base}
                dest={dest}
                key={idx}
                pinSize={sizes[idx%3]}
                imgSrc={data.url}
                img={data}
                username={username}
                setShow={setShow}
                setImage={setImage}
              />
            ))}
        </div>
        </div>
    </div>
  )
}
