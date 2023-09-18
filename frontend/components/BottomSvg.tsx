import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { G, Rect, ClipPath, Defs} from 'react-native-svg';
import { Dimensions } from "react-native";

const { width, height} = Dimensions.get('window');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BottomComponent (props: any) {
    return(
        <Svg 
        viewBox="0 0 360 252"
        width={width}
        height={height * 1.5}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
         <G clipPath="url(#clip0_31_101)">
          <Path fill="#DED2EA" d="M-36.1396 151.105C-37.6549 128.8 -19.1946 110.256 3.11714 111.671L352.081 133.802C371.567 135.038 386.739 151.203 386.739 170.728V274.238C386.739 294.672 370.174 311.238 349.739 311.238H9.31088C-10.1503 311.238 -26.285 296.162 -27.604 276.746L-36.1396 151.105Z" />  
          <Path 
            d="M198.463 137.127C198.463 189.307 28.5595 94.4805 -10.0466 145.749C-71.5348 145.749 -43.7285 146.661 -43.7285 94.4805C-43.7285 42.3004 6.11749 0 67.6057 0C129.094 0 198.463 84.9464 198.463 137.127Z"
            fill="#F9FBFC"/>
          <Path  
            d="M390 133.96C390 186.14 338.828 233.191 277.34 233.191C215.852 233.191 229.594 170.907 105.069 139.238C201.629 159.823 174.966 37.8956 236.454 37.8956C297.942 37.8956 390 81.7795 390 133.96Z" 
            fill="#F9FBFC"/>   
            </G> 

            <Defs>
                <ClipPath id="clip0_31_101">
                    <Rect width={490}
                          height={291}
                          fill="#F9FBFC"
                          transform="translate(-50)"/>
                </ClipPath>  
            </Defs>      
        </Svg>
        
    )
}

export default BottomComponent;