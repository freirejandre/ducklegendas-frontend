import React,{useContext} from "react";
import { AuthContext } from 'utils/AuthContext';

export const LEGENDER = "legender";
export const AUTOR = "autor";
export const MODERADOR = "moderador";
export const ADMIN = "admin";
export const ALL = [LEGENDER,AUTOR,MODERADOR,ADMIN];
let roles = [];

export const Can = (user_role) => (roles.includes(user_role) ? true : false)
  
const AuthorizationHOC = allowedRoles => Component => {
  roles = allowedRoles;
  const WithAuthorization = () => {
    const [user] = useContext(AuthContext);
    //console.log("role user", user.user_type);
    if (allowedRoles.includes(user.user_type)) {
      return <Component />;
    } else {
      //console.log("Sem permissão!");
      return <h4 style={{ fontWeight:600, padding:'2rem',color: "red" }}>Sem permissão!</h4>;
    }
  };
  return WithAuthorization;
}
export default AuthorizationHOC;
