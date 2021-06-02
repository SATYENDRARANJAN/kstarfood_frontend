import React,{ useState ,useEffect} from 'react';
import styled,{keyframes} from 'styled-components'
import search from '../../assets/images/search.svg'



const SearchBar = ({searchtxt,setSearchtxt,clicksearch}) => {

  const [txt, setTxt] = useState(searchtxt || '');
  const print=(txt)=>{
    console.log(txt)
  }
  useEffect(() => {print(txt)},[txt])
  
  const openSearchPage=()=>{
    if(txt ==''){
      return
    }
    clicksearch(txt)
    
  }

  const onChange= (e)=>{
    debugger
    setTxt(e.target.value)
    setSearchtxt(e.target.value)
    // console.log(txt)
  }
  
  return (
      <SearchRoot>
        <SearchInput value={txt} onChange={(e)=>onChange(e)}></SearchInput>
        <SearchIcon src={search}  onClick={()=>openSearchPage()}/>
      </SearchRoot>
    )
  }
  


const SearchRoot=styled.div`
  display:flex;
  width:100%;
  height:40px;
  border:1px solid #eee;
  border-radius:8px;

  margin-bottom:11px ;
  // margin-left:8px;
  // padding:5px;
  // margin-right:${props=>props.gap?props.gap:''}
`

const SearchInput = styled.input`
  display:inline-flex;
  border:0px;
  flex-grow:1;
  font-size:20px;
  font-family:'Montserrat',sans-serif;
  letter-spacing:2px;
  // height:100%;
  margin:2px;
  outline:None;
`

const SearchIcon=styled.img`
// display:inline-flex;
  width:40px;
  height:40px;
  background:#f4f4f4;

  &:hover {
      background:Nones;
  }

`

  export default SearchBar;