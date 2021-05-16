import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MyContext from '../globalStore/MyContext';
import placeholder from '../assets/images/placeholder.png'
import {axiosInstance} from './../service/axiosservice.jsx'
import { withRouter } from 'react-router'

class CartForm extends React.Component{
    constructor(props){
        super(props)
        this.state={          
            product_qty:{},
            amount:0,
            total:0,
            tax:0,
            cartlist:[]
        }
    }

    componentDidMount = async()=>{
        
        const itemsList = await  axiosInstance.get("/shop/get_cart_details/").
        then(response=> 
            {
                console.log(response.data)
                this.setState({cartlist:response.data})

            }
        )

        for( var item of   this.state.cartlist){
            // this.setState({ product_qty:{[`${item.product.product_id}`]:`${item.quantity}`}})
            await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: ((parseInt(`${item.quantity}`)))}})

        }

    }

    removeItemFromCart=(key)=>{
        debugger
        let params={
            "product_id":key
        }
        const itemsList =  axiosInstance.post("/shop/remove_item_from_cart/",params).
        then(response=> 
            {
                console.log(response.data)
                this.setState({cartlist:response.data})

            }
        )
    }


    onIncrementItem=async (item)=>{
        await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: (parseInt(this.state.product_qty[`${item.product.product_id}`])+1)}})
    }

    onDecrementItem=async(item)=>{
        if (((this.state.product_qty[`${item.product.product_id}`])-1)==0){
            return
        }
        await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: (parseInt(this.state.product_qty[`${item.product.product_id}`])-1)}})
    }




    printRows=(item,isMobile)=>{
        return(
                <Row>
                <ItemDiv style={{'width':'25%','padding':'4px'}}>
                        <ItemPic src={item.product.img}></ItemPic>
                </ItemDiv>
                <ItemDiv style={{'width':'50%'}}>
                    <ItemName isMobile={isMobile}>{item.product.product_name}</ItemName>
                    <br/>
                    <ItemPrice isMobile={isMobile}>Price per piece:{item.product.price}</ItemPrice>
                    <ItemPrice isMobile={isMobile}> Total Price:{item.product.price * parseInt(this.state.product_qty[`${item.product.product_id}`])}</ItemPrice>
                </ItemDiv>
                <ItemDiv style={{'width':'25%','backgroundColor':'rgb(77,53,29,0.4)','padding':'3px','border-radius':'5px'}}>
                        <Increment  onClick={()=>this.onIncrementItem(item)}>+</Increment>
                        <ItemQuantity>{this.state.product_qty[`${item.product.product_id}`] }</ItemQuantity>
                        <Decrement  onClick={()=>this.onDecrementItem(item)}>-</Decrement>
                        <Remove onClick={()=>this.removeItemFromCart(item.product.product_id)}>Remove</Remove>
                </ItemDiv>
            </Row>
        )
    }
  

    getTotal=(that)=>{
        var amount=0
        for (var item of this.state.cartlist){
            amount += item.product.price * this.state.product_qty[`${item.product.product_id}`]
        }
        // thats.setState({amount})
        return amount
    }

    getTax=(that)=>{
        var tax =0;
        tax =Math.ceil(0.18 * parseInt(this.getTotal()))
        // that.setState({tax})
        return tax
    }
    
    getDiscount=()=>{}

    getPayableAmount=()=>{

        return '₹ '+ (this.getTotal() + this.getTax()) 
    }

    removeItem=()=>{

    }

    buyNow=async(closeCartM,openAddress)=>{
        //create order for selected products in cart
        let params ={
            ...this.state.product_qty

            }
        
        console.log(params)
        await axiosInstance.post("/shop/create_order/",params).
        then(response=> 
            {
                console.log(response.data['order_id']);
                this.setState({'order_id':response.data['order_id']})

            }
        )

         
        // closeCartM(s); 
        openAddress(this.state.order_id);
  
    }

    getCartItems=(isMobile)=>{
        let div=[]
        this.state.cartlist && this.state.cartlist.map((item)=>{div.push(this.printRows(item,isMobile))})
        return div
    }

    render(){
      
        return(
            <MyContext.Consumer>
                {({jwt,setJwt,closeCartM,openAddress,isMobile})=>(
                    <Root>
                        <CartWrapper>
                           {/* {this.state.cartlist && this.state.cartlist.map((item)=>{this.printRows(item)})} */}
                           <Title> Your Cart </Title>

                            {this.getCartItems(isMobile)}
                            <Line/>
                            <LastRow isMobile={isMobile} style={{'display':'flex','flexDirection':'column'}}>
                                <TotalPriceTitle>
                                    <div style={{'font-size':'14px' ,'letter-spacing':'1.2px'}}>Total</div> 
                                    <div style={{'font-size':'14px' ,'letter-spacing':'1.2px'}}>{this.getTotal()}</div> 
                                </TotalPriceTitle>
                                <TotalPriceTitle>
                                    <div style={{'font-size':'14px' ,'letter-spacing':'1.2px'}}>Tax</div> 
                                    <div style={{'font-size':'14px' ,'letter-spacing':'1.2px'}}>{this.getTax()}</div>     
                                </TotalPriceTitle>
                                <br/>
                                <TotalPriceTitle>
                                    <div style={{'font-size':'18px' ,'letter-spacing':'1.2px' ,'line-height':1.1}}>Payable Amount</div> 
                                    <div style={{'font-size':'18px' ,'letter-spacing':'1.2px','line-height':1.1}}>{this.getPayableAmount()}</div> 
                                </TotalPriceTitle>
                                <BuyNow onClick={()=>this.buyNow(closeCartM,openAddress)}>Buy Now</BuyNow>
                            </LastRow>

                        </CartWrapper>

                    </Root>
                )}
            </MyContext.Consumer>

        )
    }

}

const Root =styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100vh;
    max-width:500px;
    align-self:center;
    // background-color:#4e4e4e;
    overflow-y:scroll;
    margin-bottom:170px;
    background-color: rgb(77, 53, 29,0.4);
`

const CartWrapper=styled.div`
    display:flex;
    flex-direction:column;
    // width:100%;
    height:auto;
    margin:40px;
    margin-bottom:0px;
    // background-color:#4e4e4e;

`

const Row= styled.div`
    display:flex;
    flex-direction:row;
    height:100px;
    margin-bottom:5px;
    border:2px solid #7b5734;
    background-color:#ffe6cc;
    border-radius:5px;
    padding:5px;
`

const ItemPic=styled.img`
    display:flex;
    // width:100%;
    height:100%;
`
const ItemDiv=styled.div`
    display:flex;
    flex-direction:column;
`


const ItemName = styled.text`
    font-size:${props=>props.isMobile?'12px':'16px'};
    text-align:center;
`
const ItemPrice = styled.text`
    text-decoration:bold;
    font-size:${props=>props.isMobile?'14px':'16px'};

`

const ImageDiv=styled.div`
    width:100%;
    height:100%;
    margin:4px;
`

const ItemQuantity = styled.text`

`
const Increment=styled.button``
const Decrement=styled.button`
`
const Remove=styled.button`
display:flex;

    margin-top:10px;
`
const Line =styled.div`
display:flex;
    height:1px;
    margin:30px;
    background-color:#ffffff;
`

const LastRow = styled.div`
    display:flex;
    // width: 100%;
    // height: 60px;
    background-color:#ffe6cc;
    width:300px;
    // align-items:center;
    padding:12px;
    position:fixed;
    bottom:16px;
    padding:10px 30px;
    border:2px solid #7b5734;
    border-radius:5px;
    max-width:${props=>props.is_mobile?'100%':'500px'};
    align-self:center;
    // justify:content:center;

`
const TotalPriceTitle = styled.text`
    display:flex;
    font-size:16px;
    text-decoration:bold;
    margin-bottom: 4px;
    justify-content:space-between;
    
`


const Title= styled.text`
    display:flex;
    font-size:18px;
    text-decoration:bold;
    align-self:center;
    color:#ffe6cc;
    border: 2px #ffe6cc solid ;
    padding: 4px 15px ;
    border-radius:5px;
    margin-bottom:6px;
`

const BuyNow= styled.button`
    width:200px;
    padding:10px;
    background-color:#7b5734;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;
    align-self: center;
    margin-top:10px;
    color:#ffe6cc;


`
export default withRouter(CartForm)