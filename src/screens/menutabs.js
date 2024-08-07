import { Text, View, StyleSheet, Image } from 'react-native';
//Componte de navegação entre telas
import { NavigationContainer } from '@react-navigation/native';
//componente que permite criar os botões de navaigaçoes entre telas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//componente para ícones dos botões
import Icon from 'react-native-vector-icons/FontAwesome5';
import Products from './products';
import Pessoas from './pessoas';

function HomeScreen() {
    return (
        <View>
            <Image style={styles.logo} source={require('../../assets/logo_book.png')}></Image>

            <Text style={styles.title}>APP LIVROS</Text>
            <Text style={styles.subtitle}>APP para trocas de livros</Text>
        </View>
    );
}


function ListScreen() {
    return <Pessoas/>
}

function PostProducts() {
    return <Products/>

}

function ApiScreen() {
    return (
        <View style={styles.container}>
            <Text></Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function Menu() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'home';
                                break;
                            case 'Pessoas':
                                iconName = 'user';
                                break;
                            case 'Serviços':
                                iconName = 'tags';
                                break;
                            case 'Ler API':
                                iconName = 'file-text-o';
                                break;
                            default:
                                iconName = 'add-circle-outline';
                                break;
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                screnOptions={{
                    activeTintColor: '#4682B4',
                    inactiveTintColor: '#777',
                    showLabel: true,
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ]
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Pessoas" component={ListScreen} />
                <Tab.Screen name="Serviços" component={PostProducts} />
                <Tab.Screen name="Ler API" component={ApiScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#DA70D6', fontSize: 34, textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold'
    },
    subtitle: {
        color: 'blue', fontSize: 17, textAlign: 'center'
    },
    logo: {
        width: 350,
        height: 200,
    },
});