import React, { useState } from 'react'
import {Button,Input} from "antd"
import { http } from '../../shared/Http';
import Dialog from '../../components/dialog';

const { TextArea } = Input;
export default function Text() {
  const [textValue,setTextValue]=useState<string>("")
  const [openDialog,setOpenDialog]=useState(false)
  const [textLocation,setTextLocation]=useState("")

  function uploadText(){
    setOpenDialog(true)
    http.post("texts",{
      raw:textValue
    }).then((res)=>{
      console.log(res.data)
      setTextLocation(res.data.url)
    })
  }
  function closeDialog(){
    setOpenDialog(false)
  }
  return (
    <div className='flex flex-col w-3/5 my-10'>
      <TextArea  rows={10} placeholder="请输入需要上传的文本内容" 
      className=' mb-10'
      onChange={(e)=>{
        setTextValue(e.target.value)
      }}
      ></TextArea>
      <Button type='primary' onClick={uploadText}>
        确认传输
      </Button>
      <Dialog isOpen={openDialog} closeDialog={closeDialog} content={"text"} fileLocation={textLocation}/>
    </div>
  )
}
