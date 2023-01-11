import React from 'react'
import {Outlet} from 'react-router-dom';
import AdminNavbar from '../Back/Components/AdminNavbar';
import { RecoilRoot } from 'recoil';
function DashboardPageLayout() {
  return (
    <React.Fragment>
      <RecoilRoot>
        <div className='flex'>
          <AdminNavbar />
          <Outlet />
        </div>
      </RecoilRoot>


    </React.Fragment>
  )

}

export default DashboardPageLayout