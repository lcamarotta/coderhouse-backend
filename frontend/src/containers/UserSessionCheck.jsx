//  Display user register, login or profile

import { useContext } from 'react';
import { useParams } from "react-router-dom";


import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { registerUser, emailLogin, logout } from '../utils/fetchAPI';
import socket from "../utils/socket";

import LoginPage from "../components/user/LoginPage";
import RegisterPage from "../components/user/RegisterPage";
import ProfilePage from "../components/user/ProfilePage";
import CartPage from "../components/cart/CartPage";
import ChatPage from "../components/chat/ChatPage";
import OrdersPageContainer from "./OrdersPageContainer";
import NotFound from "../components/NotFound";

const UserSessionCheck = () => {
	const { page } = useParams();
    const cartCtx = useContext(CartContext);
    const userCtx = useContext(UserContext);
    
    function render(pageToRender){
        switch (pageToRender) {
            case 'profile':
                if(userCtx.isUserLogged) return(<ProfilePage user={ userCtx } logout={ logout }/>)
                return(<LoginPage user={ userCtx } emailLogin={ emailLogin }/>)

            case 'login':
                if(userCtx.isUserLogged) return(<ProfilePage user={ userCtx } logout={ logout }/>)
                return(<LoginPage user={ userCtx } emailLogin={ emailLogin }/>)

            case 'register':
                if(userCtx.isUserLogged) return(<ProfilePage user={ userCtx } logout={ logout }/>)
                return(<RegisterPage registerUser={ registerUser }/>)

            case 'cart':
                if(userCtx.isUserLogged) return(<CartPage user={ userCtx.userSession } cart={ cartCtx }/>)
                return(<LoginPage user={ userCtx } emailLogin={ emailLogin }/>)

            case 'chat':
                if(userCtx.isUserLogged) return(<ChatPage username={ userCtx.userSession.name } socket={ socket }/>)
                return(<LoginPage user={ userCtx } emailLogin={ emailLogin }/>)

            case 'orders':
                if(userCtx.isUserLogged) return(<OrdersPageContainer user={ userCtx.userSession }/>)
                return(<LoginPage user={ userCtx } emailLogin={ emailLogin }/>)

            default:
                return(<NotFound/>)
        }
    }
    return ( render(page) )
}

export default UserSessionCheck;