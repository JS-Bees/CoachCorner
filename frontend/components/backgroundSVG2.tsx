import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { G, Rect, ClipPath, Defs} from 'react-native-svg';
import { Dimensions } from "react-native";

const { width} = Dimensions.get('window');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SVGComponent (props: any) {
    return(
        <Svg 
        viewBox="0 0 360 252"
        width={width}
        height={290}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
         <G clipPath="url(#clip0_31_117)">
          <Path fill="#DED2EA" d="M411.357 100.388C412.38 122.721 393.515 140.853 371.24 138.946L22.8493 109.122C3.39518 107.456 -11.4165 90.9606 -10.9857 71.4401L-8.70206 -32.0446C-8.25122 -52.4741 8.67568 -68.6701 29.1052 -68.2192L369.451 -60.7085C388.907 -60.2792 404.705 -44.8511 405.596 -25.4104L411.357 100.388Z" />  
          <Path 
            d="M176.503 109.187C177.655 57.0195 345.425 155.571 385.152 105.167C446.626 106.524 418.846 104.998 417.695 157.166C416.544 209.333 365.777 250.524 304.303 249.167C242.83 247.811 175.352 161.354 176.503 109.187Z"
            fill="#F9FBFC"/>
          <Path  
            d="M-15.0569 108.127C-13.9057 55.9599 38.292 10.0495 99.7652 11.4061C161.238 12.7627 146.125 74.7276 269.921 109.137C173.839 86.4262 197.806 208.912 136.333 207.556C74.8594 206.199 -16.2081 160.295 -15.0569 108.127Z" 
            fill="#F9FBFC"/>   
            </G> 

            <Defs>
                <ClipPath id="clip0_31_117">
                    <Rect width={490}
                          height={291}
                          fill="#F9FBFC"
                          transform="translate(421.88 251.762) rotate(-178.736)"/>
                </ClipPath>  
            </Defs>      
        </Svg>
        
    )
}

export default SVGComponent