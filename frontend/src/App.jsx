//dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";

//files
import CartContextProvider from "./context/CartContext";
import UserContextProvider from "./context/UserContext";
import NotFound from "./components/NotFound"
import NavBar from "./components/navbar/NavBar";
import ProductListContainer from "./containers/ProductListContainer";
import ProductDetailContainer from "./containers/ProductDetailContainer";
import UserSessionCheck from "./containers/UserSessionCheck";
import ResetPasswordContainer from "./containers/ResetPasswordContainer";
import AdminPagesContainer from "./containers/AdminPagesContainer";

const App = () => {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<ProductListContainer/>}/>
            <Route path="/admin/:page" element={<AdminPagesContainer/>}/>
            <Route path="/:category/:page" element={<ProductListContainer/>}/>
            <Route path="/product/:productId" element={<ProductDetailContainer/>} />
            <Route path="/user/:page" element={<UserSessionCheck/>} />
            <Route path="/forgot-password" element={<ResetPasswordContainer page={ 'forgot-password' } />}/>
            <Route path="/pw/:token/reset" element={<ResetPasswordContainer page={ 'request-password-reset' } />}/>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </CartContextProvider>
  )
}

export default App;