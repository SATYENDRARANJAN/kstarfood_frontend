import React from 'react'
import styled from 'styled-components'
import orderconfirm from '../assets/images/orderconfirm.png'
import emailreceipt from '../assets/images/mailreceipt.png'

class PaymentSuccess extends React.Component{


    componentDidMount=()=>{
        
    }


    redirectHome=()=>{
        this.props.history.replace("/")
        // window.history.replaceState(null, null, "/");

    }
    render(){
        return(
            <Root>
                <IconsDiv>
                    <Icon src={orderconfirm}/>
                </IconsDiv>
                <Title>
                    Order Completed
                </Title>
                <Success> 
                    {/* Thank you for joining the Cherie Family!!
                    <br/>
                    Your Cherie  will be delivered very soon . 
                    <br/>
                    <br/> */}
                    <WrapperDiv>

                    <div style ={{'width':'300px','fontWeight':'600','lineHeight':'2.7',"fontFamily":"Montserrat, sans-serif"}}>
                                    Your payment details are :
                    </div>
                    <BoxDiv style={{'width':'100%'}} >
                        <ItemLeft>
                            Payment Id: 
                        </ItemLeft>
                        <ItemRight>
                            {localStorage.getItem('payment_id')}
                        </ItemRight>
                    </BoxDiv>
                    <BoxDiv style={{'width':'100%'}}>
                        <ItemLeft>
                            Order Id :
                        </ItemLeft>
                        <ItemRight>
                            {localStorage.getItem('rporder_id')}
                        </ItemRight>
                    </BoxDiv>
                    <IconsDiv style={{"margin-top":"20px"}}>
                        <Icon src={emailreceipt} style={{"width":"50px",'height':'50px'}}/>
                    </IconsDiv>
                    <div style ={{'width':'300px','font-weight':'600','font-size':'13px','lineHeight':'1.1',"fontFamily":"Montserrat, sans-serif"}}>
                        An email receipt including the details about your order has been sent to the email address provided. 
                        Please keep it for your records.                     
                    </div>
                    <div style ={{'width':'300px','font-weight':'600','font-size':'13px','lineHeight':'1.1',"fontFamily":"Montserrat, sans-serif"}}>
                    
                    <br/>       
                    Thank you for joining the Cherie Family!!
                    <br/>
                    Your Cherie  will be delivered very soon . 
                    <br/>
                    <br/>  
                    <RedirectBtn onClick={()=>this.redirectHome()}>CONTINUE SHOPPING</RedirectBtn>
         
                    </div>
                    
                    </WrapperDiv>
                </Success>
            </Root>
        )
    }
}

const Root = styled.div`
    display: flex;
    flex-direction:column;
    // height:100vh;
    border : 1px solid #4e4e4e;
    border-radius:9px;
    padding:30px 20px 100px 20px;
    
`

const Success = styled.text`
    display:flex;
    flex-direction:column;
    font-size:18px;
    font-family:'Montserrat', sans-serif;
    line-height:1.2;
    letter-spacing:1.1px;
    // max-width:500px;;
    width:100%;
    // padding:10px;
    outline:None;
    text-decoration:bold;
`

const BoxDiv=styled.div`
    display:flex;
    flex-direction:row;
    align-self:center;
    justify-self:center;
    // border:1px solid #7b5734;
`
const ItemLeft=styled.div`
    display:flex;
    font-family:'Montserrat', sans-serif;
    // border-bottom:1px solid #75e834;
    width:40%;
    border-radius:6px;
    line-height:1.2;
    letter-spacing:1.1px;
    font-style:Roboto;
    // width:100%;
    // padding:20px 0;
    // padding-left:10px;
    // padding-right:10px;
    outline:None;
    text-decoration:bold;
    margin-bottom:5px;
    font-size:14px;


`

const ItemRight=styled.div`
    display:flex;
    font-family:'Montserrat', sans-serif;
    // border:1px solid #75e834;
    width:60%;
    border-radius:6px;
    line-height:1.2;
    letter-spacing:1.1px;
    font-style:Roboto;
    // width:100%;
    outline:None;
    // padding:20px 0;
    // padding-left:10px;
    // padding-right:10px;
    font-size:14px;
    text-decoration:bold;
`

const WrapperDiv = styled.div`
display:flex;
flex-direction:column;
max-width:500px;
// justify-content:center;
align-self:center;
`
const IconsDiv  =styled.div`
    display:flex;
    flex-direction:row;
    width:auto;
    align-items:center;
    // background-color:#7b5734;
    color:#fff;
    font-size:16px;
    font-weight:bold;
    justify-content:center;
`
const Icon=styled.img`
    display:flex;
    width:60px;
    height:60px;
    // padding-top:6px;
`
const Title=styled.text`
    font-family:'Montserrat', sans-serif;
    font-size:30px;
    font-weight:900;
    color:#4e4e4e;
    line-height:1.7;
    // letter-spacing:1.2px;

`

const RedirectBtn= styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    padding:10px 0px;
    // margin-left:14px;
    background-color:#7b5734;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;
    align-self: center;
    // margin-top:10px;
    justify-content:center;
    font-family:'Montserrat', sans-serif;
    font-size:20px;

    color:#ffe6cc;
`




export default PaymentSuccess