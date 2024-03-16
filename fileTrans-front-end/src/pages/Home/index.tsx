import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate ,useLocation} from 'react-router-dom'
import logo from "../../assets/upload.png"
import { getWsClient } from '../../shared/ws_client'


type TagType="text" | "image" | "file"
type TagListType={
  name:string,
  tag:TagType
}
type WS_Type={
  clientId:string,
  type:string,
  url:string
}
const TagList:TagListType[]=[
  {
    name:"文本传输",
    tag:"text"
  },
  {
    name:"图片传输",
    tag:"image"
  },
  {
    name:"文件传输",
    tag:"file"
  },
];
export default function Home() {
  const navigate=useNavigate()
  const location = useLocation();
  getWsClient().then(c=>{
    c.onMessage((data:WS_Type)=>{
      navigate(`/download?type=${data.type}&url=${encodeURIComponent(`http://${window.location.host}${data.url}`)}`)
    })
  })
  //@ts-ignore
  const initTag :TagType=location.pathname.slice(1) || "text"
  const [selectTag,setSelectTag]=useState<TagType>(initTag)
  return (
    <div className="container mx-auto my-5 flex-auto flex items-center flex-col">
      <img src={logo} className='w-24 my-5' />
      <h2>同步传</h2>
      <ul className='flex  flex-auto  justify-evenly p-2 w-3/5  rounded-2xl bg-slate-50 '>
        {
          TagList.map((item)=>{
            return <li key={item.tag} 
            className={`p-2  rounded-2xl  cursor-pointer transition-colors whitespace-nowrap  list-none ${selectTag===item.tag? "text-sky-600" : ""}`}
            onClick={()=>{
              setSelectTag(item.tag)
              navigate(`/${item.tag}`)
            }}
            >{item.name}</li>
          })
        }
      </ul>
      <Outlet />
      
    </div>
  )
}
