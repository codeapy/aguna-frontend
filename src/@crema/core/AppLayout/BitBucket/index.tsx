import React, { ReactNode, useContext, useState } from 'react';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import AppSidebar from './AppSidebar';
import { AppContext, ContentView, ThemeSetting } from '../../../index';
import AppHeader from './AppHeader';
import useStyles from './index.style';
import { LayoutType } from '../../../../shared/constants/AppEnums';

interface BitBucketProps {
  children: ReactNode;
}

const BitBucket: React.FC<BitBucketProps> = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const { layoutType, footer } = useContext(AppContext);
  const classes = useStyles({ footer });

  return (
    <Box
      className={clsx(
        classes.appMain,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : ``,
        {
          bitBucketCollapsed: isCollapsed,
        },
      )}
    >
      <Hidden lgUp>
        <AppHeader />
      </Hidden>
      <AppSidebar isCollapsed={isCollapsed} setCollapsed={setCollapsed} />
      <Box className={classes.mainContent}>
        <Hidden mdDown>
          <Box className={classes.mainContainer}>
            <ContentView>{children}</ContentView>
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <ContentView>{children}</ContentView>
          </Box>
        </Hidden>
      </Box>
      <ThemeSetting />
    </Box>
  );
};

export default BitBucket;