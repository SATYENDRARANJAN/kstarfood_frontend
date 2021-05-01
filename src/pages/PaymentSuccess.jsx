import React from 'react'
import styled from 'styled-components'
class PaymentSuccess extends React.Component{


    componentDidMount=()=>{
        
    }
    render(){
        return(
            <Root>
                <Success>
                    Thank you for joining the Cherie Family!!
                    <br/>
                    Your Cherie  will be delivered very soon . 
                    <br/>
                    <br/>
                    <WrapperDiv>

                    <div style ={{'width':'300px','line-height':'1.4',    'border-bottom':'1px solid black'
}}> <i>Your payment details are :</i></div>
                    <br/>
                    <br/>
                    <BoxDiv style={{'width':'100%'}} >
                        <ItemLeft style={{'font-weight':'400','text-decoration':'bold'}}>
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
                    </WrapperDiv>
                </Success>
            </Root>
        )
    }
}

const Root = styled.div`
    display: flex;
    // height:100vh;
    border : 1px solid #4e4e4e;
    border-radius:9px;
    padding:10px 20px 100px 20px;
    
`

const Success = styled.text`
display:flex;
flex-direction:column;
    font-size:18px;
    font-family:Roboto;
    line-height:1.2;
    letter-spacing:1.1px;
    // max-width:500px;;
    width:100%;
    padding:10px;
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
    margin-bottom:26px;
    font-size:14px;


`

const ItemRight=styled.div`
    display:flex;
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

export default PaymentSuccess