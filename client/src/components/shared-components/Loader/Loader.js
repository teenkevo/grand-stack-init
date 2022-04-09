import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/react";

import React from "react";

const loaderCSS = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-color: red;
`;

export default function Loader(props) {
  return (
    <CircleLoader
      color="#ff5e00"
      loading={props.loading}
      css={loaderCSS}
      size={50}
    />
  );
}
