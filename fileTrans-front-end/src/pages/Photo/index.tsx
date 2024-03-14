import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload   } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import "./index.css"
import { http } from '../../shared/Http';
import Dialog from '../../components/dialog';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function Photo() {
  const [openDialog,setOpenDialog]=useState(false)
  const [uploadList,setUploadList]=useState<UploadFile[]>([])
  const [imgLocation,setImgLocation]=useState("")
  function UploadHandle(){
    setOpenDialog(true)
    const img=uploadList[0];
    const formData=new FormData()
    formData.append("raw",img as FileType)
    http.post("files",formData,{
      headers:{
        "Content-Type":" multipart/form-data"
      }
    }).then((res)=>{
      setImgLocation(res.data.url)
    })
  }
  function closeDialog(){
    setOpenDialog(false)
  }
  return (
    <div className='w-3/5'>
      <Upload
      listType="picture"
      accept=".jpg, .jpeg, .png"
      beforeUpload={()=>{
        return false;
      }}
      onChange={({file})=>{
        setUploadList((state)=>{
          return [...state,file]
        })
      }}
      >
        <Button icon={<UploadOutlined />}>选择图片</Button>
      </Upload>
      <Button type='primary' className='w-full my-10' onClick={()=>UploadHandle()}>
        确认传输
      </Button>
      {
        openDialog && <Dialog isOpen={openDialog} closeDialog={closeDialog} content={"image"} fileLocation={imgLocation}/>
      }
    </div>
  )
}
