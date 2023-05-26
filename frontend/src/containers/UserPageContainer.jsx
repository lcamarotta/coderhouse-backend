//  Display user register, login or profile

import { useContext } from 'react';
import { useParams } from "react-router-dom";

import { UserContext } from '../context/UserContext';
import LoginPage from "../components/user/LoginPage";
import RegisterPage from "../components/user/RegisterPage";
import ProfilePage from "../components/user/ProfilePage";
import CartPage from "../components/user/CartPage";
import ChatPage from "../components/user/ChatPage";
import NotFound from "../components/NotFound";

const UserPageContainer = () => {
	const { page } = useParams();
    const userCtx = useContext(UserContext);
    
    function render(pageToRender){
        switch (pageToRender) {
            case 'profile':
                if(userCtx.isUserLogged) return(<ProfilePage/>)
                return(<LoginPage/>)

            case 'login':
                if(userCtx.isUserLogged) return(<ProfilePage/>)
                return(<LoginPage/>)

            case 'register':
                if(userCtx.isUserLogged) return(<ProfilePage/>)
                return(<RegisterPage/>)

            case 'cart':
                if(userCtx.isUserLogged) return(<CartPage/>)
                return(<LoginPage/>)

            case 'chat':
                if(userCtx.isUserLogged) return(<ChatPage username={ userCtx.userSession.name }/>)
                return(<LoginPage/>)

            default:
                return(<NotFound/>)
        }
    }
    return ( render(page) )
}

export default UserPageContainer;