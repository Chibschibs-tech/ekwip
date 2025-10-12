'use client';
import Link, {LinkProps} from 'next/link';
import * as React from 'react';

type Props = LinkProps & {children?: React.ReactNode};
export default function LocaleLink({children, ...rest}: Props) {
  return <Link {...rest}>{children}</Link>;
}
