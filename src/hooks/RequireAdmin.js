import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebaseinit";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

function RequireAdmin({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const {data, isLoading, refetch} = useQuery(['checkAdmin'], () => fetch(`http://localhost:5000/check-admin/${user.email}`, {
    method: 'GET'
  })
    .then(res => res.json())
  )
  let location = useLocation();

  if(isLoading) {
    return <LoadingSpinner/>
  }
  

  if (!data) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAdmin