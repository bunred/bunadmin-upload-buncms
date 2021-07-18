import React, { useMemo } from "react"
import { ENV } from "@bunred/bunadmin"
import uploadMediaCtrl from "../controllers/uploadMediaCtrl"
import { EditComponentProps } from "material-table"
import BunadminFile from "./BunadminFile"
import deleteSer from "../services/deleteSer"

interface Props {
  width?: number
  uploadPrefix?: string
  rowData?: any
  viewMode?: boolean
  editProps?: EditComponentProps<any>
}

export default function Cover({
  width,
  uploadPrefix,
  viewMode,
  editProps,
  rowData
}: Props) {
  const item = viewMode ? rowData : editProps?.rowData

  return useMemo(
    () => (
      <BunadminFile
        width={width}
        viewMode={viewMode}
        prefix={ENV.FILE_PREVIEW_URL}
        onDrop={({ files, prefix, setImageUrl }) =>
          uploadMediaCtrl({
            editProps: editProps,
            files,
            prefix,
            setImageUrl,
            uploadPrefix: uploadPrefix
          })
        }
        onDel={({ file }) => deleteSer(file)}
        file={item.cover || {}}
      />
    ),
    [item.cover]
  )
}
