import request from "@/utils/scripts/request"
import storedToken from "@/utils/scripts/storedToken"
import { ENV } from "@/utils/config"
import Type from "../types"
import { SchemaName } from "../plugin"

export default async function addSer(newData: Type) {
  const token = await storedToken()

  const gql = `
    mutation MyMutation {
      __typename
      insert_${SchemaName}(objects: {type: "${newData.type}", file_name: "${newData.file_name}", file_size: "${newData.file_size}", sn: "${newData.sn}", media_name: "${newData.media_name}", display_name: "${newData.display_name}"}) {
        affected_rows
      }
    }
  `

  return request("/graphql", {
    prefix: ENV.SITE_URLS[0],
    method: "POST",
    headers: { token },
    data: JSON.stringify({ query: gql })
  })
}
