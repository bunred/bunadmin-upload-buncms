import { Dispatch, SetStateAction } from "react"
import { notice } from "@/core"
import { OnDropProps } from "buncms-file/media/components/BunadminFile"
import uploadFileSer from "../services/uploadFileSer"
import { EditComponentProps } from "material-table"

interface Props extends OnDropProps {
  editProps?: EditComponentProps<any>
  setImageUrl?: Dispatch<SetStateAction<string>>
}

export default async function uploadMediaCtrl({
  editProps,
  files,
  prefix,
  setImageUrl
}: Props) {
  const file = files[0]
  const formMedia = new FormData()
  // formMedia.append(field, file)
  formMedia.append("media", file)

  // Buncms File 上传图片
  const res = await uploadFileSer(formMedia)

  if (res.file_name) {
    setImageUrl && setImageUrl(`${prefix}/${res.file_name}`)
    // await notice({ title: "Uploaded successfully" })

    // Insert to media
    if (!editProps) return
    editProps.rowData.cover_id = res.id || "" // media id
  } else {
    await notice({
      title: "Uploaded failed",
      severity: "error",
      content: res.errors || res.msg
    })
  }
}
