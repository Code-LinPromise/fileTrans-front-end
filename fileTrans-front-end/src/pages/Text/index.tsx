import React, {  useState } from 'react'
import {Button,Input, message} from "antd"
import { http, mobileHttp } from '../../shared/Http';
import Dialog from '../../components/dialog';
import { isMobile } from '../../tool/tool';
import { notifyPc } from '../../tool/tool';
import type { AxiosResponse } from 'axios';

const { TextArea } = Input;
export default function Text() {
  const [textValue,setTextValue]=useState<string>("")
  const [openDialog,setOpenDialog]=useState(false)
  const [textLocation,setTextLocation]=useState("")
  const [messageApi, contextHolder] = message.useMessage();
  function uploadText(){
    if(isMobile()){
      const ip =`http://${location.host}`
      if(ip){
        mobileHttp.post(`${ip}/api/v1/texts`,{
          raw:textValue
        }).then((res:AxiosResponse)=>{
          notifyPc(res.data.url,"text")
          messageApi.success("传输成功，请在电脑端查看")
        }).catch(()=>{
          messageApi.error("传输失败，请检查局域网是否选择正确")
        })
      }
    }
    else{
      http.post("texts",{
        raw:textValue
      }).then((res:AxiosResponse)=>{
        setTextLocation(res.data.url)
        setOpenDialog(true)
      }).catch(()=>{
        messageApi.error("传输失败，请检查局域网是否选择正确")
      })
    }
  }
  function closeDialog(){
    setOpenDialog(false)
  }
  return (
    <div className='flex flex-col w-3/5 my-10'>
      {contextHolder}
      <TextArea  rows={10} placeholder="请输入需要上传的文本内容" 
      className=' mb-10'
      onChange={(e)=>{
        setTextValue(e.target.value)
      }}
      ></TextArea>
      <Button type='primary' onClick={uploadText}>
        确认传输
      </Button>
      {
        openDialog && <Dialog isOpen={openDialog} closeDialog={closeDialog} content={"text"} fileLocation={textLocation}/>
      }
    </div>
  )
}
