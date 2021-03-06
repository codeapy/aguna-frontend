import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import AppHeader from './AppHeader';
import { ContentView, ThemeSetting } from '../../../index';
import useStyles from './index.style';
import AppFooter from './AppFooter';
import AppFixedFooter from './AppFixedFooter';
import AppContext from '../../../utility/AppContext';
import AppSidebar from './AppSidebar';
import { LayoutType } from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../types/AppContextPropsType';

interface HorLightNavProps {
  props?: any;
}

const HorLightNav: React.FC<HorLightNavProps> = ({ children, ...props }) => {
  const classes = useStyles(props);
  const { footer, layoutType, footerType } =
    useContext<AppContextPropsType>(AppContext);

  return (
    <Box
      className={clsx(
        classes.appMain,
        `appMainHor`,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : ``,
        {
          appMainFooter: footer && footerType === `fluid`,
          appMainFixedFooter: footer && footerType === `fixed`,
        },
      )}
    >
      <AppHeader />
      <Box className={classes.mainContent}>
        <AppSidebar />
        <Box className={classes.mainContainer}>
          <ContentView>{children}</ContentView>
        </Box>
      </Box>
      <ThemeSetting />
      <AppFooter />
      <AppFixedFooter />
    </Box>
  );
};

export default HorLightNav;
