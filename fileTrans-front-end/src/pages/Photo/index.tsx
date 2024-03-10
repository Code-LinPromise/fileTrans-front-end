import React, { useEffect, useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';

export default function Photo() {
  const [upImage,setUpImage]=useState<string[]>([
    "https://p6-passport.byteacctimg.com/img/user-avatar/1f839db762e7313cff3c477e4ba010a2~40x40.awebp"
  ])
  useEffect(()=>{
    const inputImg:HTMLElement | null=document.getElementById("myFileButton");
    if(inputImg===null){
      return 
    }
    inputImg?.addEventListener("change",(e)=>{
      const imgfile = e?.target?.files[0]
      const reader = new FileReader();
      reader.onload=function(){
        const fileurl = reader.result
        if(typeof fileurl !="string"){
          return 
        }
        setUpImage((state)=>{
          const newState=[...state,fileurl];
          return newState
        }) // 这个 useState 把获取的base64 给到img 的src 上
       
    }
      reader.readAsDataURL(imgfile)
    })
  },[])
  return (
    <div id="dropBox" className='w-3/5 h-72 my-20 border-solid border-slate-400 border-2 rounded-lg'>
      <ul className='flex flex-row p-2'>
          {
            upImage.map((item)=>{
              return <li className='w-1/5 h-30 rounded-lg p-2 border-slate-400 border-2 mx-4'>
                <img src={item} alt="" className=' w-full' />
              </li>
            })
          }
          <li className='w-1/5 h-30 rounded-lg p-2 border-slate-400 border-2 mx-4 border-dashed hover:border-blue-500 transition-all'>
            <label className="cursor-pointer flex flex-col  justify-center items-center w-full h-full" for="myFileButton">
              <UploadIcon color='primary'/>
              <span>点击选择图片</span>
              </label>
            <input type="file" id="myFileButton" className=" absolute  opacity-0 w-0 h-0 overflow-hidden  -z-0"/>
          </li>
      </ul>
      
    </div>
  )
}
