import { useState, useEffect, useContext, createContext } from 'react'
import { getUser } from '../utils/fetchAPI';
import { CartContext } from './CartContext';

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {

  const [userSession, setUserSession] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const cartCtx = useContext(CartContext);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if(user.message == 'not logged in'){
        setUserSession(false);
        setIsUserLogged(false);
      }else{
        setUserSession(user);
        setIsUserLogged(true);
        console.log('Logged in as ',user.name);
      }
    }
    fetchUser();
  }, [])

  useEffect(() => {
    async function fetchCart() {
      await cartCtx.setCartFromAPI(userSession.cart);
    }
    if(isUserLogged) fetchCart();
  }, [isUserLogged])

  return (
    <UserContext.Provider value={{ userSession, setUserSession, isUserLogged, setIsUserLogged }}>
        { children }
    </UserContext.Provider>
  )
}
export default UserContextProvider;