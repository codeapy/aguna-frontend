import React, { ReactNode, useEffect, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from 'next/router';

interface ScrollbarProps {
  children: ReactNode;
  className: string;
  router: any;

  [x: string]: any;
}

// eslint-disable-next-line react/display-name
const Scrollbar: React.FC<ScrollbarProps> = React.forwardRef(
  (props, ref: React.Ref<unknown>) => {
    const { children, className, router, ...others } = props;
    let _scrollBarRef = useRef<HTMLElement>(null);
    const { pathname } = router;

    useEffect(() => {
      if (_scrollBarRef) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _scrollBarRef._container.scrollTop = 0;
      }
    }, [_scrollBarRef, pathname]);

    return (
      <PerfectScrollbar
        ref={(refz) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _scrollBarRef = refz;
        }}
        {...others}
        className={className}
      >
        {children}
      </PerfectScrollbar>
    );
  },
);

export default withRouter(Scrollbar);
