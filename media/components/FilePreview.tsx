import React, { Dispatch, SetStateAction, useState } from "react"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import ZoomInIcon from "@material-ui/icons/ZoomIn"
import ZoomOutIcon from "@material-ui/icons/ZoomOut"

interface Props {
  preview: boolean
  setPreview: Dispatch<SetStateAction<boolean>>
  title?: string
  fullScreen?: boolean
  url: string
  file: any
}

export default function FilePreview({
  title,
  preview,
  setPreview,
  fullScreen,
  url,
  file
}: Props) {
  const [state, setState] = useState({ fullScreen: fullScreen })

  function handleFullWidthChange() {
    setState({ ...state, fullScreen: !state.fullScreen })
  }
  const handleClose = () => {
    setPreview(false)
  }

  return (
    <div>
      <Dialog
        fullScreen={state.fullScreen}
        maxWidth="md"
        open={preview}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {title && (
          <DialogTitle
            style={{ textAlign: "center" }}
            id="responsive-dialog-title"
          >
            {title}
            {file.created_at || "File not uploaded"}
          </DialogTitle>
        )}
        <div>
          <Card style={{ borderRadius: 0 }} onClick={handleClose}>
            <CardActionArea>
              <CardActions style={{ padding: 0, justifyContent: "center" }}>
                <CardMedia
                  style={{ width: "max-content" }}
                  component="img"
                  image={url}
                  alt={title}
                  title={title}
                  onClick={handleClose}
                />
              </CardActions>
            </CardActionArea>
          </Card>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {file.media_name || file.created_at}
          </Button>

          <IconButton aria-label="Preview" onClick={handleFullWidthChange}>
            {!state.fullScreen ? <ZoomInIcon /> : <ZoomOutIcon />}
          </IconButton>

          <IconButton aria-label="Close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
