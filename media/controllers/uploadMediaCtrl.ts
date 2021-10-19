import { Dispatch, SetStateAction } from "react"
import { notice } from "@bunred/bunadmin"
import { OnDropProps } from "../components/BunadminFile"
import uploadFileSer from "../services/uploadFileSer"
import { EditComponentProps } from "material-table"

interface Props extends OnDropProps {
  editProps?: EditComponentProps<any>
  setImageUrl?: Dispatch<SetStateAction<string>>
  uploadPrefix?: string
}

export default async function uploadMediaCtrl({
  editProps,
  files,
  prefix,
  setImageUrl,
  uploadPrefix
}: Props) {
  const file = files[0]
  const formMedia = new FormData()
  // formMedia.append(field, file)
  formMedia.append("media", file)

  // Buncms File 上传图片
  const res = await uploadFileSer(formMedia, { prefix: uploadPrefix })

  if (res.file_name) {
    setImageUrl && setImageUrl(`${prefix}/${res.file_name}`)
    // await notice({ title: "Uploaded successfully" })

    // Insert to MUI Table Field
    if (!editProps) return
    const field = editProps.columnDef.field

    editProps.onChange(res.id || "")
    editProps.onRowDataChange({
      ...editProps.rowData,
      [field]: res.id || ""
    })
  } else {
    await notice({
      title: "Uploaded failed",
      severity: "error",
      content: res.errors || res.msg
    })
  }
}
