import React from 'react'
import ClientImageModal from './Client/ClientImageModal'
import Pin from "./Pin"
export default function ImageApp({Data,base ,dest,username}) {
    const sizes=["small","medium","large"]
    const [show,setShow]=React.useState(false)
    const [index,setIndex]=React.useState(0)

  return (
    <div className="ImageApp">
      <ClientImageModal base={base} dest={dest} Data={Data} index={index} setIndex={setIndex} show={show} setShow={setShow}/>
      <div className="main">
        

        <div className="mainContainer">
          {Data &&
            Data.map((data,idx) => (
              <Pin
                base={base}
                dest={dest}
                key={idx}
                idx={idx}
                pinSize={sizes[idx%3]}
                imgSrc={data.url}
                img={data}
                username={username}
                setShow={setShow}
                setIndex={setIndex}
              />
            ))}
        </div>
        </div>
    </div>
  )
}
