import React from 'react';
import { StyleSheet, View, Button, ToolbarAndroid, Platform, StatusBar, ToastAndroid, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import t from 'tcomb-form-native';
import HomeScreen from './HomeScreen';

const EXTRA_STORAGE_USER = 'EXTRA_STORAGE_USER';
const EXTRA_STORAGE_FORM = 'EXTRA_STORAGE_FORM';

const Form = t.form.Form;

const User = t.struct({
    nombre: t.String,
    email: t.String,
    comentario: t.String
});

const options = {
    auto: 'placeholders',
    fields: {
        nombre: {
            error: 'Ingrese su Nombre'
        },
        email: {
            error: 'Ingrese un correo válido'
        },
        comentario: {
            error: 'Ingrese un Comentario'
        },
    }
};

export default class FormScreen extends React.Component {
    constructor(props) {
        super(props);
      
        this.state = {
          loading: false,
          title: null,
          data: [],
          error: null
        };
      }

    static navigationOptions = {
        title: 'Form Screen',
        headerTintColor: "#fff",
        headerStyle:{
            backgroundColor:'#3F51B5',
            height: APPBAR_HEIGHT,
            marginTop: STATUSBAR_HEIGHT
        }
    };

    componentDidMount(){
        this.getInputs();
    }

    getInputs = async () => {
        var users;
        await AsyncStorage.getItem(EXTRA_STORAGE_FORM, (err, result) => { 
            if (!result) {
                this.makeRemoteRequest();
            }
            AsyncStorage.getItem(EXTRA_STORAGE_FORM, (err, result) => { 
                if (result) {
                    var title = JSON.parse(result).name;
                    title = title.charAt(0).toUpperCase() + title.slice(1);
                    this.setState({
                        loading: false,
                        title: title,
                        data: JSON.parse(result).inputs, 
                        error: err || null,
                    });
                }
            });
        });
    };

    makeRemoteRequest = () => { 
        const url = 'http://192.168.0.9:3000/getforms';
        this.setState({ loading:true });
        fetch(url)
            .then(response => response.json())
            .then(response => {
                AsyncStorage.setItem(EXTRA_STORAGE_FORM, JSON.stringify(response[0]));
            })
        .catch(error => {
            this.setState({ error, loading:false});
        });
    };

    handleSubmit = () => {
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            this.saveUser(value);
            ToastAndroid.show('Registro Guardado !', ToastAndroid.SHORT);
        }
        this.clearForm();
    };

    clearForm() {
        this.setState({ value: null });
    };

    saveUser = async value => {
        var users;
        try {
            await AsyncStorage.getItem(EXTRA_STORAGE_USER, (err, result) => {
                users = result + ',' + JSON.stringify(value);
            });
            await AsyncStorage.setItem(EXTRA_STORAGE_USER, users);
            this.props.navigation.navigate('Home', {
                onGoBack: () => this.refresh(),
              });
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    };

    render() {
      const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MyStatusBar backgroundColor="#303F9F"/>
                <ToolbarAndroid style={styles.toolbar} title={this.state.title} titleColor= "#FFFFFF"/>
                <View style={styles.containerForm}>
                    <Form ref="form"
                        type={User} 
                        options={options} />
                    <Button
                        title="Guardar"
                        onPress={this.handleSubmit} />    
                </View>
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
        flex: 1,
        backgroundColor: '#ffffff'
    },
    containerForm: {
        justifyContent: 'center',
        padding: 20
    },
    statusBar: {
        height: STATUSBAR_HEIGHT
    },
    toolbar: {
        backgroundColor: '#3F51B5',
        height: APPBAR_HEIGHT
    }
});