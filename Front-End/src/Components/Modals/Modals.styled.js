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

export const Tags = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  max-width: 100%;
  padding-left: 14px;
  border: 1px grey solid;
  border-radius: 5px;
  color: black;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Input = styled.input`
  width: 100%;
  min-width: 50%;
  padding: 14px;
  padding-left: 14px;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  margin: 7px 0;
  margin-right: 10px;
  padding: 0 10px;
  padding-right: 5px;
  border: 1px solid orange;
  border-radius: 5px;
  background-color: orange;
  white-space: nowrap;
  color: white;
`

export const TagButton = styled.button`
  display: flex;
  padding: 6px;
  border: none;
  background-color: unset;
  cursor: pointer;
  color: white;
`
