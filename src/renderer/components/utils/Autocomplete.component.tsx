import { MenuItem, Paper, TextField } from '@material-ui/core';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import * as React from 'react';
import { FieldInputProps } from 'react-final-form';

interface Props {
  onSelect: (selected: any) => void;
  input: FieldInputProps<any, HTMLElement>;
  itemToString: (item: any) => string;
  data: any[];
  searchKeys: string[];
}

export const Autocomplete = (props: Props) => {
  const { onSelect, input, itemToString, data, searchKeys } = props;
  return (
    <Downshift
      {...input}
      onSelect={onSelect}
      onInputValueChange={inputValue => {
        input.onChange(inputValue);
      }}
      itemToString={itemToString}
      selectedItem={input.value}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => {
        const filteredItems = matchSorter(data, inputValue ? inputValue : '', {
          keys: searchKeys,
          //@ts-ignore
          maxRanking: matchSorter.rankings.CONTAINS,
        });
        return (
          <div>
            <TextField
              InputLabelProps={{ ...getLabelProps() }}
              //@ts-ignore
              InputProps={{
                ...getInputProps({
                  name: input.name,
                  placeholder: 'Profile',
                }),
              }}
            />

            {isOpen && !!filteredItems.length && (
              <Paper square>
                {filteredItems.map((item: any, index: number) => (
                  <MenuItem
                    key={item.id}
                    {...getItemProps({
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {itemToString(item)}
                  </MenuItem>
                ))}
              </Paper>
            )}
          </div>
        );
      }}
    </Downshift>
  );
};
