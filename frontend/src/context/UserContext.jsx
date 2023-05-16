import { useState, useEffect, createContext } from 'react'
import { getUser } from '../utils/fetchAPI';

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {

  const [userSession, setUserSession] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      const result = user.message == 'not logged in' ? false : user;
      setUserSession(result);
    }
    fetchUser();
  }, [])

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      const result = user.message == 'not logged in' ? 'Not Logged In' : userSession.name;
      console.log(result);
    }
    fetchUser();
  }, [userSession])

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
        { children }
    </UserContext.Provider>
  )
}
export default UserContextProvider;