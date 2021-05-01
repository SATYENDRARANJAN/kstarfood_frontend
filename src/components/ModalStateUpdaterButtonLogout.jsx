import MyContext from '../globalStore/MyContext.jsx';
import { Context } from '../globalStore/store.jsx';
import styled from 'styled-components'

function ModalStateUpdaterButtonLogout() {
  return (
      <MyContext.Consumer>
       { ({logout})=>(
            <Button onClick={logout}>
                Logout
            </Button>
         
        )}
      </MyContext.Consumer>
    );
}

export default ModalStateUpdaterButtonLogout;

const Button=styled.button`
-webkit-appearance: button;
-webkit-writing-mode: horizontal-tb !important;
text-rendering: auto;
letter-spacing: 1.5;
word-spacing: normal;
text-shadow: none;
text-align: center;
color:#7b5734;
background-color: #ffe6cc;
box-sizing: border-box;
height :26px;
padding: 1px 7px 2px;
border-width: 1px;
border-style: solid;
border-radius:15px;
border-color: #7b5734;
margin-left:6px;
&:focus {
  background-color: #7b5734;
  color: #ffe6cc;
  outline:0;
}

`