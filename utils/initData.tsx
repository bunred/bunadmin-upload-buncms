import { name } from "../package.json"
import { Collection as Schema } from "@/core/schema/collections"
import { Collection as Menu } from "@/core/menu/collections"

const BunadminSchema = Schema.name
const BunadminMenu = Menu.name

const created_at = Date.now()

export default {
  plugin: name,
  list: [
    {
      name: BunadminSchema,
      data: [
        {
          group: "file",
          name: "media",
          label: "Files",
          created_at,
          team: "buncms",
          columns: '[{"title":"Id","field":"id"}]',
          customized: true,
          id: "media_file"
        }
      ]
    },
    {
      name: BunadminMenu,
      data: [
        {
          rank: "0",
          label: "File",
          slug: "",
          parent: "",
          name: "file",
          icon_type: "eva",
          icon: "archive-outline",
          id: "buncms_media"
        },
        {
          rank: "0",
          label: "Media",
          slug: "/file/media",
          parent: "file",
          name: "media_file",
          id: "buncms_media_file"
        }
      ]
    }
  ]
}
