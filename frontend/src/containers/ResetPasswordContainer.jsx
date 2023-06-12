import { useContext } from 'react';
import { useParams } from "react-router-dom";

import { UserContext } from '../context/UserContext';
import { logout, changePassword, requestPasswordChange } from '../utils/fetchAPI';


import ForgotPasswordPage from "../components/password_reset/ForgotPasswordPage";
import PasswordChangePage from '../components/password_reset/PasswordChangePage';
import ProfilePage from "../components/user/ProfilePage";
import NotFound from "../components/NotFound";

const ResetPasswordContainer = ({ page }) => {
  const userCtx = useContext(UserContext);

  function render(pageToRender){
    switch (pageToRender) {
      case 'forgot-password':
        if(userCtx.isUserLogged) return(<ProfilePage user={ userCtx } logout={ logout } />)
        return(<ForgotPasswordPage requestPasswordChange={ requestPasswordChange } />)

      case 'request-password-reset':
        if(userCtx.isUserLogged) return(<ProfilePage user={ userCtx } logout={ logout } />)
        
	      const { email, token } = useParams();
        console.log(email, token)
        return(<PasswordChangePage changePassword={ changePassword } email={ email } token={ token } />)
        
      default:
        return(<NotFound />)
    }
  }
  return ( render(page) )
}

export default ResetPasswordContainer;