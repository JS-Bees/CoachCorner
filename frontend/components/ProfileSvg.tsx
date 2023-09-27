import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProfileSvg(props: any) {
    return (
        <Svg
            viewBox="0 0 360 252"
            width={width}
            height={290}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fill="#BAABC8"
                d="M0 6.00001C0 -7.25483 10.7452 -18 24 -18H336C349.255 -18 360 -7.25483 360 6V195C360 208.255 349.255 219 336 219H24C10.7452 219 0 208.255 0 195V6.00001Z"
            />
            <Path
                d="M0 -6C0 -22.5685 13.4315 -36 30 -36H330C346.569 -36 360 -22.5685 360 -6V171C360 187.569 346.569 201 330 201H30C13.4314 201 0 187.569 0 171V-6Z"
                fill="#9787B8"
            />
        </Svg>
    );
}

export default ProfileSvg;

