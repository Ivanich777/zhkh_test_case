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

import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'react-window';

import { RootStoreType } from 'stores/RootStore';

import { Th, Footer, Layout, Header, Body } from './MetersTableStyled';

import { Pagination } from 'components/Pagination/Pagination';

import { MeterRow } from 'components/Table/MeterRow.tsx';
import { Loader } from 'components/Lodaer/Lodaer.tsx';

interface Props {
  store: RootStoreType;
}

export const MetersTable: React.FC<Props> = observer(({ store }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(400);

  useEffect(() => {
    store.fetchMeters(0);
  }, [store]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setHeight(el.clientHeight);

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <Layout>
      <Header>
        <Th>№</Th>
        <Th>Тип</Th>
        <Th>Дата установки</Th>
        <Th>Автоматический</Th>
        <Th>Текущие показания</Th>
        <Th>Адрес</Th>
        <Th>Примечание</Th>
      </Header>

      <Body
        ref={containerRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {store.isLoading ? (
          <Loader />
        ) : (
          <List
            style={{ height, width: '100%' }}
            rowCount={store.meters.length}
            rowHeight={52}
            rowComponent={MeterRow}
            rowProps={{ store }}
            overscanCount={5}
          />
        )}
      </Body>

      <Footer>
        <Pagination store={store} />
      </Footer>
    </Layout>
  );
});
