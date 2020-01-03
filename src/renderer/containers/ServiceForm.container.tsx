import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ServiceForm } from '../components/services/ServicesForm.component';
import { CREATE_SERVICE } from '../graphql/mutations';

interface Props extends RouteComponentProps {}

export function ServiceFormContainer(props: Props) {
  const [createService] = useMutation(CREATE_SERVICE);

  function submit(values: {
    name: string;
    measurement: string;
    cost?: number;
  }) {
    createService({
      variables: {
        ...values,
      },
    }).then(() => {
      props.history.goBack();
    });
  }
  return (
    <ServiceForm
      title="Create service/item"
      submit={submit}
      close={props.history.goBack}
    />
  );
}
