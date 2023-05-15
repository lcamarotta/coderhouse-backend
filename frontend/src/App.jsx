//dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom";

//files
import CartContextProvider from "./context/CartContext";
import UserContextProvider from "./context/UserContext";
import NotFound from "./components/NotFound"
import NavBar from "./components/NavBar";
import ProductListContainer from "./containers/ProductListContainer";
import ProductDetailContainer from "./containers/ProductDetailContainer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const App = () => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<ProductListContainer/>}/>
            <Route path="/:category/:page" element={<ProductListContainer/>}/>
            <Route path="/product/:productId" element={<ProductDetailContainer/>} />
            <Route path="/loginpage" element={<LoginPage/>} />
            <Route path="/registerpage" element={<RegisterPage/>} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default App;