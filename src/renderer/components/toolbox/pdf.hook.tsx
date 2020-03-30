import { ipcRenderer } from 'electron';
import * as React from 'react';
import { CREATE_PDF_EVENT } from '../../../main/events';
import { useNotification } from '../../context/notification.context';

export function useModalInvoice(text: string) {
  const [isModalVisible, setModalVisibility] = React.useState<boolean>(false);
  const { showNotificationFor } = useNotification();

  const setModal = React.useCallback(
    (_, path: string) => {
      setModalVisibility((prev) => !prev);
      showNotificationFor(5000, text, path);
    },
    [showNotificationFor, text],
  );

  function createPDF(data: any) {
    ipcRenderer.once(CREATE_PDF_EVENT, setModal);
    const key = Object.keys(data)[0];
    ipcRenderer.send(CREATE_PDF_EVENT, data[key]);
    setModalVisibility(true);
  }

  return {
    createPDF,
    isModalVisible,
  };
}
