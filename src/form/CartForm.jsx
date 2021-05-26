import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MyContext from '../globalStore/MyContext';
import placeholder from '../assets/images/placeholder.png'
import {axiosInstance} from './../service/axiosservice.jsx'
import rightarrow from '../assets/images/right-arrow.png'
import Loader from '../components/Loader.jsx'
import { withRouter } from 'react-router'

class CartForm extends React.Component{
    constructor(props){
        super(props)
        this.myRef = React.createRef()

        this.state={          
            product_qty:{},
            amount:0,
            total:0,
            tax:0,
            show_checkout_sticky:false,
            cartlist:[],
            loader:false
        }
    }


    listenScrollEvent = e => {
        // console.log(e)
        const offset=e.target.scrollTop;
        debugger
        // console.log("this is here" + offset)

        if (offset >100) { 
            this.setState({show_checkout_sticky:true})
         }
         if (offset <100) { 
            this.setState({show_checkout_sticky:false})
         }
    }

    componentDidMount = async()=>{
        document.getElementById("whatsapp_chat_widget").style.display="none"
        window.addEventListener('scroll', this.listenScrollEvent,true)
        await this.setState({loader:true})
        const itemsList = await  axiosInstance.get("/shop/get_cart_details/").
        then(async(response)=> 
            {
                console.log(response.data)
                await this.setState({cartlist:response.data})
                await this.setState({loader:false})

            }
        )



        for( var item of   this.state.cartlist){
            // this.setState({ product_qty:{[`${item.product.product_id}`]:`${item.quantity}`}})
            await  this.setState({product_qty:{...this.state.product_qty,[`${item.product.product_id}`]: ((parseInt(`${item.quantity}`)))}})

        }

    }

    componentWillUnmount=async()=>{
        window.removeEventListener('scroll', this.listenScrollEvent);

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
            <WrapperRow>
                <Row>
                <ItemDiv style={{'width':'35%','padding':'4px'}}>
                        <ItemPic src={item.product.img}></ItemPic>
                </ItemDiv>
                <ItemDiv style={{}}>
                    <ItemName isMobile={isMobile}>{item.product.product_name}</ItemName>
                    <br/>
                    <ItemPrice isMobile={isMobile}> ₹<ItemPriceNum isMobile={isMobile}>{item.product.price}</ItemPriceNum></ItemPrice>
                    <ItemPrice isMobile={isMobile} style={{'padding-top':'5px'}}> Total Price :  ₹{item.product.price * parseInt(this.state.product_qty[`${item.product.product_id}`])}</ItemPrice>
                </ItemDiv>
               
            </Row>

             <ItemDiv style={{ 'flex-direction':'row','justifyContent':'space-between','padding':'3px','margin':'3px','border-radius':'5px'}}>
             <ItemDiv style={{ 'flex-direction':'row',}}>

                <Increment  onClick={()=>this.onIncrementItem(item)}>+</Increment>
                <ItemQuantity><p style={{'marginTop':'7px'}}>{this.state.product_qty[`${item.product.product_id}`] }</p></ItemQuantity>
                <Decrement  onClick={()=>this.onDecrementItem(item)}>-</Decrement>
            </ItemDiv>
            <Remove onClick={()=>this.removeItemFromCart(item.product.product_id)}>Remove</Remove>

            </ItemDiv>

            
            </WrapperRow>
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

        return '₹'+ (this.getTotal() + this.getTax()) 
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
        return this.state.loader?<Loader/>:div
    }

    render(){
        return(
            <MyContext.Consumer>
                {({jwt,setJwt,closeCartM,openAddress,isMobile})=>(
                    <Root>
                        <CartWrapper>
                           {/* {this.state.cartlist && this.state.cartlist.map((item)=>{this.printRows(item)})} */}
                           <MobileHeader>
                                <Heading>
                                My Cart
                                </Heading>
                                <IconsDiv>

                                </IconsDiv>
                            </MobileHeader>
                            <FirstRow isMobile={isMobile} style={{'display':'flex','flexDirection':'column'}}>
                                <TotalPriceTitle>
                                    <div style={{'fontSize':'14px' ,'letterSpacing':'1.2px'}}>Total</div> 
                                    <div style={{'fontSize':'14px' ,'letterSpacing':'1.2px'}}>₹{this.getTotal()}</div> 
                                </TotalPriceTitle>
                                <TotalPriceTitle>
                                    <div style={{'font-size':'14px' ,'letter-spacing':'1.2px'}}>Tax</div> 
                                    <div style={{'font-size':'14px' ,'letter-spacing':'1.2px'}}>₹{this.getTax()}</div>     
                                </TotalPriceTitle>
                                <br/>
                                <TotalPriceTitle>
                                    <div style={{'font-size':'18px' ,'letter-spacing':'1.2px' ,'line-height':1.1}}>Payable Amount</div> 
                                    <div style={{'font-size':'18px' ,'font-weight':'900','letter-spacing':'1.2px','line-height':1.1}}>{this.getPayableAmount()}</div> 
                                </TotalPriceTitle>
                                <ButtonDiv>
                                <BuyNowTop onClick={()=>this.buyNow(closeCartM,openAddress)}>Proceed to Checkout</BuyNowTop>
                                {/* <IconsDiv>
                                <ItemPriceNum style={{'font-weight':'600'}}>{this.getPayableAmount()}</ItemPriceNum>
                                <Icon src={rightarrow}/>
                                </IconsDiv> */}
                                </ButtonDiv>
                            
                            </FirstRow>
                            {this.getCartItems(isMobile)}
                            <Line/>
                        </CartWrapper>
                        {this.state.show_checkout_sticky && <LastRow>
                        <BuyNow onClick={()=>this.buyNow(closeCartM,openAddress)}>
                            <p>Proceed to Checkout</p>
                        
                        <IconsDiv>
                        <ItemPriceNum style={{'font-weight':'600'}}>{this.getPayableAmount()}</ItemPriceNum>
                        <Icon src={rightarrow}/>
                        </IconsDiv>
                        </BuyNow>
                        
                        </LastRow>}
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
    // margin-bottom:170px;
    // background-color: rgb(77, 53, 29,0.4);
`

const CartWrapper=styled.div`
    display:flex;
    flex-direction:column;
    // width:100%;
    height:auto;
    margin:40px 14px;
    margin-bottom:0px;
    // background-color:#4e4e4e;
    padding-top:10px;
    
`

const WrapperRow = styled.div`
background-color: linear-gradient(to top,#fff  0%, #ffe6cc 100%); 
background: -webkit-gradient(to top,#fff  0%, #ffe6cc 100%);  /* Chrome, Safari4+ */
background: -webkit-linear-gradient(to top,#fff  0%, #ffe6cc 100%);  /* Chrome10+, Safari5.1+ */
background: -moz-linear-gradient(to top,#fff  0%, #ffe6cc 100%);     /* FF3.6+ */
background: linear-gradient(to top,#fff  0%, #ffe6cc 100%);      /* W3C */
// opacity:0.9;
// background-color: rgb(255, 230, 204,0.9);//rgb(160, 87, 52,0.9);
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    border:2px solid #7b5734;
    background-color:#ffe6cc;
    border-radius:5px;
    margin-bottom:5px;
    border-color:#d5d9d9;
    border-style:solid;
    border-width:0.1rem;
    border-radius:0.8rem;
    box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5);
`

const Row= styled.div`
    display:flex;
    flex-direction:row;
    height:auto;
    padding:5px;
`

const ItemPic=styled.img`
    display:flex;
    width:100px;
    height:100px;
`
const ItemDiv=styled.div`
    display:flex;
    flex-direction:column;
`


const ItemName = styled.text`
    display:flex;
    font-size:${props=>props.isMobile?'15px':'16px'};
    text-align:center;
    line-height:1.35 !important;
    font-weight: 700;
    text-align:left;
    margin-left:10px;

`
const ItemPrice = styled.text`
    text-decoration:bold;
    font-size:${props=>props.isMobile?'15px':'16px'};
    font-weight:400;
    text-align:left;
    margin-left:10px

`
const ItemPriceNum = styled.text`
    text-decoration:bold;
    // font-size:${props=>props.isMobile?'20px':'25px'};
    font-weight:900;
    margin-right:20px
`

const ImageDiv=styled.div`
    width:100%;
    height:100%;
    margin:4px;
`

const ItemQuantity = styled.div`
    height:35.33px;
    width:33px;
    background-color:#fff;
    border-color:#d5d9d9;
    border-width:0.1rem;
    box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5);
`
    
const Increment=styled.button`
    height:35.33px;
    width:33px;
    border-color:#d5d9d9;
    border-style:solid;
    border-width:0.1rem;
    border-radius:0.3rem;

    box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5)
`
const Decrement=styled.button`
    height:35.33px;
    width:33px;
    border-color:#d5d9d9;
    border-style:solid;
    border-width:0.1rem;
    border-radius:0.3rem;
    box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5)
`
const Remove=styled.button`
    display:flex;
    margin:4px;
    background:#fff;
    border-color:#d5d9d9;
    border-style:solid;
    border-width:0.1rem;
    border-radius:0.8rem;
    box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5);
    text-align:center;
    align-items:center;
`


const Line =styled.div`
display:flex;
    height:1px;
    margin:30px;
    background-color:#ffffff;
`

const LastRow = styled.div`
    display:flex;
    width: 100%;
    // height: 60px;
    background-color:#ffe6cc;
    // width:300px;
    // align-items:center;
    // padding:12px;
    margin-right:14px;
    position:fixed;
    bottom:0px;
    padding:10px 30px;
    // border:2px solid #7b5734;
    border-radius:5px;
    max-width:${props=>props.is_mobile?'100%':'500px'};
    align-self:center;

//     background-color: linear-gradient(to bottom,#fff  0%, #ffe6cc 200%); 
//     background: -webkit-gradient(to bottom,#fff  0%, #ffe6cc 200%);  /* Chrome, Safari4+ */
// background: -webkit-linear-gradient(to bottom,#fff  0%, #ffe6cc 200%);  /* Chrome10+, Safari5.1+ */
// background: -moz-linear-gradient(to bottom,#fff  0%, #ffe6cc 300%);     /* FF3.6+ */
// background: linear-gradient(to bottom,#fff  0%, #ffe6cc 200%);      /* W3C */
// border-color:#d5d9d9;
//     border-width:0.3rem;
//     box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5);
background-color:#fff;


`


const FirstRow = styled.div`
    display:flex;
    width: 100%;
    // height: 60px;
    background-color:#ffe6cc;
    // width:300px;
    // align-items:center;
    // padding:12px;
    // position:fixed;
    bottom:16px;
    padding:14px ;
    // border:2px solid #7b5734;
    border-radius:5px;
    max-width:${props=>props.is_mobile?'100%':'500px'};
    align-self:center;
    // justify:content:center;
    background-color: linear-gradient(to bottom,#fff  0%, #ffe6cc 200%); 
    background: -webkit-gradient(to bottom,#fff  0%, #ffe6cc 200%);  /* Chrome, Safari4+ */
    background: -webkit-linear-gradient(to bottom,#fff  0%, #ffe6cc 200%);  /* Chrome10+, Safari5.1+ */
    background: -moz-linear-gradient(to bottom,#fff  0%, #ffe6cc 300%);     /* FF3.6+ */
    background: linear-gradient(to bottom,#fff  0%, #ffe6cc 200%);      /* W3C */
    border-color:#d5d9d9;
    // border-width:0.3rem;
    // box-shadow:0 0.2rem 0.5rem rgb(213,217,217,0.5);
    margin-bottom:10px;
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
    color:#7b5734;
    border: 2px #ffe6cc solid ;
    padding: 4px 15px ;
    border-radius:5px;
    margin-bottom:6px;
`

const BuyNow= styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    padding:0px 10px;
    margin-left:14px;
    background-color:#7b5734;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;
    align-self: center;
    // margin-top:10px;
    justify-content:space-between;

    color:#ffe6cc;
`


const BuyNowTop= styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    padding:10px 0px;
    margin-left:14px;
    background-color:#7b5734;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;
    align-self: center;
    // margin-top:10px;
    justify-content:center;

    color:#ffe6cc;
`


const MobileHeader =styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  margin:0 0px ;
  position:fixed;
  top:0;
  left:0;
  right:0;
  background:#fff;
  height:46px;
  align-items:center;
`
const Heading=styled.text`
  font-size : 20px;
  color:#c0a680;
  font-family:'Montserrat', sans-serif;
  font-weight:900;
  letter-spacing:1.4px;

`
const IconsDiv  =styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    background-color:#7b5734;
    color:#fff;
    font-size:16px;
    font-weight:bold;
`
const Icon=styled.img`
    display:flex;
    width:20px;
    height:20px;
    // padding-top:6px;
`

const ButtonDiv=styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    background-color:#7b5734;
    margin-top:10px;
    justify-content:space-between;
`

export default withRouter(CartForm)