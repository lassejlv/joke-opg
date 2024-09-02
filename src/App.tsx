import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import ky from 'ky';

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

const API = 'https://officialjokeapi-production.up.railway.app/random_joke';

export default function App() {
  const [showPunchline, setShowPunchLine] = useState(false);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['joke'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return ky.get(API).json<Joke>();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (data && data.punchline) {
        setShowPunchLine(true);
      }
    }, 2000);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No Data was found</div>;

  return (
    <div className={styles.container}>
      <h1>{data.setup}</h1>

      {showPunchline && <p>{data.punchline}</p>}

      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Fetching...' : 'Get another joke'}
      </button>
    </div>
  );
}
