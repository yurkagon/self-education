import React from 'react';
import currentUser from '../../Planner';
import {LoadingIndicator} from '../../YuragonComponents';
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    DatePickerAndroid,
    TimePickerAndroid,
    ToastAndroid,
    ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import {MaterialIcons} from '@expo/vector-icons';

export default class EventsScreen extends React.Component {
    static navigationOptions = {
        title: "Planner"
    };
    constructor(props){
        super(props);

        let startTime = new Date();
        let endTime = new Date(startTime);
        endTime.setHours(endTime.getHours()+1);

        this.state={
            inputText:"",
            startTime,
            endTime,
            loading: false,
        }
    }
    async setDateAsync(currentDate){
        let nowDate = new Date(currentDate);
        let date;
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: nowDate,
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                date = new Date(year,month,day)
            }
            else{
                date = nowDate;
            }
          } catch (e) {
                date = nowDate;
          }
        return date;
    }
    async setTimeAsync(currentDate){
        let time = {};
        let now = new Date(currentDate);
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: now.getHours(),
              minute: now.getMinutes(),
              is24Hour: true, 
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                time = {hour,minute};
            }else{
                time = {hour:now.getHours(),minute:now.getMinutes()};
            }
          } catch (e) {
            time = {hour:now.getHours(),minute:now.getMinutes()};
          }
        return time;
    }
    async setStartTimeAsync(){
        let date = await this.setDateAsync(this.state.startTime);
        let time = await this.setTimeAsync(this.state.startTime);
        date.setHours(time.hour);
        date.setMinutes(time.minute);
        let startTime = new Date(date);
        this.setState({startTime});
    }
    async setEndTimeAsync(){
        let date = await this.setDateAsync(this.state.endTime);
        let time = await this.setTimeAsync(this.state.endTime);
        date.setHours(time.hour);
        date.setMinutes(time.minute);
        let endTime = new Date(date);
        this.setState({endTime});
    }
    
    async MakeEventAsync(){
        let error = false;
        this.setState({loading: true})
        try{
            let response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events',{
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${currentUser.accessToken}`,
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    "start": {
                      "dateTime": this.state.startTime.toJSON()
                    },
                    "end": {
                      "dateTime": this.state.endTime.toJSON()
                    },
                    "summary": this.state.inputText
                })
            });
            if(response.ok != true){
                throw 'error';
            }
        }catch(e){
            error = true;
            ToastAndroid.show('Failed to make the event', ToastAndroid.SHORT);
        }finally{
            if(!error){
                ToastAndroid.show("Event is created", ToastAndroid.SHORT);
                currentUser.Update();
                this.resetPlanner()
            }
            this.setState({loading: false})
        }
    }
    render() {
        let start = new Date(this.state.startTime);
        let end = new Date(this.state.endTime);
        start.setHours(start.getHours() - start.getTimezoneOffset() / 60);
        end.setHours(end.getHours() - end.getTimezoneOffset() / 60);

        return (
            <View style={styles.page}>
                <View style={styles.container}>
                    <MaterialIcons
                        name="event"
                        size={70}
                        color="white"
                    />
                    <Field name="TITLE" >
                        <View style={[styles.inputField,{marginBottom:20}]}>
                            <TextInput
                                editable = {true}
                                maxLength = {40}
                                style={{color: Colors.nowColor,fontSize:20,}}
                                placeholder="Enter a title of the event"
                                multiline={false}
                                autoCorrect={false}
                                underlineColorAndroid="white"
                                selectionColor={Colors.nowColor}
                                placeholderTextColor="rgba(81, 214, 74,0.7)"
                                onChangeText={(inputText) => this.setState({inputText})}
                                value={this.state.inputText}
                            />
                        </View>
                    </Field>
                    <Field name="START TIME">
                        <TouchableOpacity
                            style={styles.inputField}
                            activeOpacity={0.7}
                            onPress={this.setStartTimeAsync.bind(this)}
                        >
                            <Text style={styles.date}>
                                {currentUser.formatDateToDisplay(start.toJSON())}
                            </Text>
                        </TouchableOpacity>
                    </Field>
                    <Field name="END TIME">
                        <TouchableOpacity
                            style={styles.inputField}
                            activeOpacity={0.7}
                            onPress={this.setEndTimeAsync.bind(this)}
                        >
                            <Text style={styles.date}>
                                {currentUser.formatDateToDisplay(end.toJSON())}
                            </Text>
                        </TouchableOpacity>
                        {start < end && 
                            <Text style={styles.resultText}>
                                The event will be comming for {currentUser.formatTimeBetweenDates(this.state.startTime,this.state.endTime)}
                            </Text>
                        }
                        {start > end && 
                            <Text style={styles.resultText}>
                                Please, enter correct dates
                            </Text>
                        }
                    </Field>
                    {start < end && this.state.inputText.length > 0 &&
                        <TouchableOpacity
                            style={{marginTop:40}}
                            activeOpacity={0.7}
                            onPress={this.MakeEventAsync.bind(this)}
                        >
                            <MaterialIcons
                                name="add-box"
                                size={100}
                                color="white"
                            />
                        </TouchableOpacity>
                    }
                </View>
                <LoadingIndicator enabled={this.state.loading} color={Colors.nowColor}/>
            </View>
        );
    }
    resetPlanner(){
        let startTime = new Date();
        let endTime = new Date(startTime);
        endTime.setHours(endTime.getHours()+1);

        this.setState({
            startTime,
            endTime,
            inputText : ""
        });
    }
}

class Field extends React.Component {
    render() {
        return (
            <View style={styles.TitleInput}>
                <Text style={{color:'white',fontSize:20}}>{this.props.name}: </Text>
                {this.props.children}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.nowColor,
    },
    container:{
        padding: 20,
        alignItems: 'center'
    },
    TitleInput:{
        flexDirection: 'column',
        width: "100%",
        justifyContent:"center",
    },
    inputField:{
        backgroundColor: 'white',
        borderRadius: 12,
        height: 40,
        justifyContent: 'center',
        paddingLeft:5,
        paddingRight: 5,
    },
    button:{
        backgroundColor: 'white',
        borderRadius: 12,
        height: 50,
        width: 50,
        justifyContent: 'center',
        paddingRight: 5,
    },
    date:{
        color: Colors.nowColor,
        fontSize: 32,
        textAlign: "center",
    },
    resultText:{
        color: 'white',
        fontSize:15,
    }
});
