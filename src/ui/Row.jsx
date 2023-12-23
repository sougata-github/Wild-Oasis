import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
