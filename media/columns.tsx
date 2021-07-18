import { Column } from "material-table"
import Type from "./types"
import React from "react"
import { Button, Tooltip } from "@material-ui/core"
import BunadminFile from "./components/BunadminFile"
import { ENV } from "@bunred/bunadmin"

export default ({ t }: any) =>
  [
    { title: t("Id"), field: "id", editable: "never", width: 160 },
    { title: t("File Type"), field: "type", width: 115 },
    {
      title: t("Preview"),
      field: "file_name",
      render: rowData => (
        <BunadminFile
          width={100}
          viewMode={true}
          prefix={ENV.FILE_PREVIEW_URL}
          file={rowData}
        />
      )
    },
    {
      title: t("File Name"),
      field: "file_name",
      width: 115,
      render: r => (
        <Tooltip title={r.file_name} placement="top" arrow>
          <Button>Show</Button>
        </Tooltip>
      )
    },
    { title: t("File Size"), field: "file_size", width: 115 },
    { title: t("Rank"), field: "sn", width: 115 },
    { title: t("Media Name"), field: "media_name", width: 115 },
    { title: t("Display Name"), field: "display_name", width: 115 },
    {
      title: t("Created At"),
      field: "created_at",
      editable: "never",
      grouping: false,
      defaultSort: "desc",
      width: 115,
      render: r => r && new Date(r.created_at).toLocaleString()
    },
    {
      title: t("Updated At"),
      field: "updated_at",
      editable: "never",
      grouping: false,
      render: r => (r ? new Date(r.updated_at).toLocaleString() : "")
    },
    { title: t("User"), field: "user_id ", width: 160 }
  ] as Column<Type>[]
