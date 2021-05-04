import styled from 'styled-components'
import React ,{Component}from 'react'
import banner from './../assets/images/cheriebanner.png'
import {axiosInstance} from './../service/axiosservice.jsx'
import placeholder from './../assets/images/placeholder.png'
import * as config from './../config.json' 
import Service from '../service/service'
import MyContext from '../globalStore/MyContext'
import { withRouter } from 'react-router'

const images = require.context('./../assets/images', true);

class Home extends React.Component{
    static contextType = MyContext
    constructor(props){
        super(props)
        this.state={
             itemlist :[],
             tag:'',
             isMobile:props.isMobile
        }
    }

    saveUrlParams =(settings)=>{
        var reset = settings && settings.reset ? settings.reset : false;
        var self = window.location.toString();
        var querystring = self.split("?");
        if (querystring.length > 1) {
          var pairs = querystring[1].split("&");
          for (let i in pairs) {
            var keyval = pairs[i].split("=");
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
              sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]));
            }
          }
        }
    }

    componentDidMount=async()=>{
        console.log(config.BASE_URL)
        this.saveUrlParams()
        let itemlist = this.props.itemlist
        await this.setState({itemlist:itemlist})
        
        let selectedTag = localStorage.getItem('tag')|| 'all'
        this.context.setSelectedTag(selectedTag )
        const params = {'tag':selectedTag}
        this.props.history.push({pathname:'/',params})
        let isMobile = this.props.isMobile
        await this.setState({isMobile})
        
    }

    goToProductDetail=(product_slug)=>{
        this.props.history.push('/product/'+product_slug)
    }

    getItemView=(item)=>{
        return(
            <ItemRoot id={item.product_slug} onClick={()=>this.goToProductDetail(item.product_slug)}>
                <ItemDiv>
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
                </ItemDiv>
            </ItemRoot>
        )
    }

    getItemViewMobile=(item)=>{
        return(
            <ItemRootMob id={item.product_slug} onClick={()=>this.goToProductDetail(item.product_slug)}>
            <ItemDivMob >
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

    renderProductList =  (selectedTag,isMobile)=>{
        let div=[]
        var that =this
        var item=[]

        {isMobile ?this.props.itemlist.map((item)=>{div.push(this.getItemViewMobile(item))}): this.props.itemlist.map((item)=>{div.push(this.getItemView(item))})}
        
        return div
    }

    setTag =(tag)=>{
        this.setState({tag})
    }

    render(){
        return(
            <MyContext.Consumer>
                {({selectedtag,setSelectedTag,isMobile})=>(    
                    <Root>
                        <Banner/>
                        <ListItemsDiv>
                            {/* { this.state.itemlist && this.state.itemlist.map(item =>this.getItemView(item))} */}
                            { this.renderProductList(this.props.itemlist,isMobile)}
                        </ListItemsDiv>
                        <Footer>

                        </Footer>
                    </Root>
                ) 
            }
            </MyContext.Consumer>
        )
    }
    
}


const Root = styled.div`
    display: flex;
    height:100%;
    flex-direction: column;
    text-align: center;

`

const Title = styled.h2`
    color: ${props => (props.color ? props.color : '#dddddd')};
    text-align: center;
`


// style="background:yourimage.jpg no-repeat;height:imageheight px;width:imagewidth px"
const Banner = styled.img`
    background-image: url(${banner});
    height:150px;
    width:100%;
    display:flex;
    border: #4e4e4e;
    justify-content: center;
    object-fit: cover;
    background-size: contain;
    margin-bottom:16px;
`

const ListItemsDiv= styled.div`
    display: flex;
    flex-wrap: wrap;
    // margin: 20px 60px 20px 60px;
    border: #4e4e4e;
`

const ItemRoot = styled.div`
    display:flex;
    flex-direction:column;
    width: 200px;
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
    border: 1px solid #7b5734;
    backgorund-color: ${props => (props.color ? props.color : '#7b5734')};
    border-radius:5px;
`

const ItemDiv = styled.div`
    display:flex;
    flex-direction:column;
    margin: 4px;
    padding:8px;
    border: 1px solid #7b5734;
    border-radius:5px;

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


export  default  Home