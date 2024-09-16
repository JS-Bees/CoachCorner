import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { G, Rect, ClipPath, Defs} from 'react-native-svg';
import {Filter} from 'react-native-svg';

function ProfilePicture(props: any) {
    return(
        <Svg 
        viewBox="0 0 360 252"
        width={171}
        height={166}
        fill={'none'}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
         <G clipPath="url(#filter0_d_62_958)">
          <Path stroke="white" stroke-width="4" d="M149 79C149 112.617 120.644 140 85.5 140C50.3558 140 22 112.617 22 79C22 45.3833 50.3558 18 85.5 18C120.644 18 149 45.3833 149 79Z" />  
            </G> 

            <Defs>
                <Filter id = "filter0_d_62_958" x="0" y="0" width="171" height="166" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="10"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.395833 0 0 0 0 0.395833 0 0 0 0 0.395833 0 0 0 0.15 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_62_958"/>
                feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_62_958" result="shape"/>

                </Filter>
            </Defs>      
        </Svg>
    )
}

export default ProfilePicture
