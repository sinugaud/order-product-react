import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/product-service/ProductList";
import OrderService from "./components/order-service/OrderService";
import ProductDetails from "./components/product-service/ProductDetails";
import OrderList from "./components/order-service/OrderList";
import NavBar from "./components/navbar/Navbar";
import OrderDetails from "./components/order-service/OrderDetail";
import { FormComponent } from "./components/product-service/FormComponent";
import Sidebar from "./components/navbar/Sidebar";
import Login from "./components/login/Login";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Signup from "./components/signup/Signup";
import UserProfile from "./components/profile/UserProfile";
import Stripes from "./components/stripe/Stripes";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/place-order/:id" element={<OrderService />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
        <Route
          path="/orders"
          element={<ProtectedRoute Component={OrderList} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute Component={OrderList} />}
        />
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
        <Route path="/login" element={<Login />} />
        {/* <Route path='/logout' element={< Logout />} /> */}
        <Route path="/product/:" element={<ProductDetails />} />


        <Route path="/profile" element={<UserProfile />} />
        <Route path="/payment" element={<Stripes />} />
      </Routes>
    </div>
  );
}

export default App;
