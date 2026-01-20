import { MetersTable } from 'components/Table/MetersTable.tsx';
import { createRootStore } from 'stores/RootStore.ts';
import { Header } from 'components/Header/Header.tsx';

function App() {
  const store = createRootStore();

  return (
    <>
      <Header />
      <MetersTable store={store} />
    </>
  );
}

export default App;
