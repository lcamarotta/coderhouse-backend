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

const App = () => {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<ProductListContainer/>}/>
            <Route path="/:category/:page" element={<ProductListContainer/>}/>
            <Route path="/product/:productId" element={<ProductDetailContainer/>} />
            <Route path="/user/:page" element={<UserSessionCheck/>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </CartContextProvider>
  )
}

export default App;