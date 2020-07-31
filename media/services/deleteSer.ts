import { request, storedToken, ENV } from "@bunred/bunadmin"
import Type from "../types"
import { SchemaName } from "../plugin"

export default async function deleteSer(oldData: Type) {
  const token = await storedToken()

  const gql = `
    mutation MyMutation {
      __typename
      delete_${SchemaName}(where: {id: {_eq: "${oldData.id}"}}) {
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
