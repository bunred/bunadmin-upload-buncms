import React from "react"
import {
  CommonTable,
  CommonTableHead,
  tableIcons,
  CommonTableDefaultProps as DefaultProps
} from "@bunred/bunadmin"
import { useTheme } from "@material-ui/core/styles"

import { SchemaLabel, SchemaColumns } from "./plugin"
import dataCtrl from "./controllers/dataCtrl"
import editableCtrl from "./controllers/editableCtrl"
import { useTranslation } from "react-i18next"

export default function media() {
  const { t } = useTranslation("table")
  const theme = useTheme()

  return (
    <>
      <CommonTableHead title={t(SchemaLabel)} />
      <CommonTable
        title={t(SchemaLabel)}
        columns={SchemaColumns({ t })}
        editable={editableCtrl()}
        // icons
        icons={tableIcons({ theme })}
        // options
        options={{
          ...DefaultProps.options,
          selection: false,
          filtering: true,
          fixedColumns: {
            left: 3,
            right: 1
          }
        }}
        // data
        data={async query => await dataCtrl(query)}
      />
    </>
  )
}
