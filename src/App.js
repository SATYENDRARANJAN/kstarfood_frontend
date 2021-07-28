import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch ,Route} from 'react-router-dom';
import styled,{keyframes} from 'styled-components'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Home from './pages/Home.jsx';
import Address from './pages/Address.jsx';
import ProductDetail from './pages/ProductDetail.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import {Title} from './components/Title.jsx'
import MenuBarComponent from './components/MenuBarComponent.jsx'
// import  AddToCartBtnTop from './components/AddToCartBtnTop.jsx'
import {AddToCartBtnTop} from './components/Title.jsx'
import MyContext from './globalStore/MyContext';
import {Helmet} from "react-helmet";
import {axiosInstance} from './service/axiosservice.jsx'

import Modal from './modal/Modal';
import LoginForm from './form/LoginForm';
import CartForm from './form/CartForm'
import CartForm2 from './form/CartForm2'
import AddressForm from './form/AddressForm'
import AddedToCartPopup  from './components/AddedToCartPopup.jsx'
import SearchModal  from './form/SearchModal.jsx'
import Footer  from './components/footer.jsx'
import NavPanel from './components/NavPanel.jsx'
import React from 'react';
import shopping from './assets/images/shopping-cart.svg'
import user from './assets/images/user.svg'
import "./styles.css";
import SearchBar  from './components/search/SearchBar.js'
import ModalStateUpdaterButton from './components/ModalStateUpdaterButton.jsx'
import { withRouter } from 'react-router'



// Sentry.init({
//   dsn: "https://1087e6b2d1c1415eb945541fec517453@o673428.ingest.sentry.io/5768153",
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 0.2,
// });
class App extends React.Component{
  static whyDidYouRender = true

  constructor(props){
    super(props)
    this.state={
      mobile :'',
      width: window.innerWidth,
      isMobile: window.innerWidth <= 500,
      menuOpen:false,

      loginopen:false,
      openM:this.openM,
      closeM:this.closeM,
      jwt:'',
      setJwt:this.setJwt,
      resetJwt:this.resetJwt,
      cartopen:false,
      openCartM:this.openCartM,
      closeCartM:this.closeCartM,
      cart2open:false,
      openCart2M:this.openCart2M,
      closeCart2M:this.closeCart2M,
      addressOpen:false,
      openAddress:this.openAddress,
      closeAddress:this.closeAddress,
      order_id:'',
      selectedtag: localStorage.getItem('tag') || 'all' ,
      setSelectedTag:this.setSelectedTag,
      tags:['all'],
      setTags:this.setTags,
      itemlist:[],
      logout:this.logout,
      showAddedToCart:false,
      openAddedToCartPopUp:this.openAddedToCartPopUp,
      addedToCart:false,
      setAddedToCart:this.setAddedToCart,
      handleMenuClick:this.handleMenuClick,
      searchtxt:'',
      setSearchtxt:this.setSearchtxt,
      clicksearch:this.clicksearch,
      issearchOpen:false,
      searchOpen:this.searchOpen,
      searchClose:this.searchClose

    }
    const isMobile = window.innerWidth <= 500;
    console.log("isMobile",isMobile)
  }


  searchOpen=async()=>{
    await this.setState({isSearchOpen:true});

  }

  searchClose=()=>{
    this.setState({isSearchOpen:false});
  }

  setSearchtxt=(searchtxt)=>{
    this.setState({searchtxt})
    // this.searchOpen()
  }


  clicksearch=(searchtxt)=>{
    debugger
    this.setState({searchtxt})
    this.searchOpen()
    console.log("Hi: ",this.state.searchtxt)
  }

  handleMenuClick=async()=> {
    await this.setState({menuOpen:!this.state.menuOpen});
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
    if (window.innerWidth <500 ){
      this.setState({isMobile:true})
    }else{
      this.setState({isMobile:false})
    }
  }

  async componentDidMount(){
    var taglist=[]
    window.addEventListener('resize', this.handleWindowSizeChange);
    await axiosInstance.get('/shop/get_tags').
        then(async response=>{
            console.log(response)
            await localStorage.setItem('tags',response.data)
            for (let obj of response.data){
              taglist.push(obj['tag_name'])
            }
            await this.setState({tags:taglist})
        })
        console.log(this.state.tags)
    const menu = ['About Us','Our Products','Services','Terms & Conditions','FAQ','Contact Us']
    await this.setState({tags:[...this.state.tags,...menu]})
    console.log(this.state.tags)
  }

  is_logged_in=()=>{
    let jwt=localStorage.getItem('token')
    console.log(jwt)
    return !(jwt===null || jwt===''||jwt===undefined)
  }

  openAddress=(order_id)=>{
    this.setState({addressOpen:true,order_id})
  }

  closeAddress=()=>{
    this.setState({addressOpen:false})
  }

  openCart2M=()=>{
    this.setState({cart2open:true})
  }

  openAddedToCartPopUp=()=>{
    this.setState({showAddedToCart:true})
  }

  closeCart2M=()=>{
    this.setState({cart2open:false})
  }

  setAddedToCart=()=>{
    this.setState({addedToCart:true})
    setTimeout(()=>{this.setState({addedToCart:false})},2000)
  }

  openCartM=()=>{
    this.setState({cartopen:true})
  }

  closeCartM=()=>{
    this.setState({cartopen:false})
  }

  logout =()=>{
    localStorage.clear()
    this.setState({jwt:''})
  }

  closeM=()=>{
    this.setState({loginopen:false})
  }

  openM=()=>{
    this.setState({loginopen:true})
  }

  setJwt=(token)=>{
    this.setState({jwt:token})
  }

  resetJwt=()=>{
    this.setState({jwt:''})
  }

  setSelectedTag=async(tag_name)=>{
    localStorage.setItem('tag',tag_name)
    await this.setState({selectedtag:tag_name})
    // await axiosInstance.get("/shop/products/list/" + this.state.selectedtag).
    //       then(async(response)=> 
    //           {
    //               console.log(response)
    //               await this.setState({itemlist:response.data.products})  
    //               debugger
    //           }
    //       )
  }

  setTags =(tags)=>{
    this.setState({tags})
  }

  mobileDisplay =(openCartM)=>{
    return(
      <Root>
        <Header>
        <AddToCartBtnTop is_logged_in={localStorage.getItem('token')}  openCartM={openCartM}  isMobile={this.state.isMobile} />
        <Title addedToCart={this.state.addedToCart}/>
        <MenuBarComponent/>
        </Header>
        <Modal open={this.state.loginopen} close={this.closeM}>
            <LoginForm/>
        </Modal>
        <Modal open={this.state.cartopen} close={this.closeCartM}>
            <CartForm />
        </Modal>
        <Modal open={this.state.cart2open} close={this.closeCart2M}>
            <CartForm2 />
        </Modal>
        <Modal open={this.state.addressOpen} close={this.closeAddress}>
            <AddressForm />
        </Modal>
        <Switch>
          <Route path ="/product/:id"   component={ProductDetail}/>
          <Route path ="/payment_success"   component={PaymentSuccess}/>
          <Route path ="/address"   component={Address}/>
          <Route path='/' exact render={(props) => ( <Home {...props}  itemlist={this.state.itemlist} />)}/>
      </Switch>
    </Root>
      )

  }

  LaptopDisplay =(openCartM)=>{
    return(
    <Root >
    {/* <Navbar/> */}
    <Header>
    <AddToCartBtnTop is_logged_in={localStorage.getItem('token')}  openCartM={openCartM}/>
      <Title/>
    <MenuBarComponent/>
    </Header>
    <Modal open={this.state.loginopen} close={this.closeM}>
        <LoginForm/>
    </Modal>
    <Modal open={this.state.cartopen} close={this.closeCartM}>
        <CartForm />
    </Modal>
    <Modal open={this.state.cart2open} close={this.closeCart2M}>
        <CartForm2 />
    </Modal>
    <Modal open={this.state.addressOpen} close={this.closeAddress}>
        <AddressForm />
    </Modal>
    <Switch>
        <Route path ="/product/:id"   component={ProductDetail}/>
        <Route path ="/payment_success"   component={PaymentSuccess}/>
        <Route path ="/address"   component={Address}/>
        {/* <Route path='/' exact component={Home}/> */}
        {/* <Route path='/' exact render={(props) => ( <Home {...props} isMobile={this.state.isMobile} itemlist={this.state.itemlist} />)}/> */}
        <Route path='/' exact render={(props) => ( <Home {...props} isMobile={this.state.isMobile} />)}/>
    </Switch>
  </Root>
    )

  }

  render(){
    const { width,isMobile } = this.state;
    const {loginopen,openM,closeM,jwt,setJwt,cartopen,openCartM,closeCartM,cart2open,openCart2M,closeCart2M,
      resetJwt,addressOpen,openAddress,closeAddress,order_id,selectedtag,setSelectedTag,tags,setTags,logout,
      showAddedToCart,openAddedToCartPopUp,addedToCart,setAddedToCart,handleMenuClick,searchtxt,setSearchtxt,isSearchOpen,searchOpen,searchClose,clicksearch}=this.state
    return (
      <BrowserRouter>
        <MyContext.Provider value={{loginopen:loginopen,openM:openM,closeM:closeM,jwt:jwt,setJwt:setJwt,
          cartopen:cartopen,openCartM:openCartM,closeCartM:closeCartM,cart2open:cart2open,openCart2M:openCart2M,closeCart2M:closeCart2M,resetJwt:resetJwt,
          addressOpen:addressOpen,openAddress:openAddress,closeAddress:closeAddress,order_id:order_id,selectedtag:selectedtag,setSelectedTag:setSelectedTag,
          tags:tags,setTags:setTags,logout:logout,isMobile:isMobile,showAddedToCart:showAddedToCart,openAddedToCartPopUp:openAddedToCartPopUp,addedToCart:addedToCart,
          setAddedToCart:setAddedToCart,handleMenuClick:handleMenuClick,searchtxt:searchtxt,setSearchtxt:setSearchtxt,isSearchOpen:isSearchOpen,searchOpen:searchOpen,searchClose:searchClose,clicksearch:clicksearch}}>
      <Root menuOpen={this.state.menuOpen}>
        <Root2>
        {!this.state.isMobile  && <Header>
      <AddToCartBtnTop is_logged_in={localStorage.getItem('token')}  openCartM={openCartM} addedToCart={addedToCart}/>
      <Title width={this.state.width} />
      </Header> }
      {!this.state.isMobile  &&<MenuBarComponent/>}
      
       {this.state.isMobile  && <NavPanel tags={this.state.tags} open={this.state.menuOpen}/>}
       {this.state.isMobile  && <MobileHeader>
        <Heading>
          Chérie
        </Heading>
        <IconsDiv>
           {!this.is_logged_in() ?<ModalStateUpdaterButton src={user}/>:null}
          {this.is_logged_in() && <Cart src={shopping} onClick={openCartM}/>}
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='black'/>

        </IconsDiv>
      </MobileHeader> }
       {this.state.isMobile  && <SearchBar   searchtxt={searchtxt} setSearchtxt={this.setSearchtxt} clicksearch={this.clicksearch}/>}

      <Modal open={this.state.loginopen} close={this.closeM}>
          <LoginForm/>
      </Modal>
      <Modal open={this.state.cartopen} close={this.closeCartM}>
          <CartForm />
      </Modal>
      <Modal open={this.state.cart2open} close={this.closeCart2M}>
          <CartForm2 />
      </Modal>
      <Modal open={this.state.addressOpen} close={this.closeAddress}>
          <AddressForm />
      </Modal>
      <Modal open={this.state.showAddedToCart}>
          <AddedToCartPopup/>
      </Modal>
      <Modal open={this.state.isSearchOpen} close={this.searchClose} style={{'overflow':'scroll'}}>
          <SearchModal searchtxt={searchtxt} setSearchtxt={setSearchtxt}  searchClose={this.searchClose} />
      </Modal>
      <Switch>
          <Route path ="/product/:id"   component={ProductDetail}/>
          <Route path ="/payment_success"   component={PaymentSuccess}/>
          <Route path ="/address"   component={Address}/>
          {/* <Route path='/' exact render={(props) => ( <Home {...props}  itemlist={this.state.itemlist} />)}/> */}
          <Route path='/' exact render={(props) => ( <Home {...props}  key={this.state.selectedtag}  tag={this.state.selectedtag}/>)}/>
      </Switch>
    </Root2>
    <Footer/>

</Root>
          </MyContext.Provider>
      </BrowserRouter>
      )
  }
}



/* MenuButton.jsx */
class MenuButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
      color: this.props.color? this.props.color:'black',
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }
  
  handleClick(){
  this.setState({open:!this.state.open});
  }
  
  render(){
    const styles = {
      container: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        marginLeft: '16px',
        zIndex:1000,
      },
      line: {
        height: '4px',
        width: this.state.open ?'25px':'20px',
        borderRadius:'3px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'translateX(4px) translateY(-2px)rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '2px',
      },
      lineMiddle: {
        opacity: this.state.open ? 0: 1,
        transform: this.state.open ? 'translateX(-16px)':'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) translateY(3px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '2px',
      },       
    }
    return(
      <div style={styles.container} 
        onClick={this.props.onClick ? this.props.onClick: 
          ()=> {this.handleClick();}}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
  }
}


export default App;
// export default withRouter(connect(mapStateToProps)(App));

const Header = styled.div`
  display: flex;
  flex-direction:column;
  position:relative;
  width : 100%;
`
const Root=styled.div`
display:flex;
flex-direction:column;
width:auto;
height:100vh;
text-align: center;
font-family:'Montserrat', sans-serif;
overflow:${props=>props.menuOpen?`hidden`:''};
`
const Root2=styled.div`
display:flex;
flex-direction:column;
width:auto;
margin: 0 16px;
text-align: center;


`
const MobileHeader =styled.div`
  display:flex;
  justify-content:space-between;
  margin:0 0px;
  height:59px;
  align-items:center;
`
const Heading=styled.text`
  font-size : 59px;
  color:#c0a680;
  // font-family:'Montserrat', sans-serif;
  font-family:'Dancing Script', cursive;
  font-weight:1000;
  letter-spacing:2.9px;
  margin:5px 0;

`
const IconsDiv  =styled.div`
    display:flex;
    flex-direction:row;
`
const Account=styled.img`
  width:24px;
  height:24px;
  margin-left:16px;
`
const List=styled.img`
  width:24px;
  height:24px;
  margin-left:16px;
`
const Cart=styled.img`
  width:24px;
  height:24px;
  margin-left:16px;
`
const ModalTitle=styled.text``

