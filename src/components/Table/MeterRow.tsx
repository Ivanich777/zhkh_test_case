import React from 'react';
import { RowComponentProps } from 'react-window';
import { RootStoreType } from 'stores/RootStore';
import { Row, Td } from './MetersTableStyled';
import { getMeterIcon } from 'utils';

interface ExtraProps {
  store: RootStoreType;
}

export function MeterRow(
  props: RowComponentProps<ExtraProps>
): React.ReactElement | null {
  const { index, style, store, ariaAttributes } = props;
  const meter = store.meters[index];
  if (!meter) return null;

  const area = store.getAreaById(meter.areaId);
  const rowNumber = store.offset + index + 1;
  const icon = getMeterIcon(meter.type);

  return (
    <Row style={style} {...ariaAttributes}>
      <Td>{rowNumber}</Td>
      <Td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && <img src={icon} width={20} height={20} />}
          {meter.typeLabel}
        </div>
      </Td>
      <Td>{area?.fullAddress ?? 'Загрузка...'}</Td>
      <Td>{meter.installationDate}</Td>
      <Td>{meter.isAutomatic ? 'Да' : 'Нет'}</Td>
      <Td>{meter.initialValues}</Td>
      <Td>{meter.description}</Td>
    </Row>
  );
}
