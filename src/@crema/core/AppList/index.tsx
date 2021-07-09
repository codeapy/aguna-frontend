import React from 'react';
import ListView from './ListView';
import ListFooter from './ListFooter';

interface AppListProps {
  border?: boolean;
  footerProps?: any;
  data: any[];

  renderRow(item: any, index: number | null): any;

  onEndReached?(): void;

  [x: string]: any;
}

const AppList: React.FC<AppListProps> = ({
  footerProps,
  renderRow,
  onEndReached,
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  border = false,
  ...props
}) => (
  <ListView
    renderRow={renderRow}
    onEndReached={onEndReached}
    data={data}
    {...props}
    ListFooterComponent={
      footerProps ? (
        <ListFooter
          loading={footerProps.loading}
          footerText={footerProps.footerText}
        />
      ) : null
    }
  />
);

export default AppList;
