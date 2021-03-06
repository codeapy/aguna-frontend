import React, { useContext, useState } from 'react';
import { SketchPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/index';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';
import { CremaTheme } from '../../../types/AppContextPropsType';
import AppContext from '../../utility/AppContext';

interface SecondaryColorPickerProps {
  props?: any;
}

const SecondaryColorPicker: React.FC<SecondaryColorPickerProps> = (props) => {
  const [visible, setVisibility] = useState(false);
  const { theme, updateTheme, secondary } = useContext(AppContext);

  // eslint-disable-next-line no-shadow
  const useStyles = makeStyles((theme: CremaTheme) => ({
    cpSwatch: {
      display: `flex`,
      alignItems: `center`,
      position: `relative`,
      cursor: `pointer`,
      marginBottom: 10,
      marginRight: 10,
    },
    cpColor: {
      width: 30,
      height: 16,
      backgroundColor: theme.palette.secondary.main,
      border: `solid 1px ${grey[100]}`,
      marginRight: 10,
      [theme.breakpoints.up(`xl`)]: {
        width: 40,
        height: 26,
      },
    },
    cpPopover: {
      position: `absolute`,
      left: 0,
      top: 0,
      zIndex: 1,
    },
  }));

  const classes = useStyles(props);

  return (
    <>
      <Box className={classes.cpSwatch} onClick={() => setVisibility(!visible)}>
        <Box className={classes.cpColor} />
        <Box component="span" className="font-extrabold">
          Secondary
        </Box>
      </Box>
      {visible ? (
        <Box className={classes.cpPopover} onClick={() => setVisibility(false)}>
          <SketchPicker
            color={secondary}
            onChangeComplete={(color) => {
              theme.palette.secondary.main = color.hex;
              updateTheme!(theme);
            }}
          />
        </Box>
      ) : null}
    </>
  );
};

export default SecondaryColorPicker;
