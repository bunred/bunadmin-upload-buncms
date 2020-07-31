import request from "umi-request"
import { ENV, storedToken } from "@bunred/bunadmin"

interface Resp {
  id?: string // media id
  file_name?: string
  file_size?: number
  media_name?: string
  type?: string
  title?: string
  msg?: string
  errors?: string
}

type Options = {
  url?: string
  prefix?: string
  method?: string
  headers?: any
}

export default async function uploadFileSer(
  data: any,
  options?: Options
): Promise<Resp> {
  // Buncms File 上传图片
  const token = await storedToken()

  // `request` use `umi-request` directly
  return await request((options && options.url) || "/file", {
    prefix: (options && options.prefix) || ENV.SITE_URLS[1],
    method: (options && options.method) || "post",
    headers: (options && options.headers) || {
      Authorization: `Bearer ${token}`
    },
    data: data
  })
}
