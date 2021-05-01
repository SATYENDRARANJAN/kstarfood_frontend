import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import MyContext from '../globalStore/MyContext'
import {axiosInstance} from '../service/axiosservice'

class MenuBarComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    componentDidMount=async()=>{
        // await axiosInstance.get("/shop/get_tags_and_products/").
        // then(response=> 
        //     {
        //         console.log(response)
        //         localStorage.setItem('taggedProducts',response.data.taggedproducts)
        //         this.setState({taggedproducts:response.data.taggedproducts})
                
        //     }
        // )

        await axiosInstance.get('/shop/get_tags').
        then(response=>{
            console.log(response)
            localStorage.setItem('tags',response.data)
            this.setState({tags:response.data})
        })
        console.log(this.state.tags)
    }

    menuClick=(tag,setSelectedTag)=>{
        setSelectedTag(tag)
        localStorage.setItem('tag',tag)
        const params = {'tag':tag}
        this.props.history.push({pathname:'/',params})
        
    }

    printMenu = (tags,setSelectedTag) =>{
        return (
            <>
             { tags.map(item => (
                <MenuItems key={item.id} id={item.id} onClick={()=>this.menuClick(item.tag_name,setSelectedTag) }>
                    {item.tag_name}
                </MenuItems>
             ))}
            </>
           )
    }

    render(){
        let div ={}
        return(
            <MyContext.Consumer>
                {({setSelectedTag})=>(
                <MenuBar>
                    {(this.state.tags !=null && this.state.tags !=undefined) &&  this.printMenu(this.state.tags,setSelectedTag)}
                 </MenuBar>
                )}
               
            </MyContext.Consumer>
        )
    }
}


const Root = styled.div`
    display: flex;
    flex-direction: column;
`


const MenuBar =styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
`

const MenuItems =styled.button`
    -webkit-appearance: button;
    -webkit-writing-mode: horizontal-tb !important;
    letter-spacing: 1.5;
    word-spacing: normal;
    text-shadow: none;
    text-align: center;
    color:#7b5734;
    background-color: #ffe6cc;
    box-sizing: border-box;
    height :30px;
    padding: 5px 17px 4px;
    border-width: 1px;
    border-style: solid;
    border-radius:15px;
    border-color: #7b5734;
    width: auto;
    height : 100%;
    text-align: center;

    &:focus {
        background-color: #7b5734;
        color: #ffe6cc;
        outline:0;
    }
    &:selected {
        background-color: #7b5734;
        color: #ffe6cc;
        outline:0;
    }
    &:not( first-child ) {
        // CSS property
        margin: 0px 10px 6px 0px;

      } 

` 

export default withRouter(MenuBarComponent) 
// export default withRouter(connect(mapStateToProps, matchDispatchToProps)(MenuBarComponent));
