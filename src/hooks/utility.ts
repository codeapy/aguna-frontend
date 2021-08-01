import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { fetchError, fetchStart, fetchSuccess } from '@/redux/actions';

export function usePrevious<T>(value: T, defaultValue?: T): T | null {
  const ref = useRef<T | null>(defaultValue ?? null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useRequestLoader(loading: boolean, error?: ApolloError) {
  const dispatch = useDispatch();

  const prevLoading = usePrevious(loading);

  useEffect(() => {
    if (loading) {
      dispatch(fetchStart());
    } else if (prevLoading) {
      dispatch(fetchSuccess());
    }
  }, [dispatch, loading, prevLoading]);

  useEffect(() => {
    if (error) {
      dispatch(fetchError(error.message));
    }
  }, [dispatch, error]);
}
