import React ,{Component}from 'react'
import styled from 'styled-components'

class Modal extends React.Component{

    constructor(props){
        super(props)

    }

    componentDidMount=()=>{
    }

    showModal=()=>{
        return( <Root>
                    <Close onClick={()=>{this.props.close()}}>Close</Close>
                    {this.props.children}
                </Root>
            )
    }

    render(){
        const is_open =this.props.open
            return(
            <React.Fragment>
                {is_open ? this.showModal():null}
            </React.Fragment>
           
        )
    }
}

const Root = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    height: 100%;
    width:auto;
    justify-items:center;
    // background-color: #ffe6cc;
    background-color: linear-gradient(to bottom,#fff  0%, #ffe6cc 200%); 
    background: -webkit-gradient(to bottom,#fff  0%, #ffe6cc 200%);  /* Chrome, Safari4+ */
    background: -webkit-linear-gradient(to bottom,#fff  0%, #ffe6cc 200%);  /* Chrome10+, Safari5.1+ */
    background: -moz-linear-gradient(to bottom,#fff  0%, #ffe6cc 300%);     /* FF3.6+ */
    background: linear-gradient(to bottom,#fff  0%, #ffe6cc 200%);      /* W3C */
    // opacity:0.9;
    // background-color: rgb(255, 230, 204,0.9);//rgb(160, 87, 52,0.9);
    z-index:1002;
    left:0;
    right:0;
`

const Close=  styled.button`   
position:absolute; 
right:0;
margin:20px 20px;
z-index:1003

`


export default Modal