import React from 'react';
import { func, string } from 'prop-types';

import Switch from '@material-ui/core/Switch';

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  const ThemeContext = React.createContext(theme);
  return (
    <>
      <Switch
        checked={isLight}
        onChange={toggleTheme}
        name='Theme'
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </>
  );
};

Toggle.propTypes = {
  toggleTheme: func.isRequired,
  theme: string.isRequired,
};

export default Toggle;
