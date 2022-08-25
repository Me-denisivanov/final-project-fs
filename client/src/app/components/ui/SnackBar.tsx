import React from "react"
import { Alert, Snackbar } from "@mui/material"

interface ISnackBar {
  isOpen: boolean
  handleClose: () => void
}

const SnackBarMU: React.FC<ISnackBar> = ({ isOpen, handleClose }) => {
  return (
    <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={3000}>
      <Alert severity="success">Ваш заказ успешно оформлен</Alert>
    </Snackbar>
  )
}

export default SnackBarMU
