import { useEffect, useMemo } from 'react';

import { onSnapshot, FirestoreError, query, Query, orderBy, CollectionReference } from '@firebase/firestore';

import { useLoadingValue } from '../utils/useLoadingValue';

interface IUseCollectionDataHookProps {
  collection: Query | CollectionReference;
  order?: string[];
}

function useCollectionDataHook<T>(
  props: IUseCollectionDataHookProps,
): [data: T[] | null, loading: boolean, error: FirestoreError | undefined] {
  const { collection, order = [] } = props;
  const { value, loading, error, setValue, setError, reset } = useLoadingValue<T[], FirestoreError>();

  const getCollectionDataRef = () => {
    return order?.length ? query(collection, ...order.map((o) => orderBy(o))) : collection;
  };

  useEffect(() => {
    const unSub = onSnapshot(
      getCollectionDataRef(),
      (snapshot) => {
        // @ts-ignore
        setValue(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      },
      setError,
    );

    return () => {
      reset();
      unSub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => [value ? value : null, loading, error], [value, loading, error]);
}

export default useCollectionDataHook;
