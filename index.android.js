/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AppState
} from 'react-native';
import PushNotification from 'react-native-push-notification';

var MainScene = require('./JS/mainscene.js');
var EventScene = require('./JS/eventscene.js');

var loadedevents = [];

export default class billmoapp extends Component {
    constructor(props) {
        super(props);  

        this.state = {events: loadedevents};
        this.fetchEventData();
    }
    
    fetchEventData(){
        return fetch("http://www.billmoapp.co.uk/eventdata.php").then((response) => response.json()).then((
            responseJson) => {
            loadedevents.push(responseJson);
            this.setState({events: loadedevents});
        })
        .catch((error) => {
            console.error(error);
        });
    };
    
    render(){
    return(
        <Navigator
            initialRoute={{id : 'MainScene', data : this.state.events}} style={{flex: 1}} 
            renderScene = { this.renderScene  } />
        )
    }

    renderScene(route, navigator){
        var routeId = route.id;
        if(routeId == 'MainScene'){
          return <MainScene navigator={navigator} events={route.data} resetscroll={false} />
        }
        if(routeId = 'EventScene'){
          return <EventScene navigator={navigator} event={route.event} />
        }
    };
}

AppRegistry.registerComponent('billmoapp', () => billmoapp);