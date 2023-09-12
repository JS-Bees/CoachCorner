/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
    <Svg
    viewBox="0 0 900 600"
    width={400}
    height={250}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#FFF" d="M0 0H900V600H0z" />
    <Path
      d="M0 314l25-.7c25-.6 75-2 125 5.2s100 22.8 150 47.5 100 58.3 150 52c50-6.3 100-52.7 150-66.8C650 337 700 355 750 369s100 24 125 29l25 5v198H0z"
      fill="#DED2EA"
      strokeLinecap="round"
    />
  </Svg>
  )
}

export default SvgComponent
