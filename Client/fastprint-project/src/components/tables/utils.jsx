import React from 'react';
import { CheckPicker } from 'rsuite';

export function Filter({ column, table }) {
  const firstValue = column.columnDef.type;
  const arr = Array.from(column.getFacetedUniqueValues().keys()).sort();
  const sortedUniqueValues = React.useMemo(
    () =>
      firstValue === 'oke' || firstValue === 'INT'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  const data = sortedUniqueValues
    .slice(0, 5000)
    .map((item) => ({ label: item, value: item }));

  return (
    <>
      <CheckPicker
        data={data}
        style={{ width: 224 }}
        onChange={(value) => column.setFilterValue(value)}
      />
    </>
  );
}