import MyContext from '../globalStore/MyContext.jsx';
import { Context } from '../globalStore/store.jsx';
import styled from 'styled-components'
import user from '../assets/images/user.svg'

function ModalStateUpdaterButton() {
//   // The Theme Toggler Button receives not only the theme
//   // but also a toggleTheme function from the context
  return (
      <MyContext.Consumer>
       { ({openM})=>(
     
            // <Button onClick={openM}>
            //     Login
            // </Button>
            <Account onClick={openM} src={user}></Account>
         
        )}
      </MyContext.Consumer>
    );
//     <ThemeContext.Consumer>
//       {({theme, toggleTheme}) => (
//         <button
//           onClick={toggleTheme}
//           style={{backgroundColor: theme.background}}>
//           Toggle Theme
//         </button>
//       )}
//     </ThemeContext.Consumer>
//   );
}

export default ModalStateUpdaterButton;

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
padding: 5px 17px 5px;
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

const Account=styled.img`
  width:24px;
  height:24px;
  margin-left:16px;
`