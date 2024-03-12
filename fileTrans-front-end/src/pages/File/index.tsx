import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload ,message  } from 'antd';
import type { UploadFile } from 'antd';
import "./index.css"

export default function File() {
  const [messageApi, contextHolder] = message.useMessage();
  const [uploadList,setUploadList]=useState<UploadFile[]>([])

  function UploadHandle(){
    console.log(uploadList)
  }
  return (
    <div className='w-3/5'>
      {contextHolder}
      <Upload
      listType="picture"
      beforeUpload={()=>{
        return false;
      }}
      onChange={({file,fileList})=>{
        setUploadList((state)=>{
          return [...state,file]
        })
      }}
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Button type='primary' className='w-full my-10' onClick={()=>UploadHandle()}>
        确认传输
      </Button>
    </div>
  )
}
