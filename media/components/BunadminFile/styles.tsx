import { createStyles, makeStyles, Theme } from "@material-ui/core"

interface Props {
  id: string
  width?: number
}

export default function styles({ id, width }: Props) {
  const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
      root: {
        width: width || 150
      },
      Card: { margin: id ? "20px 0" : "20px 5px 20px 0", borderWidth: 1 },
      DropZone: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: id ? 0 : theme.spacing(6)
      },
      BottomButtons: {
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        padding: 0,
        paddingBottom: "0!important"
      },
      BottomIcon: { color: theme.bunadmin.iconColor, width: 21, height: 21 },
      UploadText: {
        color: "#FFF",
        fontSize: 12,
        opacity: 0.6,
        textShadow: "1px 1px 10px #fff",
        backgroundColor: "rgba(0, 0, 0, .5)",
        borderRadius: 5,
        padding: "0 3px"
      }
    })
  })
  return useStyles()
}
