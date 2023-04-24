import { useSelector } from "react-redux";
// import { Link, Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { userAltentication } from "../redux/sliceAltentication";

interface PrivateRouteprop {
  route: any;
}
function PrivateRoute({ route }: PrivateRouteprop) {
  console.log(route);
  const dataAltentication = useSelector(userAltentication);
  console.log(dataAltentication.isLogged);
  
  switch (dataAltentication.isLogged) {
    case true:
      return route;
    case false:
      return <Navigate to="/login" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
