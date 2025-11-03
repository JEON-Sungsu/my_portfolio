export const theme = {
  colors: {
    primary: '#0066CC',
    secondary: '#FF6B6B',
    background: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    gray: '#F5F5F5',
    grayDark: '#E0E0E0',
    white: '#FFFFFF',
    black: '#000000',
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
    xxl: '64px',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },

  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.1)',
  },

  transition: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
}

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#4D9FFF',
    background: '#1A1A1A',
    text: '#E0E0E0',
    textLight: '#B0B0B0',
    gray: '#2A2A2A',
    grayDark: '#3A3A3A',
  },
}
