import React, { useEffect, useState } from 'react'
import logo from "../../assets/upload.png"
import { Button, Input,Image, message  } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../../tool/tool'
import { http } from '../../shared/Http'


const { TextArea } = Input;
export default function Download() {
  const query= useQuery()
  const {type ,url} =query;
  let node :React.ReactNode=null
  const [messageApi, contextHolder] = message.useMessage();
  const [text, setText] = useState("")

  useEffect(() => {
    if (type === "text" && url && !Array.isArray(url)) {
      http.get(url).then(({ data }) => {
        setText(data as string)
      })
    }
  }, [type])
  const navigate = useNavigate()
  function goUploadClick() {
    navigate("/")
  }
  function copyToClipboard(text:string) {
    // 创建一个临时input元素
    const tempInput = document.createElement('input');
    
    // 将要复制的文本赋值给该元素
    tempInput.value = text;
    
    // 将该元素添加到DOM中（为了能调用select方法）
    document.body.appendChild(tempInput);
    
    // 选中input中的文本
    tempInput.select();
    
    try {
      // 使用 Clipboard API 来执行复制操作
      const successful = document.execCommand('copy');
      if (successful) {
        messageApi.success("复制成功！")
      } else {
        messageApi.error("复制失败~")
      }
    } catch  {
      messageApi.error("复制失败~")
    }
  
    // 完成后从DOM中移除临时input元素
    document.body.removeChild(tempInput);
  }
  switch(type){
    case "text":
      node =(
        <div className='flex flex-col  w-3/5'>
          <TextArea  rows={10} 
            value={text}
            readOnly
          ></TextArea>
          <Button type='primary' className=' mt-5' onClick={()=>copyToClipboard(text) }>点击复制内容</Button>
        </div>
      )
      break;
    case "image":
      if(url && !Array.isArray(url)){
        node =(
          <div className='flex flex-col items-center  w-3/5'>
            <a href={url} className='flex flex-col items-center w-full'>
              <Image
                  className='w-full'
                  src={url}
                />
              <Button className='w-full mt-5' type='primary'>长按或点击，即可下载图片</Button>
            </a>
          </div>
        )
      }
      break;
    case "file":
      {
      if(url && !Array.isArray(url)){
        node=(
          <div className='flex flex-col items-center  w-3/5'>
            <a href={url} className='w-full'>
              <Button type='primary' className='w-full'>
                点击下载文件
              </Button>
            </a>
          </div>
        )
      }
    }
      break;
  }
  return (
    <div className="container mx-auto  my-20 justify-center flex-auto flex items-center flex-col">
      {contextHolder}
      <img src={logo} className='w-24 my-5' />
      <h2 className=' mb-5'>同步传</h2>
      {node}
      <Button type='primary' className=' my-5 w-3/5' onClick={goUploadClick}>我也要传</Button>
    </div>
  )
}
