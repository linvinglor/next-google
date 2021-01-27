import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(1, 1, 1, 0.6);
`;
function genID(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
  }

const AddTagDialog = (props, ref) => {
    const [show, setShow] = useState(false)
    const [editItem,setEditItem] =useState({name:'',url:''})
    useImperativeHandle(ref, () => ({//第一个参数：暴露哪个ref；第二个参数：暴露什么
        changeShow: (item) => {
            setShow(true);
            if(item){
                setEditItem(item)
            }
        },
    }));
    const handleAddTag =()=>{
        console.log(editItem.id);
        const tag = {
            name:editItem.name,
            url:editItem.url,
            address:/http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(editItem.url) ? editItem.url : 'https://' + editItem.url,
            id:editItem.id||genID(10),
            // favUrl: /http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(editItem.url) ? editItem.url + "/favicon.ico" : 'https://' + editItem.url + "/favicon.ico",
            favUrl:`http://www.google.com/s2/favicons?domain=${editItem.url}`
        }
        setShow(false);
        props.addTagChange(tag)
        reset()
    }
    
    const reset =()=>{
        setEditItem({name:'',url:''})
    }

    const setValueChange=(e,type)=>{
        let obj = {...editItem}
        obj[type]=e.target.value
        setEditItem(obj)
    }
    return (
        show && <Bg>
            <Box
                borderRadius="6px"
                w="500px"
                h="290px"
                mx="auto"
                mt="160px"
                bgColor="#fff"
                p="15px">
                <Text fontSize="15px" color="#202124" mb="15px">
                    添加快捷方式
                </Text>
                <Box h="63px" >
                    <Text fontSize="12px" color="#5F6368" mb="8px">
                        名称
                    </Text>
                    <Input bgColor="rgba(241, 243, 244, 1)" h="27px" type="text" name="name" px="8px" py="6px" border="none"
                        _focus={{
                            border: "none",
                            boxShadow: 'none',
                            borderBottom: "2px solid #0e65e1"
                        }}
                        value={editItem.name||''} 
                        onChange={(e)=>setValueChange(e,'name')}
                        />
                </Box>
                <Box h="63px" >
                    <Text fontSize="12px" color="#5F6368" mb="8px">
                        网址
                </Text>
                    <Input bgColor="rgba(241, 243, 244, 1)" h="27px" type="text" name="url" px="8px" py="6px" border="none"
                        _focus={{
                            border: "none",
                            boxShadow: 'none',
                            borderBottom: "2px solid #0e65e1"
                        }}
                        value={editItem.url||''} 
                        onChange={(e)=>setValueChange(e,'url')}/>
                </Box>
                <Box h="72px">
                    <Box float="right" >
                        <Button
                            w="67px"
                            h="32px"
                            borderRadius="4px"
                            fontSize="13px"
                            color="#0e65e1"
                            bgColor="#fff"
                            _focus={{ boxShadow: "none" }}
                            border="1px solid #d5d7db"
                            onClick={() => {
                                setShow(false);
                                reset()
                              }}
                        >取消</Button>
                        <Button w="67px"
                            h="32px"
                            borderRadius="4px"
                            fontSize="13px"
                            bgColor="#0e65e1"
                            color="#fff"
                            ml="8px"
                            disabled={!editItem.name||!editItem.url}
                            _hover={{ bgColor:"#0e65e1"}}
                            onClick={() => {
                                handleAddTag();
                              }}
                            >完成</Button>
                    </Box>
                </Box>
            </Box>
        </Bg>
    )
}

export default forwardRef(AddTagDialog)