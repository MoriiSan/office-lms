import React from "react";

interface Props {
  hex: string;
}

const BookmarkIcon: React.FC<Props> = ({ hex = "" }) => {
  return (
    <svg
      viewBox="-5 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill={hex}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>bookmark_fill [#007b75]</title> <desc>Created with Sketch.</desc>
        <defs> </defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-265.000000, -2679.000000)"
            fill={hex}
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M219,2521 L219,2537.998 C219,2538.889 217.923,2539.335 217.293,2538.705 L214.707,2536.119 C214.317,2535.729 213.683,2535.729 213.293,2536.119 L210.707,2538.705 C210.077,2539.335 209,2538.889 209,2537.998 L209,2521 C209,2519.895 209.895,2519 211,2519 L217,2519 C218.105,2519 219,2519.895 219,2521"
                id="bookmark_fill-[#007b75]"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default BookmarkIcon;
