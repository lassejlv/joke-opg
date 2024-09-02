import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import ky from 'ky';
import { useEffect, useState } from 'react';
import styles from '../App.module.scss';

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

const API = 'https://officialjokeapi-production.up.railway.app/random_joke';

export const Route = createFileRoute('/')({
  component: function Home() {
    const [showPunchline, setShowPunchLine] = useState(false);

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
      queryKey: ['joke'],
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

        {showPunchline && <p className={styles.punchlineText}>{data.punchline}</p>}

        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Fetching...' : 'Get another joke'}
        </button>
      </div>
    );
  },
});
