import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var NavigationBar = require('react-native-navbar');
var moment = require('./adds/moment.js');

class EventScene extends Component {
  render() {
      const leftbutton_config = {
        title: 'Back',
        handler: () => {
          this.props.navigator.pop();
        },
      };
      
      const title_config = {
        title: 'Details',  
      };
    
    var eventTime = moment(this.props.event['datetime'], "DD-MM-YYYY hh:mm:ss");
    var colourhex = this.props.event['colourhex'];
    var viewstyle = {
         flex: 1,
         backgroundColor: "#" + colourhex
    };
      
    return (
     <View style={viewstyle}>
        <View style={{ height: 70 }}>
            <NavigationBar title={title_config} leftButton={leftbutton_config} />
        </View>
        
        <ScrollView style={eventspageStyles.content}>
            <Text style={eventspageStyles.title}>{this.props.event['title']}</Text>
            <Text style={eventspageStyles.tagline}>
                {this.props.event['location']} at {eventTime.format('k:mm')}
            </Text> 
            <Text style={eventspageStyles.description}>{this.props.event['description']}</Text> 
        </ScrollView>
     </View>
    );
  }
}

module.exports = EventScene;

const eventspageStyles = StyleSheet.create({
    content : {
       flex: 1,
       paddingLeft: 15,
       paddingRight: 15,
       marginTop: 5,
       marginBottom: 15,
    },
    title : {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFF', 
      marginBottom: 2,
    },
    tagline : {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 7,
    },
    description : {
      fontSize: 15,
      color: '#FFF',
    }
});