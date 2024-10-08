import "./App.css";
import {  BrowserRouter as Router,Route, Routes } from "react-router-dom";
import ProductList from "./components/product-service/ProductList";
import OrderService from "./components/order-service/PlaceOrder";
import ProductDetails from "./components/product-service/ProductDetails";
import OrderList from "./components/order-service/OrderList";
import NavBar from "./components/navbar/Navbar";
import OrderDetails from "./components/order-service/OrderDetail";
import { FormComponent } from "./components/product-service/FormComponent";
import Sidebar from "./components/navbar/Sidebar";
import Login from "./components/login/Login";
// import Login from "./pages/login/Login"
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Signup from "./components/signup/Signup";
import UserProfile from "./components/profile/Profile";
import Profile from "./components/profile/Profile";
import Logout from "./components/login/Logout";
import ProfilePage from "./components/profile/ProfilePage";
import Cart from "./components/cart/Cart";
import AddToCart from "./components/cart/AddToCart";

function App() {
  return (
    <div className="App">

        <Routes>
          <Route index element={<ProductList />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/place-order/:id" element={<OrderService />} />
          <Route path="/product-detail/:id" element={<ProductDetails />} />
          <Route
            path="/orders"
            element={<ProtectedRoute Component={OrderList} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={ProfilePage} />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/pro" element={<ProfilePage />} />

          {/* <ProtectedRoute
          path="/order"
          component={OrderList}
          isLoggedIn={isLoggedIn}
        /> */}
          <Route path="/sign-up" element={<Signup />} />

          <Route path="/navbar" element={<NavBar />} />
          <Route path="/order-detail/:id" element={<OrderDetails />} />
          <Route path="/form" element={<FormComponent />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path='/logout' element={< Logout />} /> */}
          <Route path="/product/:" element={<ProductDetails />} />
          <Route path="/cart" element={<AddToCart/>} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
        </Routes>
    </div>
  );
}

export default App;
