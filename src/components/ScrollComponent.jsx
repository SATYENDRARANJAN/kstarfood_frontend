import styled from 'styled-components'
import React ,{useState,Component}from 'react'
import banner from './../assets/images/cheriebanner.png'
import {axiosInstance} from './../service/axiosservice.jsx'
import placeholder from './../assets/images/placeholder.png'
import * as config from './../config.json' 
import loader2 from './../assets/images/loader2.gif'
import Service from '../service/service'
import Loader2 from '../components/Loader2.jsx'
import MyContext from '../globalStore/MyContext'
import { withRouter } from 'react-router'
const images = require.context('./../assets/images', true);

class ScrollComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
             itemlist :[],
             tag:'',
             popular_products:[],
             openPanel:false,
             loader_popular:false
        }
    }


    componentDidMount=async()=>{
        await this.setState({loader_popular:true})

        await axiosInstance.get('/shop/products_popular').
        then(async response=>{
            console.log(response)
            await this.setState({loader_popular:false})
            await this.setState({popular_products:response.data.products})
        })

    }

    goToProductDetail=(product_slug)=>{
        this.props.history.push('/product/'+product_slug)
    }

    getItemViewMobileSroll=(item)=>{
        return(
            <ItemRootMob id={item.product_slug} onClick={()=>this.goToProductDetail(item.product_slug)}>
            <ItemDivMob style={{'width':'120px'}}>
                <ItemImage src={item.img} alt='prdimg'/>
                <ItemName>
                {item.product_name}
                </ItemName>
                <ItemDescription>
                {item.heading}
                </ItemDescription>
                <ItemSubtext>
                {item.subtext}
                </ItemSubtext>
                <View>View</View>
            </ItemDivMob>
            </ItemRootMob>
        )

    }


    getScrollItems=(isMobile)=>{
        let div=[]
        debugger
        this.state.popular_products && this.state.popular_products.map(product=>(div.push(this.getItemViewMobileSroll(product,isMobile))))
        return this.state.loader_popular?<Loader2/>:div

    }


    render(){
        let div=[]
        debugger
        
    return(
        <MyContext.Consumer>
        {({isMobile})=>(
        <React.Fragment>
        <Text>Popular Products</Text>

        <PaymentOptions>
            {/* <IconDiv2 gap='18px' >
                <Icon2  src={}/>
            </IconDiv2> */}
            {this.getScrollItems(isMobile)}
        </PaymentOptions>
        </React.Fragment>
            )}
        </MyContext.Consumer>
    )
    }
}


const ItemRoot = styled.div`
    display:flex;
    flex-direction:column;
    width: 260px;
    margin: 4px;

    // margin:20px;
    // padding:5px;
    // border: 2px solid #4e4e4e;

`

const ItemRootMob=styled.div`
    display:flex;
    width: 50%;
    // padding:5px;
    // border: 2px solid #4e4e4e;
`

const ItemDivMob = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    margin: 4px;
    padding: 8px;
    // border: 1px solid #7b5734;
    backgorund-color: ${props => (props.color ? props.color : '#7b5734')};
    border-radius:5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;`

const ItemDiv = styled.div`
    display:flex;
    flex-direction:column;
    margin: 4px;
    padding:8px;
    // border: 1px solid #7b5734;
    border-radius:5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

`


// background: url(${(props)=>props.imgUrl});  
const ItemImage = styled.img`
    height: 100px;
    width : 100%;
    background-size: contain;
    object-fit:contain;
`

const ItemName = styled.h5`
    display:flex;
    justify-content:center;
    margin-top:0;
    padding-top:0;
    text-size: 30px;
    height:18px;
    color:#000;
`


const ItemDescription = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    margin-top:0;
    padding-top:0;
    text-size: 20px;   
    height:40px;
    color: #4e4e4e; 
`


const ItemSubtext = styled.text`
    display:flex;
    align-items: center;
    text-size: 12px;   
    color: #4e4e4e; 
`
// const View =styled.div`
//     display:flex;
//     position:absolute; 
//     height:10px;
//     padding:3px;
//     bottom: 5px;
//     right:0;
//     float:right;
// `

const View =styled.div`
    display:flex;
    height:10px;
    padding:3px;
    bottom: 5px;
    right:0;
    float:right;
    margin-bottom:10px;
`

const Buy =styled.div`
    display:flex;
    height:10px;
    padding:3px;
    bottom: 5px;
    right:0;
    float:right;
`

const Footer = styled.div`

`
const Text= styled.text`
    font-size: 14px;
    font-family:'Montserrat', sans-serif;
    background-color:#eee;
    font-weight:1000;
    text-decoration:bold;
    text-align:left;
    margin:12px 12px 0 0px;


`

const PaymentOptions= styled.div`
    display:flex;
    flex-direction:row;
    height:auto;
    width:auto;
    overflow-y:scroll;
    margin-bottom:24px;
`
const IconDiv2=styled.div`
    display:flex;
    width: auto;
    height: auto;
    border:1px solid #eee;
    border-radius:4px;
    margin:11px 0;
    margin-left:8px;
    margin-right:${props=>props.gap?props.gap:''}

`
const ItemImage1 = styled.img`
    height: 80px;
    width : 80px;
    background-size: contain;
    object-fit:contain;
`


const Icon2 = styled.img`
    width: auto;
    height: 60px;
    padding: 5px;
`


export default withRouter(ScrollComponent)