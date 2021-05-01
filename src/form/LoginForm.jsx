import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import * as config from './../config.json' 
import Service from '../service/service'
import OtpInput from 'react-otp-input';
import MyContext from '../globalStore/MyContext';

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            phone:'',
            show_OTP:false,
            otp_sent:false,
            confirm_otp_error:"",
            otp:'',
            previous_10_digit_ph:''

        }
    }

    componentDidMount=()=>{
        
    } 

    handlePhoneChange=(e)=>{
        this.setState({sent_otp_error:""})
        this.setState({otp:''})
        this.setState({confirm_otp_error:''})
        this.setState({show_OTP:false})
        debugger
        if (!Number(e.target.value)) {
            return;
        }
        if ((e.target.value).toString().length >10)
        {return}
        else if ((e.target.value).toString().length ==10){
            this.setState({previous_10_digit_ph:e.target.value})
        }

        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.phone)
        console.log(this.state.otp)
      }

    sendOTP =(e)=>{
        // e.preventDefault()
        if ((this.state.phone).length>10){
            return
        }
        if ((this.state.phone).length==10){
            let params={
                'phone':this.state.phone
            }
            let headers = { headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            }

            axios.post(config.BASE_URL + `/users/login/`,  params )
            .then(res => {
            console.log(res);
            console.log(res.data);
            try{

                if (res.data.user_id != null || res.data.user_id !=undefined ){
                    localStorage.setItem('user_id',res.data.user_id) 
                    this.setState({show_OTP:true})

                }
                else{
                }
            }catch(error){

            }
            
            //   if 
            })
        }
        else{
            this.setState({sent_otp_error:"Please enter 10 digits!"})
        }
    }

    confirmOTP =async(jwt,setJwt,closeM)=>{
        console.log(jwt)

        let params={
            'user_id':localStorage.getItem('user_id'),
            'otp':this.state.otp
        }
        try{

        await axios.post(config.BASE_URL + `/users/verify/`,  params )
        .then(res => {
            debugger
            console.log("**************************************************   Response:",res)
                if (res.data.error){
                    this.setState({confirm_otp_error:"Enter correct OTP !!"})
                }
                else if(res.data.token){
                    localStorage.setItem('token','Bearer ' + res.data.token)
                    setJwt(res.data.token)
                    closeM()
                }
                else{
                    this.setState({confirm_otp_error:"Enter correct OTP !!"})
                }
        })
        }catch(e){
            this.setState({confirm_otp_error:"Enter correct OTP !!"})
        }
    }

    getTitle =()=>{
        let title = localStorage.getItem('product_detail') ? 'Please Login and buy!' : 'Please Login !'
        return title
    }

    render(){
        return(
            <MyContext.Consumer>
                {({jwt,setJwt,closeM})=>(
                    <Root>
                        {console.log("printing jwt: " + jwt +" "+setJwt)}

                        <Title style={{'text-decoration':'underline overline','text-underline-offset':'6px','letter-spacing':'2.4px','align-self':'center'}}>Welcome to Cherie!</Title>
                        <Title style={{'font-size':'20px','align-self':'center'}}>{this.getTitle()}</Title>

                        <Phone type="char" value={this.state.phone} name='phone' placeholder='Enter Phone no.' onChange={this.handlePhoneChange}></Phone>
                        {!this.state.show_OTP && <SendOTP  onClick={this.sendOTP}>Send OTP</SendOTP>}
                        {/* {this.state.show_OTP &&<OTP  placeholder='Enter OTP'  type='number' name='otp' onChange={this.handleChange}/>} */}
                        {this.state.show_OTP && 
                        <OtpWrapper>
                        <OtpInput
                            value={this.state.otp}
                            onChange={otp => this.setState({otp})}
                            isInputNum={false}
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={{width:'30px',height:'30px','border':'0','border-bottom':'5px solid #7b5734'}}
                        />
                        </OtpWrapper>
                        }
                        {this.state.sent_otp_error && <Error>{this.state.sent_otp_error}</Error>}
                        {this.state.show_OTP && <ConfirmOTP onClick={()=>this.confirmOTP(jwt,setJwt,closeM)}>Confirm OTP</ConfirmOTP>}
                        {this.state.confirm_otp_error && <Error>{this.state.confirm_otp_error}</Error>}

                    </Root>
                )}
            </MyContext.Consumer>
        )
    }
}

const Root =styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    //opacity:0.9;
    
    // background-color: rgb(255, 230, 204);//rgb(123, 87, 52,0.9);

    color: ${props => (props.color ? props.color : '#7b5734')};
    backgorund-color: ${props => (props.color ? props.color : '#7b5734')};
    text-align: left;
    font-size:${props => (props.width >565? "50px":"16px")};
    max-width:${props =>(props.width >565?"auto":"auto")};
    margin-top:45px;
    margin-bottom:24px;
    
    

`

const Title=styled.text`
    margin :20px;
    padding:4px;
    //opacity:0.9;
    color: ${props => (props.color ? props.color : '#7b5734')};
    font-family:Roboto;
    font-weight:800;
    font-style:bold;
    letter-spacing:2.4;
    font-size:24px;    
`

const Error=styled.text`
    margin :20px;
    font-size:16px;
    padding:4px;
    //opacity:0.9;
    color: ${props => (props.color ? props.color : 'red')};
    font-family:Roboto;
    font-weight:800;
    font-style:bold;
    letter-spacing:2.4;

`
const Phone= styled.input`
    display:flex;
    margin :20px;
    padding:4px;
    padding-left:8px;
    height:30px;
    border:None;
    border-bottom :#7b5734 5px solid;
    font-style:Roboto;
    //opacity:0.9;
`

const OTP=styled.input`
    margin :20px;
    padding:4px;
    //opacity:0.9;
`

const SendOTP=styled.button`
    // display:flex;
    // padding:3px;
    // margin-left:24px;
    // width:100px;
    // align-items:center;
    align-self:center;

    width:200px;
    padding:10px;
    background-color:#7b5734;
    color:#ffe6cc;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;

`


const ConfirmOTP=styled.button`
    align-self:center;

    width:200px;
    padding:10px;
    background-color:#7b5734;
    color:#ffe6cc;
    border-radius:5px;
    border:0px ;
    font-size:16px;
    font-weight:bold;
`

const OtpWrapper =styled.div`
    display:flex;
    margin:24px 24px;   
    justify-content:center; 
`

export default LoginForm