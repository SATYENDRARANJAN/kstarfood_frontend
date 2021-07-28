import React ,{Component}from 'react'
import {axiosInstance} from './../service/axiosservice.jsx'
import * as config from './../config.json' 
import MyContext from '../globalStore/MyContext.jsx';
import { Passers } from "prop-passer";
import gmo from '../assets/images/gmo.jpeg'
import fssai from '../assets/images/fssai.png'
import veg from '../assets/images/veg.png'
import styled, { keyframes, css } from "styled-components";


import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";
class ProductDetail extends React.Component{
    constructor(){
        super();
        this.state= {
            qty:1,
            product_qty:{},
            item:{},
            addedPopUp:false
        }
    }

    getProductDetail =async (product_id)=>{
        await axiosInstance.get("/shop/products/"+product_id).
                    then(response=> 
                        {
                            console.log(response)
                            this.setState({item:response.data})   
                        }
                    )
    }

    componentDidMount= async ()=>{
        console.log(config.BASE_URL)
        let product_id = this.props.match.params.id
        let product_detail = await this.getProductDetail(product_id)

    }

    incrementQty=async()=>{
        this.setState({qty:parseInt(this.state.qty)+1})

    }
    
    decrementQty=async(item)=>{
        if ((this.state.qty-1) ===0){
            return
        }
        this.setState({qty:this.state.qty-1})
    }


    handleQtyChange=(e)=>{
        if (!Number(e.target.value)) {
            return;
        }
        this.setState({[e.target.name]:e.target.value})
    }


    addToCart=async (setAddedToCart)=>{
        // http://localhost:8000/shop/add_to_cart/
        let params ={
            product_list:{
                [this.state.item.product_id]:this.state.qty
            }
        }
        await axiosInstance.post("/shop/add_to_cart/",params).
                    then(response=> 
                        {
                            console.log(response)
                            this.setState({addedPopUp:true})
                            setAddedToCart()

                        }
                    )
        setAddedToCart()
        setTimeout(() => {this.setState({ addedPopUp: false }); }, 2000);
    }
    
    gotoBuyNow=async(openM,openCart2M)=>{
        // this.props.history.push('/address')


        localStorage.setItem('product_detail',JSON.stringify(this.state.item))
        localStorage.setItem('qty',this.state.qty)



        // let params ={
        //         [this.state.item.product_id]:this.state.qty
        // }
        
        // console.log(params)
        // await axiosInstance.post("/shop/create_order/",params).
        // then(response=> 
        //     {
        //         console.log(response.data['order_id']);
        //         this.setState({'order_id':response.data['order_id']})
        //         localStorage.setItem('order_id',response.data['order_id'])

        //     }
        // )
        if (localStorage.getItem('token')){
            openCart2M()
        }
        else{
            openM()
        }
    }

    getLaptopDisplay = (openM,openCart2M,order_id,props,ShareList,isMobile,addedToCart,setAddedToCart)=>{
        const {
            url = String(window.location),
            title = "Urbanswaad Chocolates ~ If chocolates make you happy , I can make you happier!  ",
            size = "2.5rem",
          } = props;
        return(
        <Root>
        {/* <ProductTitle>   {this.state.item.product_name}</ProductTitle> */}
        <LeftWrapperDiv>
            <ProductImage style={{'height':'320px'}} src={this.state.item.img}/>
            <ProductCareInfoDiv>
                PURITY GUARANTEED !
            </ProductCareInfoDiv>
        </LeftWrapperDiv>
    
        <RightWrapperDiv>
        <ProductName>
    {this.state.item.heading}
    </ProductName>   
        <Price>Price : {`₹`}{this.state.item.price}</Price>
        <Category>
        Bulk Order Price:  {`₹`}{parseInt(0.8 * parseInt(this.state.item.price))}
        </Category>
        <ItemDiv>
            <WrapperDiv>
                <Increment onClick={()=>{this.incrementQty()}}>+</Increment>
                <ItemQuantity value={this.state.qty} name='qty' onChange={this.handleQtyChange}></ItemQuantity>
                <Decrement onClick={()=>{this.decrementQty()}}>-</Decrement>
            </WrapperDiv>
        </ItemDiv>
        <ItemDiv style={{'backgroundColor':'#7b5734'}}>
        {localStorage.getItem('token') && <AddToCart onClick={()=>{this.addToCart(setAddedToCart)}}>Add to Cart</AddToCart>}
        <BuyNow onClick={()=>{this.gotoBuyNow(openM,openCart2M)}}> Buy Now</BuyNow>
        </ItemDiv>
        <ItemDiv>
        <ShareDiv>
            <ShareList>
        <FacebookShareButton
            quote={title}
            url = 'http://hiUrbanswaad.in.s3-website.ap-south-1.amazonaws.com/'
        >
            <FacebookIcon
            size={size}
            />
        </FacebookShareButton>

        <TwitterShareButton
            title={title}
        >
            <TwitterIcon
            size={size}
            />
        </TwitterShareButton>

        <WhatsappShareButton
            title={title}
            separator=":: "
        >
            <WhatsappIcon size={size} />
        </WhatsappShareButton>
        </ShareList>
        </ShareDiv>
        </ItemDiv>
        <Description>
            {this.state.item.description}
        </Description>
</RightWrapperDiv>

<Panel >
    <Image src={fssai}/>
    <Image src={gmo}/>
</Panel>  
{this.state.addedPopUp && <AddedPopUp show={this.state.addedPopUp} isMobile={isMobile}> Item Added </AddedPopUp>}
    </Root>
        )
    }
    
    getMobileDisplay =(openM,openCart2M,order_id,props,ShareList,isMobile,addedToCart,setAddedToCart)=>{
        const {
            url = String(window.location),
            title = "Urbanswaad Chocolates ~ If chocolates make you happy , I can make you happier!  ",
            shareImage = "https://www.steadylearner.com/static/images/brand/prop-passer.png",
            size = "2.5rem",
          } = props;
        return(
        <RootMob>
            <ImageWrapperDivMob>
                <ProductImage src={this.state.item.img}/>
                <ProductName>
                {this.state.item.heading}
                </ProductName>  
                <Description style={{'font-size':'14px','padding':'20px 0px'}}>
                    {this.state.item.description}
                </Description>
                    <Price>Price : {`₹`}{this.state.item.price}</Price>
                <Category>
                Bulk Order Price:  {`₹`}{parseInt(0.8 * parseInt(this.state.item.price))}
            </Category>
                <ItemDiv>
                    <WrapperDiv>
                        <Increment onClick={()=>{this.incrementQty()}}>+</Increment>
                        <ItemQuantity value={this.state.qty} name='qty' onChange={this.handleQtyChange}></ItemQuantity>
                        <Decrement onClick={()=>{this.decrementQty()}}>-</Decrement>
                    </WrapperDiv>
                </ItemDiv>
                <ItemDiv>
            <ShareDiv>
                <ShareList>
                <FacebookShareButton
                    quote={title}
                    url = 'http://hiUrbanswaad.in.s3-website.ap-south-1.amazonaws.com/'
                >
                    <FacebookIcon
                    size={size}
                    />
                </FacebookShareButton>

                <TwitterShareButton
                    title={title}
                >
                    <TwitterIcon
                    size={size}
                    />
                </TwitterShareButton>

                <WhatsappShareButton
                    title={title}
                    separator=":: "
                >
                    <WhatsappIcon size={size} />
                </WhatsappShareButton>
                </ShareList>
            </ShareDiv>
            </ItemDiv>
            
            </ImageWrapperDivMob>
            <StickyDiv>
                {localStorage.getItem('token') && <AddToCart onClick={()=>{this.addToCart(setAddedToCart)}}>Add to Cart</AddToCart>}
                <BuyNow onClick={()=>{this.gotoBuyNow(openM,openCart2M)}}> Buy Now</BuyNow>
            </StickyDiv>
            
            <MobPanel >
                <MobImage src={fssai}/>
                <MobImage src={gmo}/>
            </MobPanel>  
            {this.state.addedPopUp && <AddedPopUp show={this.state.addedPopUp} isMobile={isMobile}> Item Added </AddedPopUp>}
        </RootMob>)
    }

    render(){
        const {
            url = String(window.location),
            title = "Urbanswaad Chocolates ~ If chocolates make you happy , I can make you happier!  ",
            shareImage = "https://www.steadylearner.com/static/images/brand/prop-passer.png",
            size = "2.5rem",
          } = this.props;
          const ShareList = Passers({
            url,
            className: "network__share-button",
          })({
            className: "network cursor-pointer hover transition--default",
            title: `Share ${String(window.location)}`,
          })("li");
        return(
            <MyContext.Consumer>
                {({openM,openCart2M,order_id,isMobile,addedToCart,setAddedToCart})=>(
                    <React.Fragment>
                        {!isMobile ? this.getLaptopDisplay(openM,openCart2M,order_id,this.props,ShareList,isMobile,addedToCart,setAddedToCart):this.getMobileDisplay(openM,openCart2M,order_id,this.props,ShareList,isMobile,addedToCart,setAddedToCart)}
                   
                    </React.Fragment>
                )}
            </MyContext.Consumer>)
    }


}

export default (ProductDetail);


const Root =  styled.div`
    display:flex;
    flex-direction: row;
    // width : 100%;
    height: 100%;
    padding: 30px;
`

const RootMob =  styled.div`
    display:flex;
    flex-direction: column;
    // width : 100%;
    height: 100%;
    padding: 0 10px;
    overflow:auto;
    margin-bottom:100px;


`
const ProductDescription= styled.div`
    display: flex;
    flex-direction: column;
    
`
const ProductTitle = styled.h2`
    color :#404040;
`
const LeftWrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-right:20px;
`
const ImageWrapperDivMob = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ProductImage = styled.img`
    display: flex;
    width: 100%;
    height: 150px;
    object-fit: cover;
    align-items:flex-start;
    justify-content:flex-start;


`
const ProductCareInfoDiv = styled.text`
    display: flex;
    margin-top:16px;
    font-size:20px;
    font-weight: bold;
    text-decoration: underline overline;
    justify-content:center;
    letter-spacing: 2px;
    text-underline-offset:6px;
    background-color:#ffe6cc;
    

`
const RightWrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    // align-items:flex-start;
    width: 50%;
`
const ProductName=styled.text`
    font-size:24px; 
    margin:4px 0 20px 0;
    font-family:'Montserrat', sans-serif;
    font-weight:bold;
    text-decoration: underline overline;
    letter-spacing: 2px;
    text-underline-offset:6px;

    // font-weight:20;
`
const Category = styled.text`
    font-size:16px;
`

const SubCategory = styled.h1``

const Price =styled.text`
    font-size : 20px;
    font-weight:bold;
`

const AddToCart= styled.button`
    width:200px;
    padding:10px;
    background-color:#ffe6cc;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;
    margin-right:20px;

`
const BuyNow= styled.button`
    width:200px;
    padding:10px;
    background-color:#ffe6cc;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;

`
const Description = styled.text`
    padding:10px 30px ;
    font-size :20px;
    // text-decoration: underline ;
    letter-spacing: 2px;
    line-height:1.5;
    // text-underline-offset:6px;
`
const ItemDiv=styled.div`
    display:flex;
    flex-direction:row;
    // width:100%;
    align-items:center;
    justify-content:center;
    margin:4px 0 ;
    padding:5px;
`
const WrapperDiv = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;

`

const ItemQuantity = styled.input`
    width:36px;
    height:50px;
    border:0px;
    text-align:center;
    font-size:16px;
    font-weight:bold;
    border:0.5px solid #7b5734;
`
const Increment=styled.button`
    background-color:#ffe6cc;
    border-radius:2px;
    height:40px;
    border:0px;
    padding:10px;
    font-size:16px;
    font-weight:bold;
`

const Decrement=styled.button`
    background-color:#ffe6cc;
    border-radius:2px;
    height:40px;
    border:0px;
    padding:10px;
    font-size:16px;
    font-weight:bold;
`

const Line =styled.div`
    width:100%;
    height:1px;
    margin:30px;
    background-color:#7b5734;
`

const ShareDiv = styled.div`
    display:flex;
    flex-direction:row;
    height:36px;
`

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
`

const MobPanel = styled.div`
    display: flex;
    flex-direction: row;
`

const Image= styled.img`
    display:flex;
    width:100%;
    object-fit:cover;

`
const MobImage= styled.img`
    display:flex;
    width:50%;
    margin-top:12px;
    object-fit:contain;

`

const ProductDescriptionMob =styled.div`
    display:flex;
    flex-direction:column;
    padding:16px;
`

const StickyDiv= styled.div`
    display:flex;
    flex-direction:row;
    position:fixed;
    bottom:0;
    right:24px;
    left:24px;
    background-color:#7b5734;
    padding:10px 30px;
    margin-bottom: 5px;
    border-radius:5px;
    justify-content:center;

`

const example = keyframes`
    0% {  opacity :1}
    25% {opacity :0.75}
    50% {opacity:0.5}
    75% {opacity:0.25}
    100% {opacity:0}
`
const styles = css`
  background-color: pink;
  animation: ${example} 0.3s linear 3;
`;
const AddedPopUp = styled.div`

    width:${props=>props.isMobile?'200px':'300px'};
    height:${props=>props.isMobile?'100px':'300px'};
    background-color:#ffe6cc;
    z-index:99;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%, -50%);
    border: 2px solid #7b5734;
    border-radius:25px;
    font-size:30px;
    font-family:'Montserrat', sans-serif;

    position: fixed;
    animation:${props=>(props.show ? styles :'')} ;
    animation-duration: 2.1s;
    animation-iteration-count: 1;
    // // animation-direction: alternate-reverse;

`

