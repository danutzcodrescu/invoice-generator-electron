import { useQuery } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import * as React from 'react';
import { Loading } from '../components/toolbox/Loading.component';
import { VatRuleForm } from '../components/vatRules/VatRuleForm.component';
import { VatTable } from '../components/vatRules/VatTable.component';
import { Query, VatRule } from '../generated/graphql';
import { GET_VAT_RULES } from '../graphql/queries';

export function VatTableContainer() {
  const { data, loading, error } = useQuery<Query>(GET_VAT_RULES);
  const [rule, setRule] = React.useState<VatRule | undefined>(undefined);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <VatTable vats={data!.vatRules} openEdit={setRule} />
      <Dialog open={Boolean(rule)}>
        <VatRuleForm
          close={() => setRule(undefined)}
          title="Edit VAT rule"
          submit={}
        />
      </Dialog>
    </>
  );
}
