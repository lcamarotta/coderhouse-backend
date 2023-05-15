import { useState, useEffect, createContext } from 'react'
import { getUser } from '../utils/fetchAPI';

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {

  const [userSession, setUserSession] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser();
      if(!response.ok) {
        console.log('Not Logged In');
        return;
      }
        setUserSession(response);
        console.log('Logged in as', response.name)
    }
    fetchUser()
  }, [userSession])

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
        { children }
    </UserContext.Provider>
  )
}
export default UserContextProvider;