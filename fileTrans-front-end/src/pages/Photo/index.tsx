import React, {  useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message   } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import "./index.css"
import { http, mobileHttp } from '../../shared/Http';
import Dialog from '../../components/dialog';
import { isMobile,notifyPc } from '../../tool/tool';
import type { AxiosResponse } from 'axios';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export default function Photo() {
  const [openDialog,setOpenDialog]=useState(false)
  const [uploadList,setUploadList]=useState<UploadFile[]>([])
  const [imgLocation,setImgLocation]=useState("")
  const [messageApi, contextHolder] = message.useMessage();
  const [isHave,setHave]=useState(false)
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
        }).then((res:AxiosResponse)=>{
          notifyPc(res.data.url,"image")
          setImgLocation(res.data.url)
          messageApi.success("传输成功，请在电脑端查看")
        }).catch(()=>{
          messageApi.error("传输失败，请检查局域网是否选择正确")
        }).finally(()=>{
          setHave(false)
        })
      }
    }
    else{
      setOpenDialog(true)
      http.post("files",formData,{
        headers:{
          "Content-Type":" multipart/form-data"
        }
      }).then((res:AxiosResponse)=>{
        setImgLocation(res.data.url)
      }).finally(()=>{
        setHave(false)
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
      disabled={isHave}
      listType="picture"
      accept=".jpg, .jpeg, .png"
      beforeUpload={()=>{
        return false;
      }}
      onChange={({file})=>{
        setHave(true)
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
