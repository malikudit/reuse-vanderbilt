import React from "react";
import { useRouteError } from "react-router-dom";
import CategoryPage from "./CategoryPage";

export default function ErrorPage() {
  const error = useRouteError();

  let message;

  if (error.status === 404) {
    message = <p>There's nothing here.</p>;
  } else if (error.status === 500) {
    message = <p>There was a problem fetching the data for this page.</p>;
  } else {
    message = <p>An unexpected error occurred.</p>;
  }

  return <CategoryPage>{"Beans"}</CategoryPage>;
}
