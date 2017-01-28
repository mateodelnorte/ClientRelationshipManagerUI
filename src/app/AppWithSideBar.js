import React from 'react';
import { connect } from 'react-redux';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import SideBarWithData from './navigation/SideBar';

const mapStateToProps = state => ({
  open: state.account.sideBarOpen
});

export default connect(mapStateToProps)(
  withWidth()(({ children, width }) => (
    <div>
      <SideBarWithData width={width} />

      <div style={width === LARGE ? { paddingLeft: 256 } : {}}>
        {children}
      </div>
    </div>
)));

