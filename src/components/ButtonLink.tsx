import { Button, ButtonProps } from '@material-ui/core';
import Link, { LinkProps } from 'next/link';
import React from 'react';

function ButtonLink({ href, ...props }: LinkProps & ButtonProps) {
  return (
    <Link href={href}>
      <Button {...props} />
    </Link>
  );
}

export default ButtonLink;
