import { useMutation, useQuery } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import * as React from 'react';
import { ServiceForm } from '../components/services/ServicesForm.component';
import { ServiceTable } from '../components/services/ServiceTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useNotification } from '../context/notification.context';
import { Query, Service } from '../generated/graphql';
import { DELETE_SERVICE, UPDATE_SERVICE } from '../graphql/mutations';
import { GET_SERVICES } from '../graphql/queries';

export function ServicesTableContainer() {
  const { data, loading, error } = useQuery<Query>(GET_SERVICES);
  const [service, setService] = React.useState<Service | undefined>(undefined);
  const [updateService] = useMutation(UPDATE_SERVICE, {
    onCompleted: () => {
      setService(undefined);
    },
    refetchQueries: [{ query: GET_SERVICES }],
  });
  const { showNotificationFor } = useNotification();
  const [deleteService] = useMutation(DELETE_SERVICE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Service deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_SERVICES,
      },
    ],
  });

  function submit(values: { name: string; measurement: string; cost: number }) {
    updateService({
      variables: {
        data: values,
        id: service!.id,
      },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ServiceTable
        services={data?.services ?? []}
        openEdit={setService}
        deleteService={deleteService}
      />
      <Dialog open={Boolean(service)}>
        <ServiceForm
          close={() => setService(undefined)}
          title="Edit service/item"
          submit={submit}
          values={{
            name: service?.name,
            measurement: service?.measurement,
            cost: service?.cost?.toString(),
          }}
        />
      </Dialog>
    </>
  );
}
