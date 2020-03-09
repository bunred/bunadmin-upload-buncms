import { Column } from "material-table"
import Type from "./types"

export default [
  { title: "Id", field: "id", editable: "never", width: 160 },
  { title: "Type", field: "type" },
  { title: "Module", field: "module" },
  { title: "Field", field: "field" },
  { title: "File Name", field: "file_name" },
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
