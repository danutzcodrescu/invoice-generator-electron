import { useLazyQuery } from '@apollo/react-hooks';
import { Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { subMonths } from 'date-fns';
import { ipcRenderer } from 'electron';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { EXPORT_DATA } from '../../main/events';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { useNotification } from '../context/notification.context';
import { GET_EXPORT_DATA } from '../graphql/queries';

export function ExportContainer() {
  const [getExportData, { called, data, loading }] = useLazyQuery(
    GET_EXPORT_DATA,
  );
  const { showNotificationFor } = useNotification();
  const [isModalVisible, setModalVisibility] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (data && !loading && called) {
      ipcRenderer.send(EXPORT_DATA, data);
      setModalVisibility(true);
    }
  }, [data, called, loading]);

  const toggleModal = React.useCallback(
    (_, path: string) => {
      setModalVisibility(false);
      showNotificationFor(5000, 'Exported archive succesfully created', path);
    },
    [showNotificationFor],
  );

  React.useEffect(() => {
    ipcRenderer.on(EXPORT_DATA, toggleModal);
    return () => {
      ipcRenderer.off(EXPORT_DATA, toggleModal);
    };
  }, [toggleModal]);

  return (
    <>
      <Form
        onSubmit={(values) =>
          getExportData({
            variables: { startDate: values.startDate, endDate: values.endDate },
          })
        }
        initialValues={{
          startDate: subMonths(new Date(), 3),
          endDate: new Date(),
        }}
        render={({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Field name="startDate">
                  {({ input, meta }) => (
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      label="Start date"
                      KeyboardButtonProps={{
                        'aria-label': 'change start date',
                      }}
                      {...input}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={3}>
                <Field name="endDate">
                  {({ input, meta }) => (
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      label="End date"
                      KeyboardButtonProps={{
                        'aria-label': 'change start date',
                      }}
                      {...input}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item>
                <Button color="primary" type="submit" disabled={invalid}>
                  Export
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
      <LoadingModal isOpen={isModalVisible} text="Exporting"></LoadingModal>
    </>
  );
}
