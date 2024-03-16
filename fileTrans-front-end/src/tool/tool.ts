import { useLocation } from "react-router-dom";
import qs from 'query-string'
import {getWsClient} from "../shared/ws_client"
import { clientId } from "./init";

export  const normalizeType = (type :string) => {
    if (/^image\/.*$/.test(type)) {
      return 'image'
    } else if (/^text(\/.*)?$/.test(type)) {
      return 'text'
    } else {
      return 'file'
    }
  }


  export const useQuery = () => {
    const location = useLocation();
    const parsed = qs.parse(location.search)
    return parsed
  }

export function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|SymbianOS|Opera Mini|IEMobile/i.test(navigator.userAgent);
}


export const notifyPc = (response :string, type:string) => {
  getWsClient().then(c => {
    c.send({ clientId, type, url: response })
  })
  return response
}

