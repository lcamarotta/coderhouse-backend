import { useState, useEffect, createContext } from 'react'
import { getUser } from '../utils/fetchAPI';

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {

  const [userSession, setUserSession] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

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

  return (
    <UserContext.Provider value={{ userSession, setUserSession, isUserLogged, setIsUserLogged }}>
        { children }
    </UserContext.Provider>
  )
}
export default UserContextProvider;