import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
    `}
`;

export default Heading;
