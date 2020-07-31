/**
 * Remote data controller
 */
import { Query } from "material-table"
import { notice } from "@bunred/bunadmin"
import listSer from "../services/listSer"
import { SchemaName } from "../plugin"

export default async function dataCtrl(query: Query<any>) {
  const { data: res, errors } = await listSer(query)

  if (errors) {
    await notice({
      title: "Fetch error",
      severity: "error",
      content: JSON.stringify(errors)
    })
    return {
      page: query.page,
      data: [],
      totalCount: 0
    }
  }

  const data = res && res[SchemaName]
  const totalCount =
    res &&
    res[`${SchemaName}_aggregate`] &&
    res[`${SchemaName}_aggregate`]["aggregate"]["count"]

  return {
    page: query.page,
    data: data,
    totalCount: totalCount
  }
}
