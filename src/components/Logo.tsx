import React from "react";
import variables from '../styles/variables.scss';

interface Props {
  width?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}
export const Logo: React.FC<Props> = ({
  width = 319,
  backgroundColor = variables.pallete0,
  foregroundColor = "white",
}) => {
  const finalWidth = width;
  const finalHeight = finalWidth * 1.084;
  return (
    <>
      <svg
        width={finalWidth}
        height={finalHeight}
        viewBox={`0 0 319 346`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2_24)">
          <g clipPath="url(#clip1_2_24)">
            <path
              d="M16.8457 0C7.5131 0 0 7.51308 0 16.8457V244.58C0 253.913 7.5131 261.426 16.8457 261.426H89.4824L90.4687 287.607L141.088 307.781L111.141 326.354L179.781 346.006L165.68 325.342L226.58 308.613L208.354 278.574L245.064 261.426H301.943C311.276 261.426 318.789 253.913 318.789 244.58V16.8457C318.789 7.51308 311.276 0 301.943 0H16.8457Z"
              fill={backgroundColor}
            />
          </g>
          <path
            d="M93.4609 209V184.645L173.183 84.6738H131.835L127.162 110.87H96.8594V55.7871H222.743V82.2666L147.553 179.405H190.883L196.972 151.227H226V209H93.4609Z"
            fill={foregroundColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_2_24">
            <rect width="319" height="346" fill="white" />
          </clipPath>
          <clipPath id="clip1_2_24">
            <rect width="319" height="346" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default Logo;
