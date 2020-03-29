/* eslint-disable @typescript-eslint/no-var-requires */
import { useMutation, useQuery } from '@apollo/react-hooks';
import { ipcRenderer } from 'electron';
import * as React from 'react';
import { CREATE_PDF_EVENT } from '../../main/events';
import { submitForm } from '../components/invoices/helpers';
import { InvoiceForm } from '../components/invoices/InvoiceForm.component';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { CREATE_INVOICE } from '../graphql/mutations';
import { GET_VAT_RULES } from '../graphql/queries';

export function InvoiceFormContainer() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const [createInvoice] = useMutation(CREATE_INVOICE, {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onCompleted: createPDF,
  });
  const [isModalVisible, setModalVisibility] = React.useState<boolean>(false);
  const { showNotificationFor } = useNotification();

  const setModal = React.useCallback(
    (_, path: string) => {
      setModalVisibility((prev) => !prev);
      showNotificationFor(5000, 'Invoice succesfully created', path);
    },
    [showNotificationFor],
  );

  function createPDF(data: any) {
    ipcRenderer.send(CREATE_PDF_EVENT, data.createInvoice);
    setModalVisibility(true);
  }

  React.useEffect(() => {
    ipcRenderer.on(CREATE_PDF_EVENT, setModal);

    return () => {
      ipcRenderer.off(CREATE_PDF_EVENT, setModal);
    };
  }, [setModal]);
  return (
    <>
      <InvoiceForm
        vat={data}
        title="New invoice"
        createInvoice={createInvoice}
        type="Invoice"
        submitButtonText="Create invoice"
        submitForm={submitForm}
      />
      {/* TODO mock in storybook  */}
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating invoice"
      ></LoadingModal>
    </>
  );
}
