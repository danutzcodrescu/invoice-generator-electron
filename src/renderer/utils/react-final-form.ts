import { MutableState, Mutator, Tools } from 'final-form';

export const setBulkValue: Mutator = (
  args: Array<[string, string]>,
  state: MutableState<any>,
  { changeValue }: Tools<any>,
) => {
  args.forEach(([key, value]) => changeValue(state, key, () => value));
};
