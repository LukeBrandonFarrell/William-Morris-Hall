import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PushController from './PushController';
    
global.scroll = false;

var NavigationBar = require('react-native-navbar');
var EventList = require('./eventlist.js');
var moment = require('./adds/moment.js');
    
var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class MainScene extends Component {
  constructor(props) {
    super(props);  
    
    this.state = {datestate: moment(), events : this.props.events};
  }
    
  render() {
      var date = this.state.datestate;
      
      const rightbutton_config = {
        title: 'Next',
        handler: () => {
            date.add(1, 'months');
            global.scroll = true;
            this.setState({ datestate: date });
        },
      };
      
      var prevBtn = true;
      var leftbutton_config = {
        title: 'Prev',
        handler: () =>  {
            date.subtract(1, 'months');
            global.scroll = true;
            this.setState({ datestate: date });
        },
      };
      
      var month_name = months[date.month()];
      const title_config = {
        title: month_name,  
      };

      //IF CURRENT MONTH, REMOVE PREV BTN
      if(moment().month() == date.month() && moment().year() == date.year()){  
         prevBtn = false;
      }

    return (    
     <View style={{flex: 1}}>
        <View style={{ height: 70 }}>
            <NavigationBar title={title_config} rightButton={rightbutton_config} 
            {...prevBtn ? {leftButton : leftbutton_config} : {}} />
        </View>
        
        <EventList navigator={this.props.navigator} date={date} events={this.state.events} resetscroll={global.scroll} />
        <PushController />
     </View>
    );
  }
}

module.exports = MainScene;