import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebaseinit";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import LoadingSpinnerSmall from "../pages/Shared/LoadingSpinnerSmall";

function RequireAdmin({ children }) {
  const accessToken = localStorage.getItem('accessToken')
  const [user, loading, error] = useAuthState(auth);
  const {data, isLoading, refetch} = useQuery(['checkAdmin'], () => fetch(`https://sheltered-beyond-38485.herokuapp.com/check-admin/${user.email}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
  )
  let location = useLocation();

  if(isLoading) {
    return <div className="min-h-screen flex items-center user_loading">
    <LoadingSpinnerSmall/>
  </div>
  refetch();
  }
  

  if (!user || !data) {
    signOut(auth);
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAdmin