import React from 'react';
import RootNavigator from './src/router/index';

import { Provider } from '@ant-design/react-native';
export default class Root extends React.Component {
  render () {
    return <Provider><RootNavigator /></Provider>
  }
}
