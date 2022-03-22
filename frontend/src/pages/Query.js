import React from "react";
import Planets from "../components/Planets";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const getMe = async (page) => {
    console.log(page);
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  };

  const [page, setPage] = React.useState(1);

  if (page === 0) {
    setPage(1);
  }
  const { data, status } = useQuery(["planets", page], () => getMe(page));

  return (
    <>
      <div>
        {status === "loading" && <h1>loading</h1>}
        {status === "error" && <h1>Error</h1>}
        {status === "success" && <Planets data={data} />}
      </div>
      <div className="buttons">
        <button className="btn" onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <h2>{page - 1}</h2>
        <h1 className="center">{page}</h1>
        <h2>{page + 1}</h2>
        <button className="btn" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}
