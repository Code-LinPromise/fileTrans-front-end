import { useLocation } from "react-router-dom";
import qs from 'query-string'

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