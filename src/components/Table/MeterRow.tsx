import { RowComponentProps } from 'react-window';
import { observer } from 'mobx-react-lite';
import { Row, Td } from './MetersTableStyled';
import { getMeterIcon } from 'utils';
import { RootStoreType } from 'stores/RootStore';

interface RowProps {
  store: RootStoreType;
}

export const MeterRow = observer(
  ({
    index,
    style,
    ariaAttributes,
    store,
  }: RowComponentProps & RowProps): React.ReactElement | null => {
    const meter = store.meters[index];
    if (!meter) return null;

    const area = meter.areaId ? store.getAreaById(meter.areaId) : undefined;
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
);
