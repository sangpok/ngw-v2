import Dashboard from './View/Dashboard';
import Login from './View/Login';

import { createUid, setUserData } from '@Store/UserAuthSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const storeDispatch = useDispatch();

  const { uid } = useSelector((state) => state.UserAuthSlice);

  const onSubmit = (userInfo) => {
    storeDispatch(createUid());
    storeDispatch(setUserData({ ...userInfo }));
  };

  return <>{uid ? <Dashboard uid={uid} /> : <Login onSubmit={onSubmit} />}</>;
}

export default App;
