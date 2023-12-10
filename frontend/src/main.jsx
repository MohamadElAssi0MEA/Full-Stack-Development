import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ServiceAccess from './screens/ServiceAccess.jsx';
import Inventory from './screens/Inventory.jsx'; 
import AnalyticsReports from './screens/AnalyticsReports.jsx';
import InventorySummary from './screens/InventorySummary.jsx';
import MostSold from './screens/MostSold.jsx';
import WastedProducts from './screens/WastedProducts.jsx';
import PaymentChoice from './screens/PaymentChoice.jsx';
import NewProduct from './screens/NewProduct.jsx';
import ModifyProduct from './screens/ModifyProduct.jsx';
import ChangePriceBulk from './screens/ChangePriceBulk.jsx';
import ProductsWasted from './screens/ProductsWasted.jsx';
import PointOfSale from './screens/PointOfSale.jsx';

// 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/services' element={<ServiceAccess />} />
        {/* Add the following route for Inventory */}
        <Route path='/services/pointofsale' element={<PointOfSale />} />
        <Route path='/services/inventory' element={<Inventory />} />
        <Route path='/services/inventory/newproduct' element={<NewProduct />} />
        <Route path='/services/inventory/modifyproduct' element={<ModifyProduct />} />
        <Route path='/services/inventory/changepricebulk' element={<ChangePriceBulk />} />
        <Route path='/services/inventory/productswasted' element={<ProductsWasted />} />
        <Route path='/services/analytics' element={<AnalyticsReports />} />
        <Route path='/services/analytics/inventorysummary' element={<InventorySummary />} />
        <Route path='/services/analytics/mostsold' element={<MostSold />} />
        <Route path='/services/analytics/wastedproducts' element={<WastedProducts />} />
        <Route path='/services/analytics/paymentchoice' element={<PaymentChoice />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
