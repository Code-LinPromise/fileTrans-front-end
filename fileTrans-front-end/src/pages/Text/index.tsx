import React, { useState } from 'react'
import Button from '@mui/material/Button';

export default function Text() {
  const [textValue,setTextValue]=useState<string>("")
  return (
    <div className='flex flex-col w-3/5 my-10'>
      <textarea name="textarea" rows="10" cols="50" className='border-solid border-black border-2 my-10 rounded-lg p-2'
      placeholder='请输入文本传输内容'
      onChange={(e)=>{
        console.log(e.target.value)
        setTextValue(e.target.value)
      }}
      ></textarea>

      <Button variant="contained" >上传</Button>
    </div>
  )
}
