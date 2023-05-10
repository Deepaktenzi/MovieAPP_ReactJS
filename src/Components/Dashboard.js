import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <section className="container-fluid ">
      <div className="row gap-5 ">
        <aside className="col-lg-2 bg-black ">
          <ul className="d-flex flex-column py-5 p-0">
            <li>
              <Link className="btn btn-primary w-100" to={'/dashboard/show'}>
                Show All Movies
              </Link>
            </li>
            <li>
              <Link
                className="mt-4 btn btn-primary w-100"
                to={'/dashboard/addmovie'}
              >
                Add Movie
              </Link>
            </li>
          </ul>
        </aside>
        <div className="col-lg-8 py-3 mb-5">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
