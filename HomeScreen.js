import React from 'react';
import { StyleSheet, View, FlatList, ToolbarAndroid, Platform, StatusBar, AsyncStorage, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { StackNavigator } from 'react-navigation';

const EXTRA_STORAGE_USER = 'EXTRA_STORAGE_USER';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          loading: false,
          data: [],
          error: null
        };
      }

    static navigationOptions = {
        title: 'Welcome',
        headerTintColor: "#fff",
        headerStyle:{
            backgroundColor:'#3F51B5',
            height: APPBAR_HEIGHT,
            marginTop: STATUSBAR_HEIGHT
        }
    };

    componentDidMount(){
        this.getUsers();
    }



    getUsers = async () => {
        AsyncStorage.clear();
        var users;
        var defaultUser = {nombre: 'Alberto Galleguillos', email: 'ai.galleguillosr@gmail.com', comentario: 'Hola Mundo !'};
        await AsyncStorage.getItem(EXTRA_STORAGE_USER, (err, result) => { 
            if (!result) {
                AsyncStorage.setItem(EXTRA_STORAGE_USER, JSON.stringify(defaultUser));
            }
            AsyncStorage.getItem(EXTRA_STORAGE_USER, (err, result) => { 
                result = '[' + result + ']';
                this.setState({
                    data: JSON.parse(result)
                });
            });
        });
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor="#303F9F"/>
                <ToolbarAndroid style={styles.toolbar} title="Bild Prueba" titleColor= "#FFFFFF"/>
                <ScrollView>
                    <List containerStyle={{marginTop:0}}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <ListItem
                                    hideChevron
                                    title={item.nombre}
                                    subtitle={item.email}
                                />
                            )}
                            keyExtractor={item => item.email}
                        />
                    </List>
                </ScrollView>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { navigate('Form', {refreshing: false}) }}
                />
            </View>
        );
    }
}

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        height: STATUSBAR_HEIGHT
    },
    toolbar: {
        backgroundColor: '#3F51B5',
        height: APPBAR_HEIGHT,
    }
});    