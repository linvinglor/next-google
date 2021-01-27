import React, { useRef, useState } from "react";
import styles from '../styles/Home.module.css'
import { Box, Flex, Text } from "@chakra-ui/react";
import AddTagDialog from './components/AddTagDialog'


const Index = () => {
  const addTag = useRef();

  const [tag, setTag] = useState([])
  const showAddTag = (item) => {
    addTag.current.changeShow(item);
  }
  const Addtag = () => {
    return (
      <Box
        _hover={{ bgColor: "rgba(32, 33, 36, .1)", cursor: "pointer" }}
        w="112px"
        h="112px"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        onClick={showAddTag}
      >
        <Box
          w="48px"
          h="48px"
          mx="auto"
          bgColor="rgba(241, 243, 244, 1)"
          borderRadius="50%"
        >
          <Box fontSize="30px" textAlign="center" w="48px" h="48px">
            +
        </Box>
        </Box>
        <Text mt="7px" textAlign="center" fontSize="13px" color="#000">
          添加快捷方式
      </Text>
      </Box>
    )
  }
  const addTagChange = (item) => {
    let tags = [...tag]
    let obj= tags.find(v=>v.id===item.id)
    if(obj){
      tags=tags.map(v=>v.id===item.id?item:v)
      setTag([...tags])
    }else{
      setTag([...tags, item])
    }
    
  }
  const changeOperate = (e,item) => {
    e.preventDefault();
    changehover(item,'menuOperate',true)

  }
  const changehover = (item,type, flag) => {
    let tags = [...tag]
    tags.find(v => v.id === item.id)[type] = flag
    setTag(tags)
  }
  const delectTag =(id)=>{
    const tags= [...tag]
    tags.splice(tags.findIndex(item => item.id === id), 1)
    setTag([...tags])
  }
  const BoxTag = ({ item }) => {

    return (
      <a href={item.address} >
        <Box
          _hover={{ bgColor: "rgba(32, 33, 36, .1)", cursor: "pointer" }}
          w="112px"
          h="112px"
          borderRadius="4px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          position="relative"
          onMouseEnter={() => {
            changehover(item, 'hover',true)
          }}
          onMouseLeave={() => {
            changehover(item,'hover', false)
            changehover(item,'menuOperate', false)

          }}
        >
          {item.hover &&
            <Box position="absolute" w="28px" h="28px" right="0" top="5px" _hover={{ fontSize: "16px" }} title="更多操作"
              onClick={(e) => changeOperate(e,item)}
            >︙</Box>}
            {
              item.menuOperate&&
              <Box position="absolute" w="128px" h="0px" bgColor="#fff" fontSize="14px" right="0" top="0" textAlign="center" >
              <Box mt="5px" h="32px" w="128px"  textAlign="center" bgColor="#fff" lineHeight="32px" _hover={{bgColor:"#b4b9be"}} onClick={(e)=>{e.preventDefault();showAddTag(item)}}>修改快捷方式</Box>
              <Box h="32px" w="128px" textAlign="center" bgColor="#fff" lineHeight="32px" _hover={{bgColor:"#b4b9be"}} onClick={e=>{e.preventDefault();delectTag(item.id)}}>移除</Box>
              </Box>
            }

          <Box
            w="48px"
            h="48px"
            mx="auto"
            bgColor="rgba(241, 243, 244, 1)"
            borderRadius="50%"
            textAlign="center"
          >
            <Box mt="12px" ml="12px">
              <img width="24px" height="24px" src={item.favUrl} alt="" />
            </Box>
          </Box>
          <Text mt="10px" textAlign="center" fontSize="13px" color="#000">
            {item.name}
          </Text>
        </Box>
      </a>
    )
  }

  return (
    <div className={styles.container}>
      <Flex>
        {
          tag.map(item => (
            <BoxTag item={item} key={item.id}/>
          ))
        }
        <Addtag />
      </Flex>
      <AddTagDialog ref={addTag} addTagChange={addTagChange} />
    </div>
  )


}

export default Index