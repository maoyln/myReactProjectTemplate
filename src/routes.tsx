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
import CustomEventDemo from './pages/CustomEventDemo/CustomEventDemo' // CustomEvent的使用说明及示例
import CustomTable from './pages/CustomTable/CustomTable' // 动态表格+mock数据
import CustomTreeTable from './pages/CustomTreeTable/CustomTreeTable' // 动态树形表格+mock数据
import CustomLazyTreeTable from './pages/CustomLazyTreeTable/CustomLazyTreeTable' // 动态树形表格+mock数据懒加载

import TableMy from './pages/TableMy' // 我的表格
import TextOverflow from './pages/TextOverflow/TextOverflow'; // 测试文字超出显示... 全局配置显示Iip
import LazyLoadingDemo from './pages/LazyLoadingDemo'; // 文件懒加载
import IntersectionObserverDemo from './pages/IntersectionObserverDemo'; // 图片懒加载
import LazyLoadPicture from './pages/LazyLoadPicture/LazyLoadPicture'; // 图片懒加载
import DocumentFragmentDemo from './pages/DocumentFragmentDemo/DocumentFragmentDemo'; // DocumentFragment 是一个轻量级的文档对象
import MultiColumnTable from './pages/MultiColumnTable/MultiColumnTable'; // 多列table
import MultiColumnTreeTable from './pages/MultiColumnTreeTable/MultiColumnTreeTable'; // 多列树形table
import TreeTable from './pages/TotalMaterialVolumeLedger/components/TreeTable'; // 多列树形table
import AgGridReactDemo from './pages/TotalMaterialVolumeLedger/AgGridReactDemo'; // 多列树形table
import MaterialUITable from './pages/TotalMaterialVolumeLedger/MaterialUITable'; // 多列树形table
// import Handsontable from './pages/Handsontable/Handsontable-virtualization'; // Handsontable可编辑大数据表格
// import Handsontable from './pages/Handsontable/Handsontable'; // Handsontable可编辑大数据表格
// import Handsontable from './pages/Handsontable/Handsontable-tree'; // Handsontable可编辑大数据表格
import Handsontable from './pages/Handsontable/Handsontable-1108-1'; // Handsontable可编辑大数据表格
// import Handsontable from './pages/Handsontable/Handsontable-1108-2'; // Handsontable可编辑大数据表格
// import Handsontable from './pages/Handsontable/Handsontable-1108-3'; // Handsontable可编辑大数据表格
// import Handsontable from './pages/Handsontable/Handsontable-1108-4'; // Handsontable可编辑大数据表格
import FixedSizeList from './pages/TotalMaterialVolumeLedger/FixedSizeList'; // FixedSizeList可编辑大数据表格
import VirtualTable from './pages/TotalMaterialVolumeLedger/VirtualTable'; // VirtualTable虚拟表格
import HandsonTableLeaning from './pages/HandsonTableLeaning/pages'; // handsontable系统学习


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
      <Route path='/customEventDemo' element={<CustomEventDemo />}></Route>
      <Route path='/customTable' element={<CustomTable />}></Route>
      <Route path='/customTreeTable' element={<CustomTreeTable />}></Route>
      <Route path='/textOverflow' element={<TextOverflow />}></Route>
      <Route path='/lazyLoadingDemo' element={<LazyLoadingDemo />}></Route>
      <Route path='/intersectionObserverDemo' element={<IntersectionObserverDemo />}></Route>
      <Route path='/customLazyTreeTable' element={<CustomLazyTreeTable />}></Route>
      <Route path='/lazyLoadPicture' element={<LazyLoadPicture />}></Route>
      <Route path='/documentFragmentDemo' element={<DocumentFragmentDemo />}></Route>
      <Route path='/multiColumnTable' element={<MultiColumnTable />}></Route>
      <Route path='/multiColumnTreeTable' element={<MultiColumnTreeTable />}></Route>
      <Route path='/treeTable' element={<TreeTable workPointId={'431088157479469056'} />}></Route>
      <Route path='/agGridReactDemo' element={<AgGridReactDemo />}></Route>
      <Route path='/materialUITable' element={<MaterialUITable />}></Route>
      <Route path='/handsontable' element={<Handsontable />}></Route>
      <Route path='/fixedSizeList' element={<FixedSizeList workPointId={'431088157479469056'} />}></Route>
      <Route path='/virtualTable' element={<VirtualTable />}></Route>
      <Route path='/handsonTableLeaning' element={<HandsonTableLeaning />}></Route>
      
    </Routes>
  </Router>
);

export default AppRoutes;
