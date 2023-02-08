import React from 'react';
import Expo from 'expo';
import currentUser from '../Planner';
import GoogleAPI from '../constants/GoogleAPI';
import {LoadingIndicator} from '../YuragonComponents';
import Colors from '../constants/Colors';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ToastAndroid
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            loading: false,
        }
    }
    async signInWithGoogleAsync() {
        await this.setState({loading: true});
        try {
            const result = await Expo.Google.logInAsync({
                behavior:"web",
                androidClientId: GoogleAPI.CLIENT_ID,
                androidStandaloneAppClientId: GoogleAPI.CLIENT_ID_STANDALONE,
                webClientId: GoogleAPI.WEB_ID_STANDALONE,
                scopes: ['profile', 'email', GoogleAPI.CALENDAR_SCOPE],
            });
            if (result.type === 'success') {
                currentUser.setUser(result);
                this.props.navigation.navigate("Main");
                this.setState({loading: false});
                ToastAndroid.show('Success', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Failed! Try again', ToastAndroid.LONG);
            }
        } catch(e) {
            ToastAndroid.show(e.message, ToastAndroid.LONG)
        }
        this.setState({loading: false});
    }

    render() {
        return (
                <ScrollView style={styles.page}>
                    <View style={styles.container}>
                        <Image
                            style={styles.logoImage}
                            source={require('../assets/images/logo.gif')}
                        />
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>
                                {/*space symbols*/}
                                Please, login via &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; &#160;
                                <Ionicons
                                    name={'logo-googleplus'}
                                    size={33}
                                    color="#4680dd"
                                />
                            </Text>
                            <View style={styles.loginButton}>
                                <Button
                                    style={{borderRadius:30}}
                                    title="Google Sign In"
                                    onPress={this.signInWithGoogleAsync.bind(this)}        
                                />
                            </View>
                        </View>
                    </View>
                    <LoadingIndicator enabled={this.state.loading} color={Colors.nowColor}/>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    logoImage:{
        width: 400,
        height: 250,
    },
    loginContainer:{
        width: 250,
        height: 100,
        flexDirection: 'column',
        marginTop: 105,
    },
    loginText:{
        fontSize:22,
    },
    loginButton:{
        marginTop: 5,
    }
});
