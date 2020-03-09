import { Typography } from '@material-ui/core';
import { ARRAY_ERROR } from 'final-form';
import * as React from 'react';

interface Props {
  submitErrors: any;
}

export function InvoiceFormErrors(props: Props) {
  const { submitErrors } = props;
  if (!submitErrors) return null;
  return (
    <>
      <Typography color="error">
        <b>Errors</b>
      </Typography>
      <ul>
        {submitErrors[ARRAY_ERROR].map((val: string, index: number) => (
          <Typography color="error" key={index} component="li">
            {val}
          </Typography>
        ))}
      </ul>
    </>
  );
}
