import { createGlobalStyle } from "styled-components";
import { Reset } from './Mixins.style';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;

    }
    body {
        background-color: ${props => props.theme.colors.primary};
        ${Reset};
    }

    h1 {
        font-size: ${props => props.theme.fontsizes[5]};
        color: ${props => props.theme.colors.secondary};
        font-family: ${props => props.theme.fonts[0]};
    }

    h2 {
        font-size: 1.5rem;
    }
    //Fjerne scrollbaren
    ::-webkit-scrollbar {
        display:none;
      }
`