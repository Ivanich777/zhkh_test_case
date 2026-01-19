import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreType } from 'stores/RootStore';

import {
  Wrapper,
  Table,
  Thead,
  Th,
  HeaderRow,
  Tr,
  Td,
} from './MetersTableStyled.ts';

interface Props {
  store: RootStoreType;
}

export const MetersTable: React.FC<Props> = observer(({ store }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    store.fetchMeters(0);
  }, [store]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        store.hasMore &&
        !store.isLoading
      ) {
        store.loadNextPage();
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [store]);

  return (
    <Wrapper ref={wrapperRef}>
      <Table>
        <Thead>
          <HeaderRow>
            <Th>№</Th>
            <Th>Тип</Th>
            <Th>Адрес</Th>
            <Th>Дата установки</Th>
            <Th>Авто</Th>
            <Th>Показания</Th>
            <Th>Описание</Th>
          </HeaderRow>
        </Thead>

        <tbody>
          {store.meters.map((meter, index) => {
            const area = store.getAreaById(meter.areaId);

            /** TODO
             * Вот тут(79-84) я пока не понимаю как лучше сделать. Можн было в
             модель засунуть и там жестко к булиан приводить. Но проблема в
             том что я не знаю какой контракт от бэка на meter, и тип нулл
             непонятно норм что прилетает или нет. Просто по-логике
             isAutomatic либо тру либо фолс. Нулл непонятно для чего там. Так
             что прошу прощения за такой костыль.
             P.S. Потом посмотрел что сервер возвращаяет. И там у isAutomatic либо false либо null.
             Буду думать что нулл это тру иначе нелогично / И также номер в таблице это порядковый номер строки таблицы или серийный номер ???
             */
            return (
              <Tr key={meter.id}>
                <Td>{index + 1}</Td>
                <Td>{meter.typeLabel}</Td>
                <Td>{area ? area.fullAddress : 'Загрузка...'}</Td>
                <Td>{meter.installationDate}</Td>
                <Td>
                  {' '}
                  {meter.isAutomatic || meter.isAutomatic === null
                    ? 'Да'
                    : 'Нет'}
                </Td>
                <Td>{meter.initialValues}</Td>
                <Td>{meter.description}</Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>

      {store.isLoading && <div style={{ padding: 16 }}>Загрузка...</div>}

      {store.error && (
        <div style={{ color: 'red', padding: 16 }}>{store.error}</div>
      )}
    </Wrapper>
  );
});
