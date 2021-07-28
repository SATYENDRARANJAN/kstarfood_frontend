import styled ,{keyframes,css} from 'styled-components'
import React ,{useState,Component}from 'react'
import { withRouter } from 'react-router'
import MyContext from '../globalStore/MyContext.jsx';

class NavPanel extends React.Component{
    constructor(props){
        super(props)
        this.state={
          open:this.props.open?this.props.open:false
        }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
    }


    onBackdropClick=(handleMenuClick)=>{
      handleMenuClick(!this.state.open)

    }
    
    handleLinkClick=(val,setSelectedTag,handleMenuClick)=> {
        debugger
        setSelectedTag(val)
        handleMenuClick(!this.state.open)
        
        // await this.setState({menuOpen: false});
        // await this.setSelectedTag(val)
         localStorage.setItem('tag',val)
         this.props.history.push('/')
      }
    

    componentDidMount=()=>{
       
    }

    getMenuItems=(setSelectedTag,handleMenuClick)=>{
        debugger
        const menuItems = this.props.tags.map((val,index)=>{
            return (
              <MenuItem 
                key={index} 
                id={index}
                delay={`${index * 0.1}s`}
                onClick={()=>this.handleLinkClick(val,setSelectedTag,handleMenuClick)}>{val.toUpperCase()}</MenuItem>)
          });
          return menuItems
    }

    render=()=>{

        
        return(
            <MyContext.Consumer>
                {({setSelectedTag,handleMenuClick})=>(
                  <React.Fragment>
                    {this.state.open ?
                    <Backdrop onClick={()=>this.onBackdropClick(handleMenuClick)}/>:null}

                    {this.state.open ?
                    <NavPanelDiv slideIn={this.state.open}>
                      <MenuItem>
                        Urbanswaad
                      </MenuItem>         
                      {this.getMenuItems(setSelectedTag,handleMenuClick)}
                    </NavPanelDiv>:null
                    }
                  </React.Fragment>
                  )}
            </MyContext.Consumer>)
    }
}

export default withRouter(NavPanel);



const slideIn=keyframes`
  0% {
    transform: translateX(-70%);
  }
  100% {
    transform: translateX(0%);
  }
`
const slideOut=keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-70%);
  }
`

const NavPanelDiv=styled.div`
  width: 70%;
  height:100%;
  justify-content:center;
  position:fixed;
  background-color:#4e4e4e;
  z-index:1100;
  left:0;  
  opacity:0.9; 
  animation: ${props=>(props.slideIn ? css`1.2s ${slideIn} forwards`:css`1.2s ${slideOut} `)};
  // animation-duration: 2s;
  padding-top:24px;
  justify-content:center;
  overflow-y:scroll;


`


const Heading=styled.text`
display:flex;
  font-size : 20px;
  color:#c0a680;
  font-family:'Montserrat', sans-serif;

  font-weight:900;
  letter-spacing:1.4px;
  margin-left:14px;
  text-align:center;

`

/* MenuItem.jsx*/
class MenuItem extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        hover:false,
      }
    }
    
    handleHover(){
      this.setState({hover:!this.state.hover});
    }
    
    render(){
      const styles={
        container: {
          opacity: 1,
          animation: '1s appear forwards',
          animationDelay:this.props.delay,
          zIndex:1100
        },
        menuItem:{
          fontFamily:`'Open Sans', sans-serif`,
          fontSize: '1.2rem',
          padding: '1rem 0',
          margin: '0 5%',
          cursor: 'pointer',
          color: this.state.hover? 'gray':'#fafafa',
          transition: 'color 0.2s ease-in-out',
          animation: '0.5s slideIn forwards',
          animationDelay:this.props.delay,
          textAlign:'center'
  
        },
        line: {
          width: '90%',
          height: '1px',
          background: 'gray',
          margin: '0 auto',
          animation: '0.5s shrink forwards',
          animationDelay:this.props.delay,
          
        }
      }
      return(
        <div style={styles.container}>
          <div 
            style={styles.menuItem} 
            onMouseEnter={()=>{this.handleHover();}} 
            onMouseLeave={()=>{this.handleHover();}}
            onClick={this.props.onClick}
          >
            {this.props.children}  
          </div>
        <div style={styles.line}/>
      </div>  
      )
    }
  }


  const Backdrop=styled.div`
  // display:flex;
  background-color:#424242;
  opacity:0.4;
  position:fixed;
  left:0;
  top:0;
    width:100%;
    height:100%;
    z-index:1000;

  `
  
  // /* Menu.jsx */
  // class Menu extends React.Component {
  //   constructor(props){
  //     super(props);
  //     this.state={
  //       open: this.props.open? this.props.open:false,
  //     }
  //   }
      
  //   componentWillReceiveProps(nextProps){
  //     if(nextProps.open !== this.state.open){
  //       this.setState({open:nextProps.open});
  //     }
  //   }
    
  //   render(){
  //     const styles={
  //       container: {
  //         position: 'absolute',
  //         top: 0,
  //         left: 0,
  //         // height: this.state.open? '100%': 0,
  //         width: '100vw',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         background: 'black',
  //         opacity: 0.95,
  //         color: '#fafafa',
  //         transition: 'height 0.3s ease',
  //         zIndex: 2,
  //       },
  //       menuList: {
  //         paddingTop: '3rem',
  //       }
  //     }
  //     return(
  //       <div style={styles.container}>
  //         {
  //           this.state.open?
  //             <div style={styles.menuList}>
  //               {this.props.children}
  //             </div>:null
  //         }
  //       </div>
  //     )
  //   }
  // }