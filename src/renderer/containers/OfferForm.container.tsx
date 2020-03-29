import { useMutation, useQuery } from '@apollo/react-hooks';
import { ipcRenderer } from 'electron';
import * as React from 'react';
import { CREATE_PDF_EVENT } from '../../main/events';
import { InvoiceForm } from '../components/invoices/InvoiceForm.component';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { submitOffer } from '../components/offer/offer.helpers';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { CREATE_OFFER } from '../graphql/mutations';
import { GET_VAT_RULES } from '../graphql/queries';

export function OfferFormContainer() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const [createInvoice] = useMutation(CREATE_OFFER, {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onCompleted: createPDF,
  });
  const [isModalVisible, setModalVisibility] = React.useState<boolean>(false);
  const { showNotificationFor } = useNotification();

  const setModal = React.useCallback(
    (_, path: string) => {
      setModalVisibility((prev) => !prev);
      showNotificationFor(5000, 'Offer succesfully created', path);
    },
    [showNotificationFor],
  );

  function createPDF(data: any) {
    ipcRenderer.send(CREATE_PDF_EVENT, data.insertOffer);
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
        title="New offer"
        createInvoice={createInvoice}
        submitButtonText="Create offer"
        type="Offer"
        submitForm={submitOffer}
      />
      {/* TODO mock in storybook  */}
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating offer"
      ></LoadingModal>
    </>
  );
}
