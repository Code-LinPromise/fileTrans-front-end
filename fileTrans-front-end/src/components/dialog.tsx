import React, { useEffect, useState } from 'react'
import { Modal,Select } from 'antd'


type Props={
    isOpen:boolean
}
export default function Dialog(props:Props) {
    const [addresses,setAddresses]=useState<string[]>([])
    useEffect(()=>{

    },[])
    const [selectAddress,setSelectAddress]=useState<string>("")
    return (
        <Modal
        centered
        open={props.isOpen}
        width={1000}
        footer={null}
      >
        <p>请选择一个局域网地址</p>
        <Select
        defaultValue={addresses[0]}
        style={{ width: 120 }}
        onChange={(newValue:string)=>{
            setSelectAddress(newValue)
        }}
        options={addresses.map((item)=>{
            return {value:item,label:item}
        })}
        />
      </Modal>
    )
}
