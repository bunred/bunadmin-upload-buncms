import React, { useMemo } from "react"
import { ENV } from "@/utils/config"
import uploadMediaCtrl from "@plugins/buncms-file/media/controllers/uploadMediaCtrl"
import { EditComponentProps } from "material-table"
import BunadminFile from "@plugins/buncms-file/media/components/BunadminFile"
import deleteSer from "@plugins/buncms-file/media/services/deleteSer"

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
        prefix={ENV.SITE_URLS[2]}
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
