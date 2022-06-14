import React, { useEffect } from "react"

import { useSelector } from "../typed"
import { EntityPropsMeta, extractPropsMeta } from "../proxy"

const Proxy: React.FunctionComponent = () => {
  const people = useSelector((state) =>
    Object.values(state.entities.people.byId),
  )
  const cats = useSelector((state) =>
    Object.values(state.entities.cats.byOwnerId),
  )

  useEffect(() => {
    const getPropsMeta = (): EntityPropsMeta[] => [
      {
        names: ["person", "people"],
        path: "src/reducers/entities/people",
        props: extractPropsMeta(people),
      },
      {
        names: ["cat", "cats"],
        path: "src/reducers/entities/cats",
        props: extractPropsMeta(cats),
      },
    ]

    const handler = ({ key }: KeyboardEvent) => {
      if (key === "L") {
        console.log(getPropsMeta())
      }
      if (key === "S") {
        const fileUrl = URL.createObjectURL(
          new Blob([JSON.stringify(getPropsMeta(), null, 2)], {
            type: "application/json",
          }),
        )

        const link = document.createElement("a")
        link.setAttribute("href", fileUrl)
        link.setAttribute("download", "props-meta.json")
        link.style.display = "none"

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [people, cats])

  return null
}

export default Proxy
