import { IPluginData } from "@bunred/bunadmin"

const commonProps = {
  team: "buncms",
  group: "upload-buncms",
  customized: true
}
const data: IPluginData[] = [
  {
    ...commonProps,
    id: "buncms_upload_media",
    name: "media",
    label: "Files",
    icon: "cloud-upload-outline",
    icon_type: "eva"
  }
]
export default data
