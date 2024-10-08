import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import AuthRoute from './components/AuthRoute';


import UpdateState from './pages/UpdateState';
import UpdateState2 from './pages/UpdateState2';
import CreatePortalDom from './pages/reactPortalDom'; // CreatePortal
import UseMemoDemo from './pages/UseMemoDemo'; // UseMemo
import UseCallbackDemo from './pages/UseCallbackDemo'; // UseCallbackDemo
import UseMemoAndCallback from './pages/UseMemoAndCallback'; // UseMemoAndCallback
import ContextMain from './pages/ContextDemo/ContextMain' // Context
import ForwardRefDemo from './pages/ForwardRefDemo' // ForwardRef
import ReduxDemo from './pages/ReduxDemo/App' // Redux
import PubSubAppDemo from './pages/SubscribePublish/PubSubAppDemo' // 发布订阅
import UseLayoutEffectDemo from './pages/UseLayoutEffectDemo/UseLayoutEffectDemo'; // useEffect 与 useLayoutEffect区别
import ReactHooksErrorFunction from './pages/ReactHooksError/ReactHooksErrorFunction' // 发布订阅
import ReactHooksErrorClass from './pages/ReactHooksError/ReactHooksErrorClass' // 发布订阅

import TableMy from './pages/TableMy' //

// 懒加载
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const AppRoutes = () => (
  <Router>
    <Routes>
    <Route path="/"  element={ <Navigate to='/login' replace /> } />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<AuthRoute element={<Dashboard />} />}
      />
      <Route
        path="/admin"
        element={<AuthRoute element={<AdminPage />} role="admin" />}
      />
      <Route path="/updateState" element={<UpdateState />} />
      <Route path="/updateState2" element={<UpdateState2 />} />
      <Route path="/reactPortalDom" element={<CreatePortalDom />} />
      <Route path="/useMemoDemo" element={<UseMemoDemo />} />
      <Route path="/useCallbackDemo" element={<UseCallbackDemo />} />
      <Route path="/useMemoAndCallback" element={<UseMemoAndCallback />} />
      <Route path='/contextDemo' element={<ContextMain />}></Route>
      <Route path='/forwardRefDemo' element={<ForwardRefDemo />}></Route>
      <Route path='/reduxDemo' element={<ReduxDemo />}></Route>
      <Route path='/pubSubAppDemo' element={<PubSubAppDemo />}></Route>
      <Route path='/tableMy' element={<TableMy />}></Route>
      <Route path='/useLayoutEffectDemo' element={<UseLayoutEffectDemo />}></Route>
      <Route path='/reactHooksErrorFunction' element={<ReactHooksErrorFunction />}></Route>
      <Route path='/reactHooksErrorClass' element={<ReactHooksErrorClass />}></Route>
      
      
    </Routes>
  </Router>
);

export default AppRoutes;
