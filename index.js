/**
 * @format
 */

import 'react-native-gesture-handler'; // This line must be at the top
import { AppRegistry } from 'react-native';
import App from './app/App'; // Updated import path
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
