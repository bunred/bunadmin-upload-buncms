import { request, storedToken, ENV } from "@bunred/bunadmin"
import Type from "../types"
import { SchemaName } from "../plugin"

export default async function updateSer(newData: Type, oldData: Type) {
  const token = await storedToken()

  const gql = `
    mutation MyMutation {
      __typename
      update_${SchemaName}(where: {id: {_eq: "${oldData.id}"}}, _set: {name: "${newData.file_name}"}) {
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
