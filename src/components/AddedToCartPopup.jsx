import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik';
import MyContext from '../globalStore/MyContext';
import {axiosInstance} from './../service/axiosservice.jsx'
import * as Yup from 'yup';


class AddedToCartPopup extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <Root>
                Item added to cart .Chill!
            </Root>
        )
    }
}


const Root = styled.div`
    height:200px;
    width:200px;
`

export default AddedToCartPopup
