import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-left: 0.5px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <p>Header</p>
    </StyledHeader>
  );
};

export default Header;
