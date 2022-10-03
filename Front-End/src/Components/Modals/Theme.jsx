import { ThemeProvider } from 'styled-components';
// Theme Provider is a wrapper component that takes in a prop called theme (object)

const theme = {
  colors: {
    persianGreen: '#06B49A',
  },
  fonts: ['Times New Roman'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  }
};

// using the render props method, create a Theme component that renders children with
// all the properties from the Theme provider

const Theme = ({children}) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
