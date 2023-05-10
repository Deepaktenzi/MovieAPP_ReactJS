import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getroot, logout } from './utils/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(getroot());
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container ">
          <Link className="navbar-brand" href="#">
            MovieAPP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item active">
                <Link className="nav-link" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  About Us
                </Link>
              </li>
              {store.rootUser ? (
                <li className="nav-item">
                  <Link className="nav-link" to={'/dashboard'}>
                    {store.rootUser}
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>
                    Login
                  </Link>
                </li>
              )}
              {store.rootUser ? (
                <li className="nav-item">
                  <Link className="nav-link" onClick={() => dispatch(logout())}>
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
