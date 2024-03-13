export const theme = {
    colors: {
        primary: '#5C1F06',
        secondary: '#D97852',
        tertiary: '#524641',
        quarternary: '#707070',
        quinary: '#D1B3A7',
        senary: '#A68E85',
        dark: '#000',
        light: '#fff'
    },
    fonts: ['Titilium Web', 'Open Sans'],
    fontsizes: {
        xs: '0.8rem',
        s: '0.9rem',
        m: '1rem',
        l: '1.5rem',
        xl: '2.5rem',
    },
    // Theme Grid
    grid: {
        // Breakpoints to be used in media queries
        breakpoints: {
            xs: '320px',
            s: '480px',
            m: '768px',
            l:'992px',
            xl: '1200px',
        },
        // Grid area for mobile
        mobile: {
            primary: {
                rows: '1fr 10fr 1fr',
                columns: '5fr 1fr',
                areas: `
                'header header header header header navbar '
                'main main main main main main'
                'footer footer footer footer footer footer '
                `
            }
        },
        // Grid areas for tablet
        tablet: {
            primary: {
                rows: '1fr 10fr 1fr',
                columns: '5fr 1fr',
                areas: `
                'header navbar navbar navbar navbar navbar '
                'main main main main main main'
                'footer footer footer footer footer footer '
                `
            }
        },
        // Grid areas for desktop
        desktop: {
            primary: {
                rows: '1fr 10fr 1fr',
                columns: '1fr 5fr',
                areas: `
                'header navbar navbar navbar navbar navbar '
                'main main main main main main'
                'footer footer footer footer footer footer '
                `
            }
        }
                
        
    }
}