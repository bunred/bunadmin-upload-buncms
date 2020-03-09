import React from "react"
import MaterialTable from "material-table"
import { CommonTableHead } from "@/components/CommonTable"
import tableIcons from "@/components/CommonTable/models/tableIcons"
import { CommonTableDefaultProps as DefaultProps } from "@/components/CommonTable/models/defaultProps"
import { useTheme } from "@material-ui/core/styles"

import { SchemaLabel, SchemaColumns } from "./plugin"
import dataCtrl from "./controllers/dataCtrl"
import editableCtrl from "./controllers/editableCtrl"

export default function() {
  const theme = useTheme()

  return (
    <>
      <CommonTableHead title={SchemaLabel} />
      <MaterialTable
        title={SchemaLabel}
        columns={SchemaColumns}
        editable={editableCtrl()}
        // style
        style={DefaultProps.style}
        // localization props
        localization={DefaultProps.localization}
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
