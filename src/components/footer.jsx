import React from 'react'
import styled from 'styled-components'
import gpay from '../assets/images/payment/gpay.png'
import maestro from '../assets/images/payment/maestro.png'
import mastercard from '../assets/images/payment/mastercard.png'
import mobikwik from '../assets/images/payment/mobikwik.png'
import paytm from '../assets/images/payment/paytm.png'
import phonepe from '../assets/images/payment/phone-pe.png'
import rupay from '../assets/images/payment/rupay.png'
import visa from '../assets/images/payment/visa.png'
import cartpng from '../assets/images/cart.png'
import bestprice from '../assets/images/footer/bestprice.png'
import easyaccess from '../assets/images/footer/easyaccess.png'
import genuine from '../assets/images/footer/genuine.png'


class Footer extends React.Component{
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
                <Text1 style={{'margin':'12px 0px 8px 0px','padding':"8px",'line-height':'1.3'}}>
                Cherie is brand owned & managed by "KSTAR Foods" and all many of its products are aggregated from different Vendors. The products that belong to Cherie are freshly produced and ready to market .Cherie acts as retailer for other outsourced products and their date of expiry and quality would be entitled to their real producer.
                </Text1>

                <FeaturesDiv>
                    <Div>
                    <IconDiv>
                    <Icon src={bestprice}/>
                    </IconDiv>
                        <Description>
                            <Text1>Best Prices and Offers</Text1>
                            <Text2>Personal and Bulk Orders available . </Text2>
                        </Description>
                    </Div>
                    <Div>
                    <IconDiv>
                    <Icon src={easyaccess}/>
                    </IconDiv>
                        <Description>
                            <Text1>Wide assortment</Text1>
                            <Text2>Choose from 5000+ products in different categories on the store. </Text2>
                        </Description>
               
                    </Div>
                    <Div>
                    <IconDiv>
                    <Icon src={genuine}/>
                    </IconDiv>
                        <Description>
                            <Text1>Trusted integration with a secured payment gateway.</Text1>
                            <Text2>Secure Transaction and supports all payment modes. </Text2>
                        </Description>
                    </Div>
                </FeaturesDiv>


                <Text>PAYMENT OPTIONS</Text>
                <PaymentOptions>
                <IconDiv2 gap='18px' >
                    <Icon2 src={gpay}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2 src={maestro}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2  src={mastercard}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2  src={mobikwik}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2 src={paytm}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2 src={phonepe}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2  src={rupay}/>
                    </IconDiv2>
                    <IconDiv2 gap='18px' >
                    <Icon2  src={visa}/>
                    </IconDiv2>
                </PaymentOptions>
                
                {/* <Categories>
                    
                </Categories> */}
            </Root>
        )
    }
}

const Root=styled.div`
    display:flex;
    flex-direction:column;
    padding-top:20px;
    margin:14px;
    border-top:1px solid #eee;

`


const FeaturesDiv = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    max-width:500px;
    // background-color:#eee;
`

const Div= styled.div`
    display:flex;
    flex-direction: row;
    width:100%;
    background-color:#eee;
    margin-bottom:10px;

`
const IconDiv=styled.div`
    display:flex;
    width: 50px;
    height: 50px;
    // border:1px solid #666;
    border-radius:4px;
    margin:11px 0;
    margin-left:8px;
    margin-right:${props=>props.gap?props.gap:''}

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
const Icon = styled.img`
display:flex;
    width: 50px;
    height: auto;
    // padding: 5px;
`

const Icon2 = styled.img`
    width: auto;
    height: 60px;
    padding: 5px;
`



const Description  = styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
`

const Text1= styled.text`
    font-size: 14px;
    font-family:'Montserrat', sans-serif;
    background-color:#eee;
    font-weight:1000;
    text-decoration:bold;
    text-align:left;
    margin:12px 12px 0 12px;


`
const Text2= styled.text`
    font-size: 11px;
    font-family:'Montserrat', sans-serif;
    margin:12px 12px;
    font-weight:700;
    text-align:left;
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

export default Footer