import React from 'react'
import { Outlet} from 'react-router-dom';

import { RecoilRoot } from 'recoil';


function PublicPageLayout() {
  return (
    <React.Fragment>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </React.Fragment>
  )
}

export default PublicPageLayout