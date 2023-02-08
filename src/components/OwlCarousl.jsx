import React from 'react'
import OwlCarousel from 'react-owl-carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';    
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {useStateContext} from "../contexts/ContextProvider"
import UserCard2 from './UserCard2';

export default function OwlCarousl() {
    const { users } = useStateContext();

  return <div>
    {
        users.length && <OwlCarousel items={1} autoPlay={false} className='owl-theme'  margin={10} nav>
        {
        users.map((item)=>{
            return <div className="item">
            <UserCard2 userdata={item} />
            </div>
        })
        
        }
        </OwlCarousel> 
    }
  </div>
}
