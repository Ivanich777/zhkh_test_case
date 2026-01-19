import { MetersTable } from 'components/Table/MetersTable.tsx';
import { createRootStore } from 'stores/RootStore.ts';

function App() {
  const store = createRootStore();

  return <MetersTable store={store} />;
}

export default App;
