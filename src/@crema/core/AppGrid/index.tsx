import React from 'react';
import GridView from './GridView';
import GridFooter from './GridFooter';

interface AppGridProps {
  footerProps?: any;
  column?: number;
  responsive?: any;
  itemPadding?: number;
  animation?: any;
  data: any;
  containerStyle?: any;
  border?: any;

  renderRow(item: any, index: number | null): any;

  onEndReached?(): void;

  [x: string]: any;
}

const AppGrid: React.FC<AppGridProps> = ({
  footerProps,
  renderRow,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  border = false,
  data = [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onEndReached = () => {},
  ...rest
}) => (
  <GridView
    renderRow={renderRow}
    onEndReached={onEndReached}
    data={data}
    {...rest}
    ListFooterComponent={
      footerProps ? (
        <GridFooter
          loading={footerProps.loading}
          footerText={footerProps.footerText}
        />
      ) : null
    }
  />
);

export default AppGrid;
