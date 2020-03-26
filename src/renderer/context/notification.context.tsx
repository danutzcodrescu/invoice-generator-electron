/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';

const NotificationContext = React.createContext<any>(null as any);

interface Props {
  children: any;
}

export function useNotification() {
  const [state, dispatch] = React.useContext(NotificationContext);

  function showNotificationFor(delay: number, text: string, path?: string) {
    dispatch({ type: SHOW_NOTIFICATION, payload: { text, path } });
    setTimeout(() => {
      dispatch({ type: CLEAR_NOTIFICATION });
    }, delay);
  }
  return {
    text: state.text,
    showNotificationFor,
    clearNotification: () => dispatch({ type: CLEAR_NOTIFICATION }),
    path: state.path,
  };
}

export const SHOW_NOTIFICATION = 'SHHOW_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

interface State {
  isNotificationShown: boolean;
  path?: string;
  text: string | null;
}

const initialState = {
  isNotificationShown: false,
  path: undefined,
  text: null,
};

interface SimpleNotification {
  type: typeof SHOW_NOTIFICATION;
  payload: {
    text: string;
    path?: string;
  };
}

interface ClearNotification {
  type: typeof CLEAR_NOTIFICATION;
}

type Action = SimpleNotification | ClearNotification;

//TODO maybe add immer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, isNotificationShown: true, ...action.payload };
    case CLEAR_NOTIFICATION:
      return { ...initialState };
    default:
      throw new Error();
  }
}

export function NotificationProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
