import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import { editProfile, cancelEditProfile } from './profileActions';
import LoadingSpinner from '../LoadingSpinner';
import ShowProfile from './ShowProfile';
import EditProfile from './EditProfile';

const getProfile = ({
  user, editing, loading, onEditProfile, onCancelEditProfile, saveProfile
}) => {
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (editing) {
    return (
      <EditProfile
        initialValues={user}
        handleSubmit={saveProfile}
        handleCancelEditProfile={onCancelEditProfile}
      />
    );
  }

  return (
    <ShowProfile
      firstName={user.firstName}
      lastName={user.lastName}
      phone={user.phone}
      email={user.email}
      onEditProfile={onEditProfile}
    />
  );
};

const Profile = ({
  loading, user, editing, onEditProfile, onCancelEditProfile, saveProfile
}) => (
  <div>
    <h1 className="Profile__title">Profile</h1>
    { getProfile({ user, editing, loading, onEditProfile }) }
  </div>
);

const userData = gql`
  query($userId: String!) {
    users(userId: $userId) {
      firstName,
      lastName,
      email,
      phone,
      created_at,
      updated_at
    }
  }
`;

const editUser = gql`
  mutation($userId: String!) {
    editUser(userId: $userId) {
      firstName
      lastName
      email
      phone
      updated_at
    }
  }
`;

const ProfileWithData = compose(
  graphql(userData, {
    options: ({ userId }) => ({ variables: { userId } }),
    props: ({ ownProps, data: { loading, users } }) => ({
      loading,
      user: users && users[0],
      ...ownProps
    })
  }),
  graphql(editUser, {
    props: ({ ownProps, mutate }) => ({
      saveProfile: values => mutate({ variables: values }),
      ...ownProps
    })
  })
)(Profile);

const mapStateToProps = state => ({
  userId: state.account.userId,
  editing: state.profile.editing
});

const mapDispatchToProps = dispatch => ({
  onEditProfile: () => dispatch(editProfile()),
  onCancelEditProfile: () => dispatch(cancelEditProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithData);