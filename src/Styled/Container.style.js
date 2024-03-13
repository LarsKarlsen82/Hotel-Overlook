import styled from 'styled-components'

export const Container = styled.section`
    background-color: ${props => props.theme.colors.light};
    width: 100%;
    max-width: ${props => props.$maxwidth}px ;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 1rem;
    overflow: auto;
    border: solid 1px #000;
    
`