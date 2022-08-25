import React, { useState } from "react"
import useToggle from "../../hooks/useToggle"

import { Typography } from "@mui/material"
import { addSortedValue } from "../../redux/slices/products"
import { useAppDispatch } from "../../redux/hooks"

interface ISortedObj {
  name: string
  sortValue: string
}

const Sorted: React.FC = () => {
  const dispatch = useAppDispatch()

  const sortArray: ISortedObj[] = [
    { name: "цене", sortValue: "price" },
    { name: "рейтинг", sortValue: "rate" },
    { name: "названию", sortValue: "name" },
  ]

  const [openSort, toggleOpenSort] = useToggle(false)
  const [indexSort, setIndexSort] = useState(0)
  const nameSort = sortArray[indexSort].name

  const handleSortType = (sortItem: string, idx: number): void => {
    dispatch(addSortedValue(sortItem))
    setIndexSort(idx)
  }

  return (
    <>
      <Typography
        component={"div"}
        sx={{
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={toggleOpenSort}
      >
        Сортировать по: <span className="sort__span">{nameSort}</span>
        {openSort && (
          <div>
            <ul>
              {sortArray &&
                sortArray.map((item, idx) => (
                  <li
                    key={idx}
                    className="sort__span"
                    onClick={() => handleSortType(item.sortValue, idx)}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Typography>
    </>
  )
}

export default Sorted
