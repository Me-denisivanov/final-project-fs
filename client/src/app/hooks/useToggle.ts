import { useState } from "react"

type ToogleState = [boolean, () => void]

const useToggle = (initialValue: boolean): ToogleState => {
  const [value, setValue] = useState(initialValue)

  const toggle = (): void => {
    setValue(!value)
  }

  return [value, toggle]
}

export default useToggle
