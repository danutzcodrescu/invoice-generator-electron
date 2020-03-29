import * as React from 'react';

const NotificationContext = React.createContext(null);

export function useNotification() {
  return {
    text: '',
    showNotificationFor: () => null,
    clearNotification: () => null,
    path: '',
  };
}

export function NotificationProvider(props) {
  return (
    <NotificationContext.Provider value={{}}>
      {props.children}
    </NotificationContext.Provider>
  );
}
