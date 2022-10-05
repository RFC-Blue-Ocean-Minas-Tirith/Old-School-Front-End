import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColumnCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledButton = styled.button`
  color: palevioletred;
  font-size: 1em;
  border: 1px solid palevioletred;
  border-radius: 6px;
  background-color: pink;
  &:hover {
    background-color: red;
  }
`;

export const LargeButton = styled(Button)`
  font-size: 2em;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
`;

export const Heading = styled.h1`
  color: ${(props) => `${props.theme.colors.persianGreen}`};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.large};
`;

export const Tags = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  padding-left: 14px;
  color: black;
`;

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
`;

export const TagButton = styled.button`
  display: flex;
  padding: 6px;
  border: none;
  background-color: unset;
  cursor: pointer;
  color: white;
`;

export const RightLabel = styled.label`
  padding: 2% 2% 0% 10%;
`;

export const LeftLabel = styled.label`
  padding: 2% 2% 2% 0%;
`;

export const Checkbox = styled.input`
  width: 5%;
`

export const Comment = styled.div`
  border: 1px solid black;
  border-radius: 5px;
`
