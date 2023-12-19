import styled, { css } from "styled-components";

const test = css`
  text-align: center;
`;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      ${test}
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
    `}
`;

export default Heading;
