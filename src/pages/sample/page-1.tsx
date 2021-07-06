import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Page1 = asyncComponent(
  () => import(`../../modules/sample/Pages/PageOne`),
);
export default AppPage(({ todo }: { todo: unknown }) => <Page1 todo={todo} />);

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  const todo = await res.json();

  // Pass data to the page via props
  return { props: { todo } };
}
