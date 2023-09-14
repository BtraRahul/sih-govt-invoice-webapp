import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

function InvoiceItem(props) {
  const { onItemizedItemEdit, currency, onRowDel, items } = props;

  const itemTable = items.map((item) => (
    <ItemRow
      onItemizedItemEdit={onItemizedItemEdit}
      item={item}
      onDelEvent={onRowDel}
      key={item.id}
      currency={currency}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={props.onRowAdd}>
        Add Item
      </Button>
    </div>
  );
}

function ItemRow(props) {
  const { onDelEvent, item, onItemizedItemEdit, currency } = props;

  const handleDelEvent = () => {
    onDelEvent(item);
  };

  return (
    <tr>
      <td style={{ width: '100%' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'name',
            placeholder: 'Item name',
            value: item.name,
            id: item.id,
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'description',
            placeholder: 'Item description',
            value: item.description,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: 'number',
            name: 'quantity',
            min: 1,
            step: '1',
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: 'number',
            name: 'price',
            min: 1,
            step: '0.01',
            precision: 2,
            textAlign: 'text-end',
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: '50px' }}>
        <BiTrash
          onClick={handleDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
}

export default InvoiceItem;
