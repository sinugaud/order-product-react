import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/product-service/ProductList';
import OrderService from './components/order-service/OrderService';
import ProductDetails from './components/product-service/ProductDetails';
import OrderList from './components/order-service/OrderList';
import NavBar from './components/navbar/Navbar';
import OrderDetails from './components/order-service/OrderDetail';
import { FormComponent } from './components/product-service/FormComponent';
import Res from './components/navbar/Res';
import Sidebar from './components/navbar/Sidebar';
import Login from './components/login/Login';
import Logout from './components/login/Logout';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Signup from './components/signup/Signup';
import { NavbarWithSearch } from './components/navbar/NavbarWithSearch';
import { MegaMenuWithHover } from './components/navbar/MegaMenuWithHover';
import UserProfile from './components/profile/UserProfile';

function App() {
  // <Helmet>
  //   <link rel="stylesheet" type="text/css" href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/vendor/css/rtl/theme-semi-dark.css" className="template-customizer-theme-css" />
  // </Helmet>
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  return (
    <div className="App">

      <Routes>
      {/* <Route path='/AdminDashboard' element={<ProtectedRoutes Component={AdminDashboard} />} /> */}


        <Route path='/' element={<ProductList />} />
        <Route path='/place-order/:id' element={<OrderService />} />
        <Route path='/product-detail/:id' element={<ProductDetails />} />
        {/* <Route path='/orders'
          element={
            <ProtectedRoute Component={OrderList} />
          } /> */}
        <Route path='/orders' element={<ProtectedRoute Component={OrderList}/>} />
        {/* <ProtectedRoute
          path="/order"
          component={OrderList}
          isLoggedIn={isLoggedIn}
        /> */}
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/nav-sec' element={<NavbarWithSearch />} />
        

        <Route path='/navbar' element={<NavBar />} />
        <Route path='/order-detail/:id' element={<OrderDetails />} />
        <Route path='/form' element={<FormComponent />} />
        <Route path='/nav' element={<Res />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={< Logout />} />
        <Route path='/menu-bar' element={< MegaMenuWithHover />} />

        <Route path='/profile' element={< UserProfile />} />
        
      </Routes>
    </div>
  );
}

export default App;
