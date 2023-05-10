import './App.scss';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';
import Dashboard from './Components/Dashboard';
import { Provider } from 'react-redux';
import store from './Components/utils/store';
import MoviePage from './Components/MoviePage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistStore } from 'redux-persist';
import Addmovie from './Components/Addmovie';
import MoviesDash from './Components/MoviesDash';
import EditMovie from './Components/EditMovie';

let persistor = persistStore(store);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Header />
          <Outlet />
        </PersistGate>
      </Provider>
    ),
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/dashboard',
        element: <PrivateRoute component={Dashboard} />,
        children: [
          {
            path: '/dashboard/',
            element: <MoviesDash />,
          },
          {
            path: '/dashboard/edit',
            element: <EditMovie />,
          },
          {
            path: '/dashboard/addmovie',
            element: <Addmovie />,
          },
          {
            path: '/dashboard/show',
            element: <MoviesDash />,
          },
        ],
      },
      {
        path: '/movie/:id',
        element: <PrivateRoute component={MoviePage} />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
