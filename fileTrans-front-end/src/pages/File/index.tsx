import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message   } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import "./index.css"
import { http, mobileHttp } from '../../shared/Http';
import Dialog from '../../components/dialog';
import { isMobile,notifyPc } from '../../tool/tool';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function File() {
  const [uploadList,setUploadList]=useState<UploadFile[]>([])
  const [fileLocation,setFileLocation]=useState("")
  const [openDialog,setOpenDialog]=useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  function UploadHandle(){
    const img=uploadList[0];
    const formData=new FormData()
    formData.append("raw",img as FileType)
    if(isMobile()){
      const ip =`http://${location.host}`
      if(ip){
        mobileHttp.post(`${ip}/api/v1/files`,formData,{
          headers:{
            "Content-Type":" multipart/form-data"
          }
        }).then((res)=>{
          //@ts-ignore
          notifyPc(res.data.url,"file")
          setFileLocation(res.data.url)
          messageApi.success("传输成功，请在电脑端查看")
        }).catch(()=>{
          messageApi.error("传输失败，请检查局域网是否选择正确")
        })
      }
    }
    else{
      setOpenDialog(true)
      http.post("files",formData,{
        headers:{
          "Content-Type":" multipart/form-data"
        }
      }).then((res)=>{
        //@ts-ignore
        setFileLocation(res.data.url)
      })
    }
  }
  function closeDialog(){
    setOpenDialog(false)
  }
  return (
    <div className='w-3/5'>
      {contextHolder}
      <Upload
      listType="picture"
      beforeUpload={()=>{
        return false;
      }}
      onChange={({file})=>{
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
      {
        openDialog && <Dialog isOpen={openDialog} closeDialog={closeDialog} content={"file"} fileLocation={fileLocation}/>
      }
    </div>
  )
}
