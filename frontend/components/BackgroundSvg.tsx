import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
  return (
  <Svg
    viewBox="0 0 900 600"
    width={400}
    height={400}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#FFF" d="M0 0H900V600H0z" />
    <Path
      d="M0 465l11.5 4.7c11.5 4.6 34.5 14 57.5 10.5s46-19.9 69.2-21.4c23.1-1.5 46.5 11.9 69.6 23.5C231 494 254 504 277 501s46-19 69-23.8c23-4.9 46 1.5 69.2 1 23.1-.5 46.5-7.9 69.6-4.7 23.2 3.2 46.2 16.8 69.2 23.3s46 5.9 69 4.4 46-3.9 69.2-4.2c23.1-.3 46.5 1.3 69.6 1.8 23.2.5 46.2-.1 69.2-3.1s46-8.4 57.5-11L900 482v119H0z"
      fill="#DED2EA"
      strokeLinecap="round"
    />
  </Svg>
  )
}

export default SvgComponent
