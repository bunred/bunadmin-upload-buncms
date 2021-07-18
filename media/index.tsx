import React from "react"
import {
  Table,
  TableHead,
  tableIcons,
  TableDefaultProps as DefaultProps
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
      <TableHead title={t(SchemaLabel)} />
      <Table
        title={t(SchemaLabel)}
        columns={SchemaColumns({ t })}
        editable={editableCtrl()}
        // icons
        icons={tableIcons({ theme })}
        // options
        options={{
          ...DefaultProps.options,
          selection: false,
          filtering: true
        }}
        // data
        data={async query => await dataCtrl(query)}
      />
    </>
  )
}
