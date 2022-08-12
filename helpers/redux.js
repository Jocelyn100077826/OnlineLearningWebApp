import * as Actions from '../redux/action';
import {connect} from 'react-redux';
import _ from 'lodash';

export const getReduxProps = list => states => {
    let props = {};
    if (_.isEmpty(list) && list !== false) {
        //props = states;
    }
    _.forEach(list, name => {
        _.set(props, name, states[name]);
    });
    return props;
};

export const getReduxActions = list => {
    let props = {};
    if (_.isEmpty(list) && !list !== false) {
        //props = Actions;
    }
    _.forEach(list, name => {
        _.set(props, name, Actions[name]);
    });
    return props;
};

export const redux =
    (props, actions, forwardRef = false) =>
        Component => {
            return connect(getReduxProps(props), getReduxActions(actions), null, {
                forwardRef,
            })(Component);
        };
