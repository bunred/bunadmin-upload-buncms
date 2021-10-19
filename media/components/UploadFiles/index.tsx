import React from "react"
import { Drawer } from "@bunred/bunadmin"
import { useStyles } from "./styles"
import { TFunction } from "i18next"

export const useFilesStyles = useStyles

interface Props {
  t: TFunction
  viewMode?: boolean
  maximum?: number // default 6
  buttonTitlePreview?: string
  buttonTitleUpdate?: string
  listFiles?: () => void
  files: any[]
  FilesList: () => JSX.Element[]
  sortingFiles?: (filesElement: HTMLElement) => void
  UploadArea: () => JSX.Element
}

export default function UploadFiles(props: Props) {
  const classes = useStyles()
  const {
    t,
    viewMode,
    maximum = 6,
    buttonTitlePreview,
    buttonTitleUpdate,
    listFiles,
    files,
    FilesList,
    sortingFiles,
    UploadArea
  } = props

  async function handleOnOpen({
    contentRef
  }: {
    contentRef: React.MutableRefObject<any | undefined>
  }) {
    // reload files when drawer opened
    if (listFiles) {
      await listFiles()
    }

    if (viewMode) return

    const filesElement: HTMLElement = contentRef.current
    if (!filesElement) return

    if (sortingFiles) {
      sortingFiles(filesElement)
    }
  }

  return (
    <div>
      <Drawer
        width="100%"
        height={225}
        direction="bottom"
        buttonTitle={
          viewMode
            ? buttonTitlePreview || t("Preview Files")
            : buttonTitleUpdate || t("Update Files")
        }
        buttonDisabled={viewMode && files.length === 0}
        onOpen={handleOnOpen}
        contentClassName={classes.files}
        {...props}
      >
        {FilesList}

        {/* Upload new file */}
        {!viewMode && files.length + 1 <= maximum && <UploadArea />}
      </Drawer>
    </div>
  )
}
