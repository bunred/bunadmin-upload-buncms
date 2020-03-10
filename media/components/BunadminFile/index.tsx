import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import ViewIcon from "@material-ui/icons/OpenInNew"
import DropZone from "react-dropzone"
import FilePreview from "../FilePreview"
import styles from "./styles"

export interface OnDropProps {
  files: any[]
  prefix?: string
  setImageUrl: Dispatch<SetStateAction<string>>
}

interface Props {
  file: any
  title?: string
  width?: number
  prefix?: string

  onDrop?: ({ files, prefix, setImageUrl }: OnDropProps) => Promise<void>
  onDel?: ({ file }: { file: any }) => Promise<void>

  cardStyle?: object
  mediaStyle?: object

  viewMode?: boolean
  multipleUpload?: boolean
  hideUploadTip?: boolean
}

export default function BunadminFile(props: Props) {
  const {
      file,
      title,
      width,
      prefix,
      onDrop,
      onDel,
      cardStyle,
      mediaStyle = {},
      viewMode,
      multipleUpload,
      hideUploadTip
    } = props,
    { id, file_name, media_name } = file,
    default_image = "/p/default.jpg"

  const classes = styles({ id, width })
  const [uploading, setUploading] = React.useState(false),
    [imageUrl, setImageUrl] = React.useState(
      id ? `${prefix}/${file_name}` : default_image
    ),
    [preview, setPreview] = useState(false)

  const handleOnDrop = async (acceptedFiles: any[]) => {
    setUploading(true)
    if (onDrop) {
      await onDrop({ files: acceptedFiles, prefix, setImageUrl })
    }
    setUploading(false)
  }

  const handleDelMedia = async () => {
    setUploading(true)
    if (onDel) {
      await onDel({ file })
      setImageUrl(default_image)
    }
    setUploading(false)
  }

  const CardBottomArea = () => (
    <CardActions>
      <CardContent className={classes.BottomButtons}>
        {!id ? (
          <Button disabled={viewMode} color="primary">
            {viewMode ? "No picture" : "Upload"}
          </Button>
        ) : (
          <>
            <IconButton
              disabled={uploading}
              color="primary"
              onClick={id ? () => setPreview(true) : () => null}
              aria-label={id ? "View" : "Upload"}
            >
              <ViewIcon className={classes.BottomIcon} />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="Delete"
              onClick={() => handleDelMedia()}
            >
              <DeleteIcon className={classes.BottomIcon} />
            </IconButton>
          </>
        )}
      </CardContent>
    </CardActions>
  )

  useEffect(() => {
    multipleUpload && console.log(multipleUpload)
  }, [media_name])

  return (
    <div className={classes.root}>
      <FilePreview
        preview={preview}
        setPreview={setPreview}
        title={title}
        file={file}
        url={imageUrl}
      />

      <Card
        className={classes.Card}
        style={{
          ...(viewMode && mediaStyle),
          ...cardStyle
        }}
        onClick={() => id && viewMode && setPreview(true)}
      >
        <DropZone onDrop={acceptedFiles => handleOnDrop(acceptedFiles)}>
          {({
            getRootProps,
            getInputProps
          }: {
            getRootProps: any
            getInputProps: any
          }) => {
            if (!uploading) {
              return (
                <CardActionArea>
                  {!viewMode && (
                    <div {...getRootProps()} className={classes.DropZone}>
                      <div className={classes.UploadText}>
                        {!hideUploadTip &&
                          (!id ? "upload_or_drag" : "upload_or_drag_replace")}
                      </div>
                      <input {...getInputProps()} />
                    </div>
                  )}
                  <CardMedia
                    style={mediaStyle}
                    component="img"
                    image={imageUrl}
                  />
                  {!id && <CardBottomArea />}
                </CardActionArea>
              )
            } else {
              return (
                <div
                  className={classes.DropZone}
                  style={{
                    ...mediaStyle,
                    position: "relative"
                  }}
                >
                  <CircularProgress />
                </div>
              )
            }
          }}
        </DropZone>

        {!viewMode && (id || uploading) && <CardBottomArea />}
      </Card>
    </div>
  )
}
