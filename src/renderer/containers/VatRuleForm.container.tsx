import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { VatRuleForm } from '../components/vatRules/VatRuleForm.component';
import { CREATE_VAT_RULE } from '../graphql/mutations';

interface Props extends RouteComponentProps {}

export function VATFormContainer(props: Props) {
  const [createVAT] = useMutation(CREATE_VAT_RULE);

  function submit(values: { name: string; vat: string }) {
    createVAT({
      variables: {
        ...values,
        vat: parseFloat(values.vat),
      },
    }).then(() => {
      props.history.goBack();
    });
  }
  return (
    <VatRuleForm
      submit={submit}
      close={props.history.goBack}
      title="Add new VAT rule"
    />
  );
}
