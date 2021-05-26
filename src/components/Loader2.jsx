import React from 'react'
import styled from 'styled-components'
import loader1 from './../assets/images/loader4.gif'


class Loader2 extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount=()=>{

    }

    render(){
        return(
            <Root>
                <ItemImage1  src={loader1}/>
            </Root>
        )
    }
}

const Root=styled.div`
    display:flex;
    width:100%;
    height:auto;
    align-items:center;
    justify-content:center;
`


const ItemImage1 = styled.img`
    height: 80px;
    width : 80px;
    background-size: contain;
    object-fit:contain;
`

export default Loader2