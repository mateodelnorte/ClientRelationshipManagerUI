import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import _ from 'lodash';

import { APOLLO_MUTATION_RESULT } from '../../app/thirdPartyActions';
import { showCreateNameForm, selectName } from '../nameActions';
import GetUnprotectedNames from './GetUnprotectedNames.gql';

import UnprotectedNames from './UnprotectedNames';
import { removeNameFromList } from '../nameListShapeShifter';

export const reducer = (previousResult, action) => {
  if (action.type === APOLLO_MUTATION_RESULT) {
    switch (action.operationName) {
      case 'RemoveUnprotectedName':
        if (
          _.has(action, 'result.data.removeUnprotectedFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.unprotectedId, 'unprotected'
          );
        }
        break;
      case 'ProtectName':
        if (
          _.has(action, 'result.data.protectNameToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return removeNameFromList(
            previousResult, action.variables.unprotectedId, 'unprotected'
          );
        }
        break;
      case 'CreateUnprotectedName':
        if (
          _.has(action, 'result.data.addUnprotectedNameToUser') &&
          !_.has(action, 'result.errors')
        ) {
          return {
            user: {
              ...previousResult.user,
              unprotected: [
                action.result.data.addUnprotectedNameToUser,
                ...previousResult.user.unprotected
              ]
            }
          };
        }
        break;
      case 'UnprotectName':
        if (
          _.has(action, 'result.data.unprotectNameFromUser') &&
          !_.has(action, 'result.errors')
        ) {
          return {
            user: {
              ...previousResult.user,
              client: [
                action.result.data.unprotectNameFromUser,
                ...previousResult.user.unprotected
              ]
            }
          };
        }
        break;
      default:
        return previousResult;
    }
  }

  return previousResult;
};

const UnprotectedNamesWithData = graphql(GetUnprotectedNames, {
  options: ({ id }) => ({ variables: { id }, reducer }),
  props: ({ ownProps, data: { loading, user } }) => ({
    loading,
    names: user && user.unprotected,
    ...ownProps
  })
})(UnprotectedNames);

const mapStateToProps = state => ({
  id: state.profile.id,
  selectedNameId: state.name.selectedName,
  showingCreateForm: state.name.showingCreateForm,
  nameActionInProgress: state.name.actionInProgress
});

const mapDispatchToProps = dispatch => ({
  showCreateNameForm: () => dispatch(showCreateNameForm()),
  selectName: nameId => dispatch(selectName(nameId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnprotectedNamesWithData);
