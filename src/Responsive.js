import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media (max-width: 425px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media (max-width: 825px) {
      ${props}
    }
  `;
};

export const desktop = (props) => {
  return css`
    @media (min-width: 1375px) {
      ${props}
    }
  `;
};
