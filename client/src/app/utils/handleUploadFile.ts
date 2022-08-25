import { AsyncThunk } from "@reduxjs/toolkit"

export const helperUpload = async (
  target: EventTarget & HTMLInputElement,
  dispatch: (params: object) => void,
  nameFunc: AsyncThunk<string, object, {}>
) => {
  const formData = new FormData()
  if (target.files) {
    const filesImg = target.files[0]
    formData.append("image", filesImg)
    dispatch(nameFunc(formData))
  }
}
