import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';
import { useNotification } from '../../context/notification.context';
import { ADD_DISCOUNT } from '../../graphql/discounts/mutations';
import { Mutation } from '../../generated/graphql';
import { DiscountForm } from '../../components/discounts/DiscountForm.component';

interface Props {}

export function DiscountFormContainer() {
  const { showNotificationFor } = useNotification();
  const [createDiscount] = useMutation(ADD_DISCOUNT, {
    onCompleted: (data: Mutation) => {
      if (data.addDiscount) {
        showNotificationFor(5000, 'Discount created successfully');
      }
    },
  });

  function submit(values: { name?: string; percentage: number }, form: any) {
    createDiscount({
      variables: {
        data: { ...values },
      },
    }).then(() => form.reset());
  }
  return (
    <DiscountForm title="Create discount" submit={submit} close={() => null} />
  );
}
