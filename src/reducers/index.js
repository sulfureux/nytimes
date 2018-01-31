import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import list from '@/reducers/list';
import detail from '@/reducers/detail';

const reducers = combineReducers({ list, detail, router: routerReducer });

export default reducers;

