import React from 'react'
import { Outlet} from 'react-router-dom';
function EmptyPageLayout() {
  return (
    <React.Fragment>

      <Outlet />

    </React.Fragment>
  )
}

export default EmptyPageLayout