import { useContext } from 'react';
import { useParams } from "react-router-dom";

import { UserContext } from '../context/UserContext';
import { getAllUsers, changeRole, deleteUser } from '../utils/fetchAPI';

import Page_1 from '../components/admin/Page_1';
import NotFound from "../components/NotFound";

const AdminPagesContainer = () => {
	const { page } = useParams();
    const userCtx = useContext(UserContext);

    function render(pageToRender){

      if(!userCtx.isUserLogged) return <p className='text-center m-5'>USER MUST BE ADMIN TO ACCESS THIS SECTION</p>
      if(userCtx.userSession.role !== 'admin') return <p className='text-center m-5'>USER MUST BE ADMIN TO ACCESS THIS SECTION</p>

      switch (pageToRender) {
          case 'admin-1':
              return(<Page_1 getAllUsers={ getAllUsers } changeRole={ changeRole } deleteUser={ deleteUser }/>)

          default:
              return(<NotFound />)
      }
    }
    return ( render(page) )
}

export default AdminPagesContainer;