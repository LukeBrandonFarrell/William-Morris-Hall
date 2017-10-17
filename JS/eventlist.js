import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
//import PushNotification from 'react-native-push-notification';

var moment = require('./adds/moment.js');

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class EventList extends Component {
    constructor(props) {
        super(props);  
        var _scrollView: ScrollView;
        this.state = {events: this.props.events};
      }
    
    componentDidUpdate() {
        if(this.props.resetscroll){
            _scrollView.scrollTo({x: 0, y: 0, animated:false});
        }
    }
    
    render() {
        const allevents = [];
        var date = moment(this.props.date);
        
        var day = date.date();
        var month = date.month() + 1;
        var year = date.year();
        
        //Only cut the current month
        if(month != (moment().month() + 1)){
           day = 1;
        }
        
        for(var i=day; i <= daysInMonth(month, year); i++){
            var date_string = (i + "-" + month + "-" + year).toString();
            var newdate = moment(date_string, "DD-MM-YYYY");
            
            
            var eventdate = []; //Array of all events associated with that date
            //Search through array of events to match events
            if(this.state.events.length > 0){
                var array = this.state.events[0];
                for(e of array){ 
                    var event_date = moment(e['datetime'], "YYYY-MM-DD");   
                    
                    var event_day = event_date.date(); //Date of the month: 2 in our example
                    var event_month = event_date.month() + 1; //Month of the Year: 0-based index, so 1 in our example
                    var event_year = event_date.year();

                    var eventdate_string = (event_day + "-" + event_month + "-" + event_year).toString();

                    //compare dates
                    if(eventdate_string == date_string){
                        eventdate.push(e);
                    }
                }
            }
            
            allevents.push(<Event key={i} date={newdate} eventdate={eventdate} navigator={this.props.navigator} />);
        }
                           
        return(
          <ScrollView style={eventStyles.eventlist} ref={(scrollView) => { _scrollView = scrollView; }}>
            {allevents}
          </ScrollView>
        );
    }
}

class Event extends Component {
    render() {        
        var eventsfill = <View style={eventStyles.noeventContainer}><Text style={eventStyles.noevent}>No Event</Text></View>;
        
        var event_container = {
            flex:1,
            height: 120,
            backgroundColor: '#FFF',
        };
        
        if(this.props.eventdate.length > 0){
            eventsfill = [];
            
            for(event of this.props.eventdate){
                var colourhex = event['colourhex'];
                var eventstyle = {
                     flex: 1,
                     flexDirection: 'column',
                     justifyContent: 'center',
                     backgroundColor: "#" + colourhex,
                     paddingLeft: 12,
                };
                event_container.height = event_container.height + 40;
                eventsfill.push(<SingleEvent key={event['eventId']} event={event} 
                                eventstyle={eventstyle} navigator={this.props.navigator} />);
            }
        }
      return(
        <View style={event_container}>
          <EventTitle date={this.props.date} />
          <View style={eventStyles.data}>
              {eventsfill}
          </View>
        </View>    
      );
    }
}
        
class SingleEvent extends Component {
    onTap(){
      global.scroll = false;
      this.props.navigator.push({
         id: 'EventScene',
         event: this.props.event
      });
    }
    
    render(){
        var eventTime = moment(this.props.event['datetime'], "DD-MM-YYYY hh:mm:ss");
       
        var date_as_msecounds = moment(this.props.event['datetime']);
        
        var push_date = new Date(date_as_msecounds);
                    
        /*PushNotification.localNotificationSchedule({
            message: this.props.event['title'] + "at" + this.props.event['datetime'],
            date: push_date
        });*/
    
        return(
            <TouchableHighlight onPress={this.onTap.bind(this)} style={{flex: 1}}>
                <View style={this.props.eventstyle}>
                    <Text style={eventStyles.singleEventTitle}>{this.props.event['title']}</Text> 
                    <Text style={eventStyles.singleEventTagline}>
                        {this.props.event['location']} at {eventTime.format('k:mm')}
                    </Text> 
                </View>
            </TouchableHighlight>
        );
    }   
}

class EventTitle extends Component {
    render() {
        //STYLE OF TITLE BAR
            var eventTitle = {
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                padding: 12,
                backgroundColor: '#E2E2E2',
            };
        
             var day = {
                flex: 1,
                flexDirection: 'row',
                fontSize: 20,
                color: '#7C8083',
            };
        
            var date = {
                flex: 1,
                textAlign: 'right',
                flexDirection: 'row',
                fontSize: 20,
                color: '#7C8083',
            };   
        //END OF STYLES
        
        var title = days[this.props.date.day()];
        
        var refernece = moment();
        var today = refernece.clone().startOf('day');
        var tomorrow = refernece.clone().add(1, 'days').startOf('day');
        
        if(this.props.date.isSame(today, 'd')){ //TODAY
            title = "Today";
            eventTitle.backgroundColor = '#3C4F9F';
            day.color = '#FFF';
            date.color = '#FFF';
            day.fontWeight = 'bold';
        }
        
        if(this.props.date.isSame(tomorrow, 'd')){ //TOMORROW
            title = "Tomorrow";
            eventTitle.backgroundColor = '#6874A1';
            day.color = '#FFF';
            date.color = '#FFF';
        }
        
        return(
            <View style={eventTitle}>
                <Text style={day}>{title}</Text>
                <Text style={date}>{this.props.date.format('DD-MM-YYYY')}</Text>
            </View>
        );
    }
}

function daysInMonth(month, year){
    return new Date(year, month, 0).getDate();
}

const eventStyles = StyleSheet.create({
  eventlist : {
    flex: 1,
  },
  singleEventTitle : {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 12,
  },
  singleEventTagline : {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 12,
  },
  data : {
    flex: 1,
  },
  noeventContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noevent : {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D9E1E8',
  },
});

module.exports = EventList;