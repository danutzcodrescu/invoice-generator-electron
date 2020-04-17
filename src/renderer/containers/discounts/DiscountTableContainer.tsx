import * as React from 'react';
import { Loading } from '../../components/toolbox/Loading.component';
import { Query, Discount } from '../../generated/graphql';
import { GET_DISCOUNTS } from '../../graphql/discounts/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  UPDATE_DISCOUNT,
  DELETE_DISCOUNT,
} from '../../graphql/discounts/mutations';
import { useNotification } from '../../context/notification.context';
import { DiscountTable } from '../../components/discounts/DiscountTable.component';
import { Dialog } from '@material-ui/core';
import { DiscountForm } from '../../components/discounts/DiscountForm.component';

export function DiscountsTableContainer() {
  const { data, loading, error } = useQuery<Query>(GET_DISCOUNTS);
  const [discount, setDiscount] = React.useState<Discount | undefined>(
    undefined,
  );
  const [updateDiscount] = useMutation(UPDATE_DISCOUNT, {
    onCompleted: () => {
      setDiscount(undefined);
    },
    refetchQueries: [{ query: GET_DISCOUNTS }],
  });
  const { showNotificationFor } = useNotification();
  const [deleteDiscount] = useMutation(DELETE_DISCOUNT, {
    onCompleted: () => {
      showNotificationFor(5000, 'Discount deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_DISCOUNTS,
      },
    ],
  });

  function submit(values: { name: string; percentage: number }) {
    updateDiscount({
      variables: {
        data: values,
        id: discount!.id,
      },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <DiscountTable
        discounts={data?.discounts ?? []}
        openEdit={setDiscount}
        deleteDiscount={deleteDiscount}
      />
      <Dialog open={Boolean(discount)}>
        <DiscountForm
          close={() => setDiscount(undefined)}
          title="Edit discount"
          submit={submit}
          values={{
            name: discount?.name,
            percentage: discount?.percentage,
          }}
        />
      </Dialog>
    </>
  );
}
