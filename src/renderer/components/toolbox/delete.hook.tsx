import * as React from 'react';
import { DeleteObj } from './DeleteModal.component';
export function useDeleteItem() {
  const [obj, setObj] = React.useState<DeleteObj | undefined>();
  function close() {
    setObj(undefined);
  }
  return { obj, setObj, close };
}
