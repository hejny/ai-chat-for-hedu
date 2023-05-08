import { useEffect, useState } from 'react';

export function useFetchData<T>(url: string): T | null {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json() as Promise<T>)
            .then((data) => setData(data))
            .catch((err) => console.log(`Error: ${err}`));
    }, [url]);

    return data;
}
