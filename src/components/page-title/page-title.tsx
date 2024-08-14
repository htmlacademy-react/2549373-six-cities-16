import { JSX } from 'react';
import { Helmet } from 'react-helmet-async';

type PageTitleProps = {
  title: string;
};

function PageTitle({ title = '' }: PageTitleProps): JSX.Element {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default PageTitle;

