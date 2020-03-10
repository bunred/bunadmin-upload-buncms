import storedToken from "@/utils/scripts/storedToken"
import request from "umi-request"
import {ENV} from "@/utils/config"

interface Resp {
  id?: string // media id
  file_name?:     string
  file_size?:     number
  media_name?: string
  type?: string
  title?: string
  msg?: string
  errors?: string
}

export default async function uploadFileSer(data: any): Promise<Resp> {
  // Buncms File 上传图片
  const token = await storedToken()

  // `request` use `umi-request` directly
  return await request("/file", {
    prefix: ENV.SITE_URLS[1],
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: data
  })
}