/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react';

export type LoadingValue<T, E> = {
  value?: T;
  loading: boolean;
  error?: E;
  setError: (error: E) => void;
  setValue: (value?: T) => void;
  reset: () => void;
};

type ReducerState<T, E> = {
  value?: T;
  loading: boolean;
  error?: E;
};

type ErrorAction<E> = { type: 'error'; error: E };
type ResetAction = { type: 'reset'; defaultValue?: any };
type ValueAction = { type: 'value'; value: any };
type ReducerAction<E> = ErrorAction<E> | ResetAction | ValueAction;

const defaultState = (defaultValue?: any) => ({
  loading: defaultValue === undefined || defaultValue === null,
  value: defaultValue,
});

function reducer<T, E>() {
  return (state: ReducerState<T, E>, action: ReducerAction<E>): ReducerState<T, E> => {
    switch (action.type) {
      case 'error':
        return {
          ...state,
          error: action.error,
          loading: false,
          value: undefined,
        };
      case 'reset':
        return defaultState(action.defaultValue);
      case 'value':
        return {
          ...state,
          error: undefined,
          loading: false,
          value: action.value,
        };
      default:
        return state;
    }
  };
}

export function useLoadingValue<T, E>(getDefaultValue?: () => T): LoadingValue<T, E> {
  const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
  const [state, dispatch] = useReducer(reducer<T, E>(), defaultState(defaultValue));

  const reset = () => {
    const defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    dispatch({ type: 'reset', defaultValue });
  };

  const setError = (error: E) => {
    dispatch({ type: 'error', error });
  };

  const setValue = (value?: T) => {
    dispatch({ type: 'value', value });
  };

  return useMemo(
    () => ({
      value: state.value,
      loading: state.loading,
      error: state.error,
      setError,
      setValue,
      reset,
    }),
    [state.error, state.loading, reset, setError, setValue, state.value],
  );
}
