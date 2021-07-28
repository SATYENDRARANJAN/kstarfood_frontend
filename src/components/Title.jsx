import React, {useEffect, useContext} from 'react';
import {Context} from '../globalStore/store.jsx'
import styled from 'styled-components'
import cartpng from '../assets/images/cart.png'
import ModalStateUpdaterButton from '../components/ModalStateUpdaterButton.jsx'
import ModalStateUpdaterButtonLogout from '../components/ModalStateUpdaterButtonLogout.jsx'
import MyContext from '../globalStore/MyContext';
import { keyframes ,css} from 'styled-components'


export  const Title = (props)=>{
    return (
        <TitleDiv width={props.width} color={props.color}>
            Urbanswaad CHOCOLATES
        </TitleDiv>
    )
}   

export const MenuBarComponent =()=>{
        return(
                <MenuBar>
                    <MenuItems >
                        Weddings
                    </MenuItems>
                    <MenuItems >
                        Birthday
                    </MenuItems>
                    <MenuItems >
                        Anniversary
                    </MenuItems>
                    <MenuItems >
                        Women's Day
                    </MenuItems>                   
                    <MenuItems >
                Bulk Orders
            </MenuItems>
                </MenuBar>
            )
}

export const AddToCartBtnTop = ({is_logged_in,openCartM,addedToCart})=>{
    return(
        <MyContext.Consumer>
                {({jwt,setJwt,closeCartM,openAddress,isMobile})=>(
       
            <CartTopDiv >
                {console.log(is_logged_in)}
                <CartBtnDiv>
                {is_logged_in ?<AddToCartBtn src={cartpng} onClick={openCartM} addedToCart={addedToCart}/>:null}
                {/* <StickyPopup isMobile={isMobile}/> */}
                </CartBtnDiv>
                {!is_logged_in ?<ModalStateUpdaterButton/>:null}
                {is_logged_in ?<ModalStateUpdaterButtonLogout/>:null}

                {/* {<AddToCartBtn src={cartpng} onClick={openCartM}/>}
                {<ModalStateUpdaterButton/>}
                {<ModalStateUpdaterButtonLogout/>} */}

            </CartTopDiv>
        )}
    </MyContext.Consumer>

    )
}



// // function to guard the component for private access
// export const authGuard = (Component) => () => {
//     return localStorage.getItem("token") ? (
//       <Component />
//     ) : (
//       <Redirect to="/login" />
//     );
//   };
  
  

const TitleDiv = styled.h2`
    color: ${props => (props.color ? props.color : '#7b5734')};
    text-align: left;
    font-size:${props => (props.width >565? "50px":"20px")};
    max-width:${props =>(props.width >565?"auto":"auto")};
    margin-top:45px;
    margin-bottom:24px;
    font-family:'Montserrat', sans-serif;
    font-weight:590;
`
const MenuBar =styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
`
const MenuItems =styled.button`
    margin: 0px 10px 0px 10px;
    width: auto;
    height : 100%;
    text-align: center;

` 
const CartTopDiv = styled.div`
    display:flex;
    position:absolute;
    top:10px;
    right:10px;
    float:right;
`


const vibrate = keyframes`
0% {transform: translate(0, -20%);scale()}
5% {transform: translate(0, 50%);scale(1)}
10% {transform: translate(0, -20%);scale(2)}
15% {transform: translate(0, 50%);scale(1)}
20% {transform: translate(0, -20%);scale(2)}
25% {transform: translate(0, 50%);scale(1)}
30% {transform: translate(0, -20%);scale(2)}
35% {transform: translate(0, 50%);scale(1)}
40% {transform: translate(0, -20%);scale(2)}
45% {transform: translate(0, 50%);scale(1)}
50% {transform: translate(0, -20%);scale(2)}
55% {transform: translate(0, 50%);scale(1)}
60% {transform: translate(0, -20%);scale(2)}
100% {transform: translate(0, 50%);scale(1)}
`

const styles = css`
  background-color: pink;
  animation: ${vibrate} 0.3s linear 3;
`;


const AddToCartBtn=styled.img`
    display:flex;
    // width:30px;
    // height: 30px;
    object-fit:contain;
    animation-name:${props=>props.addedToCart ? vibrate :''};
    animation-duration: 3s;
    animation-iteration-count: 1;
`


const CartBtnDiv=styled.div`
    display:flex;
    width:30px;
    height: 30px;
    position:relative;
    
`

const example = keyframes`
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`
const StickyPopup=styled.div`
    margin-top:30px;
    margin-left:-300px;
    position:absolute;
    width:${props=>props.isMobile?'100px':'300px'};
    height:${props=>props.isMobile?'100px':'300px'};
    // background-color:#543534;
    z-index:99;

    // position: relative;
  animation-duration: 3s;
  animation-iteration-count: 1;
//   animation-direction: alternate-reverse; 

  animation-name: ${example};
 animation-duration: 8s;
 animation-iteration-count: 1;
  
`

