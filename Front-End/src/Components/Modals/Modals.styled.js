import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
`;

export const StyledButton = styled(Button)`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background-color: pink;
  &:hover {
    background-color: pink;
    color: palevioletred;
  }
`;

export const Heading = styled.h1`
  color: ${(props) => `${props.theme.colors.persianGreen}`};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.large};
`;
