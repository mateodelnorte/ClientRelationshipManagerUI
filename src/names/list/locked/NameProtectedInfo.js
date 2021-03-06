import React from 'react';
import { matchPath } from 'react-router';
import moment from 'moment';

import RaisedButton from 'material-ui/RaisedButton';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { cyan500 } from 'material-ui/styles/colors';

import { MetWithProtectedIcon } from '../../../app/icons';

export default ({
  currentPath,
  callBooked,
  meetingBooked,
  selected,
  editMeeting,
  editCall,
}) => {
  const selectedNameDrawerOpen = Boolean(
    matchPath(currentPath, { path: '/account/names/(.*)/selected' }),
  );
  const protectedNameClassName = `col-12 col-${
    selectedNameDrawerOpen ? 'md' : 'sm'
  }-6`;
  return (
    <div
      className={`row name__info__protectedInfo${selected ? '-selected' : ''}`}
    >
      <div className={protectedNameClassName} style={{ marginTop: '10px' }}>
        {callBooked ? (
          <div
            className={`name__info__protectedInfo__detail${
              selectedNameDrawerOpen ? '-withDrawer' : ''
            }`}
          >
            <PhoneIcon
              color={selected && 'white'}
              style={{ marginRight: '10px' }}
            />
            {moment(callBooked).fromNow()}
            <IconButton
              id="editCall"
              onClick={e => {
                e.stopPropagation();
                editCall();
              }}
              tooltip="Edit Call"
            >
              <EditIcon color={selected ? '' : cyan500} />
            </IconButton>
          </div>
        ) : (
          <div
            className={`name__info__protectedInfo__detail${
              selectedNameDrawerOpen ? '-withDrawer' : ''
            }`}
          >
            <RaisedButton
              id="bookCall"
              onClick={e => {
                e.stopPropagation();
                editCall();
              }}
              primary={!selected}
              label="Book call"
            />
          </div>
        )}
      </div>
      <div className={protectedNameClassName} style={{ marginTop: '10px' }}>
        {meetingBooked ? (
          <div
            className={`name__info__protectedInfo__detail${
              selectedNameDrawerOpen ? '-withDrawer' : ''
            }`}
          >
            <MetWithProtectedIcon
              color={selected && 'white'}
              style={{ marginRight: '10px' }}
            />
            {moment(meetingBooked).fromNow()}
            <IconButton
              id="editMeeting"
              onClick={e => {
                e.stopPropagation();
                editMeeting();
              }}
              tooltip="Edit Meeting"
            >
              <EditIcon color={selected ? '' : cyan500} />
            </IconButton>
          </div>
        ) : (
          <div
            className={`name__info__protectedInfo__detail${
              selectedNameDrawerOpen ? '-withDrawer' : ''
            }`}
          >
            <RaisedButton
              id="bookMeeting"
              onClick={e => {
                e.stopPropagation();
                editMeeting();
              }}
              primary={!selected}
              label="Book meeting"
            />
          </div>
        )}
      </div>
    </div>
  );
};
