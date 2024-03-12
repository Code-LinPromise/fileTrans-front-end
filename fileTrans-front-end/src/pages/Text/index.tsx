import React, { useState } from 'react'
import {Button,Input} from "antd"
import { http } from '../../shared/Http';

const { TextArea } = Input;
export default function Text() {
  const [textValue,setTextValue]=useState<string>("")

  function uploadText(){
    http.post("texts",{
      raw:textValue
    }).then((res)=>{
      console.log(res.data)
    })
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
    </div>
  )
}
