import React, { useEffect, useState } from 'react'
import logo from "../../assets/upload.png"
import { Button, Input,Image  } from 'antd'
import { useNavigate } from 'react-router-dom'
import { normalizeType, useQuery } from '../../tool/tool'
import { http } from '../../shared/Http'


const { TextArea } = Input;
export default function Download() {
  const query= useQuery()
  let type =""
  let node :React.ReactNode=null
  console.log(query)
  if(query.type && !Array.isArray(query.type)){
    type = normalizeType(query.type)
  }
  const [text, setText] = useState("")
  useEffect(() => {
    if (type === "text" && query.url && !Array.isArray(query.url)) {
      http.get(query.url).then(({ data }) => {
        setText(data as string)
      })
    }
  }, [type])
  switch(type){
    case "text":
      node =(
        <div className='flex flex-col  w-3/5'>
          <TextArea  rows={10} 
            value={text}
            readOnly
          ></TextArea>
          <Button type='primary' className=' mt-5'>点击复制内容</Button>
        </div>
      )
      break;
    case "image":
      if(query.url && !Array.isArray(query.url)){
        node =(
          <div className='flex flex-col items-center  w-3/5'>
            <a href={query.url}>
              <Image
                  width={120}
                  src={query.url}
                />
              <Button className=' mt-5'>长按或点击，即可下载图片</Button>
            </a>
          </div>
        )
      }
      break;
    case "file":
      if(query.url && !Array.isArray(query.url)){
        node=(
          <div className='flex flex-col items-center  w-3/5'>
            <a href={query.url}>
              <Button>
                点击下载文件
              </Button>
            </a>
          </div>
        )
      }
      
    
  }
  const navigate = useNavigate()
  function goUploadClick() {
    navigate("/")
  }
  return (
    <div className="container mx-auto  my-20 justify-center flex-auto flex items-center flex-col">
      <img src={logo} className='w-24 my-5' />
      <h2 className=' mb-5'>同步传</h2>
      {node}
      <Button type='primary' className=' my-5 w-3/5' onClick={goUploadClick}>我也要传</Button>
    </div>
  )
}
