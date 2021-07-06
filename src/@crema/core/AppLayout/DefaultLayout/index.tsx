import React, { useContext } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { ContentView, ThemeSetting } from '../../../index';
import useStyles from './index.style';
import AppFixedFooter from './AppFixedFooter';
import AppContext from '../../../utility/AppContext';
import { LayoutType } from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../types/AppContextPropsType';

interface DefaultLayoutProps {
  props: any;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { themeStyle, footer, layoutType, footerType } =
    useContext<AppContextPropsType>(AppContext);
  const classes = useStyles({ themeStyle, footer });

  return (
    <Box
      className={clsx(
        classes.appMain,
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

        <Hidden mdDown>
          <Box className={classes.mainContainer}>
            <ContentView>{props.children}</ContentView>
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <ContentView>{props.children}</ContentView>
          </Box>
        </Hidden>
      </Box>
      <AppFixedFooter />
      <ThemeSetting />
    </Box>
  );
};

export default DefaultLayout;
