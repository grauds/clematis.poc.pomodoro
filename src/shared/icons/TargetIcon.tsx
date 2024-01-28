import React from "react";

interface ITargetIcon {
  active?: boolean;
}

export function TargetIcon({ active }: ITargetIcon): React.JSX.Element {
  return active ? (
    <svg
      width="115"
      height="115"
      viewBox="0 0 115 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z"
        stroke="#FFAE35"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M57.5 95C78.2107 95 95 78.2107 95 57.5C95 36.7893 78.2107 20 57.5 20C36.7893 20 20 36.7893 20 57.5C20 78.2107 36.7893 95 57.5 95Z"
        stroke="#FFAE35"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M57.5 78C68.8218 78 78 68.8218 78 57.5C78 46.1782 68.8218 37 57.5 37C46.1782 37 37 46.1782 37 57.5C37 68.8218 46.1782 78 57.5 78Z"
        stroke="#FFAE35"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="129"
      height="129"
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
        stroke="#C4C4C4"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z"
        stroke="#C4C4C4"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z"
        stroke="#C4C4C4"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TargetIcon