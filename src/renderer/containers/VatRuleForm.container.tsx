import { useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import * as React from 'react';
import { VatRuleForm } from '../components/vatRules/VatRuleForm.component';
import { CREATE_VAT_RULE } from '../graphql/mutations';

export function VATFormContainer() {
  const [createVAT] = useMutation(CREATE_VAT_RULE);
  const [isOpen, setStatus] = React.useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setStatus(true)}>New VAT Rule</Button>
      <VatRuleForm
        isOpen={isOpen}
        handleClose={() => setStatus(false)}
        createVatRule={createVAT}
      />
    </>
  );
}
