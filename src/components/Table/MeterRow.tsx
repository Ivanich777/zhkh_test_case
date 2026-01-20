import { RowComponentProps } from 'react-window';
import { observer } from 'mobx-react-lite';
import { Row, Td, DeleteButton } from './MetersTableStyled';
import { getMeterIcon } from 'utils';
import { RootStoreType } from 'stores/RootStore';
import deleteIcon from '/assets/icons/DELETE.svg';

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

    const onDelete = () => {
      store.deleteMeter(meter.id);
    };

    return (
      <Row style={style} {...ariaAttributes}>
        <Td>{rowNumber}</Td>
        <Td>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon && <img alt="..." src={icon} width={20} height={20} />}
            {meter.typeLabel}
          </div>
        </Td>
        <Td>{meter.installationDate}</Td>
        <Td>{meter.isAutomatic ? 'Да' : 'Нет'}</Td>
        <Td>{meter.initialValues}</Td>
        <Td>{area?.fullAddress ?? 'Загрузка...'}</Td>
        <Td>{meter.description}</Td>

        <DeleteButton className="delete-btn" onClick={() => onDelete()}>
          <img alt="..." src={deleteIcon} width={40} height={40} />
        </DeleteButton>
      </Row>
    );
  }
);
