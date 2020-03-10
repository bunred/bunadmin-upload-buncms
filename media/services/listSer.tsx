/**
 * Remote data controller
 */
import { Query } from "material-table"
import request from "@/utils/scripts/request"
import storedToken from "@/utils/scripts/storedToken"
import { ENV } from "@/utils/config"
import { SchemaName } from "../plugin"

export default async function listSer(query: Query<any>) {
  const { page, pageSize } = query
  const token = await storedToken()

  const gql = `
    query MyQuery {
      ${SchemaName}(limit: ${pageSize}, offset: ${pageSize *
    page}, order_by: {created_at: desc}) {
        id
        created_at
        updated_at
        user_id
        type
        file_name
        file_size
        sn
        media_name
        display_name
      }
      ${SchemaName}_aggregate {
        aggregate {
          count
        }
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
