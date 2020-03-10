import { Column } from "material-table"
import Type from "./types"
import React from "react"
import { Button, Tooltip } from "@material-ui/core"
import BunadminFile from "@plugins/buncms-file/media/components/BunadminFile"
import { ENV } from "@/utils/config"

export default [
  { title: "Id", field: "id", editable: "never", width: 160 },
  { title: "Type", field: "type" },
  {
    title: "Preview",
    field: "file_name",
    width: 160,
    render: rowData => (
      <BunadminFile
        width={135}
        viewMode={true}
        prefix={ENV.SITE_URLS[2]}
        file={rowData}
      />
    )
  },
  {
    title: "File Name",
    field: "file_name",
    render: r => (
      <Tooltip title={r.file_name} placement="top" arrow>
        <Button>Show</Button>
      </Tooltip>
    )
  },
  { title: "File Size", field: "file_size" },
  { title: "Rank", field: "sn" },
  { title: "Media Name", field: "media_name" },
  { title: "Display Name", field: "display_name" },
  {
    title: "Created At",
    field: "created_at",
    editable: "never",
    grouping: false,
    defaultSort: "desc",
    render: r => r && new Date(r.created_at).toLocaleString()
  },
  {
    title: "Updated At",
    field: "updated_at",
    editable: "never",
    grouping: false,
    render: r => (r ? new Date(r.updated_at).toLocaleString() : "")
  },
  { title: "User", field: "user_id ", width: 160 }
] as Column<Type>[]
