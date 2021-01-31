import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import NetInfo from "@react-native-community/netinfo";


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuNavigator = createStackNavigator();
const HomeNavigator = createStackNavigator();
const MainNavigator = createDrawerNavigator();
const ContactNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoritesNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator();

function LoginScreen({ navigation }) {
  return(
    <LoginNavigator.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        title: 'Login',
        headerTintColor: "#fff",
        headerLeft: () => (
          <Icon name="menu" size={24}
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }
            />
        )  
      }}
    >
      <LoginNavigator.Screen name="Login" component={Login} />
    </LoginNavigator.Navigator>
  )
}

function FavoritesScreen({ navigation }) {
  return(
    <FavoritesNavigator.Navigator
      initialRouteName='Favorites'
      screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
      }}
    >
      <FavoritesNavigator.Screen name="Favorites" component={Favorites} 
        options={{
          headerLeft: () => (
            <Icon name="menu" size={24}
              color= 'white'
              onPress={ () => navigation.toggleDrawer() }
              />
          )  
        }}
        />
      <MenuNavigator.Screen name="DishDetail" component={DishDetail} options={{ title: 'Dish Details' }}/>
    </FavoritesNavigator.Navigator>
  )
}

function AboutScreen({ navigation }) {
  return(
    <AboutNavigator.Navigator
      initialRouteName='About'
      screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: () => (
          <Icon name="menu" size={24}
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }
            />
        )  
      }}
    >
      <AboutNavigator.Screen name="About Us" component={About} />
    </AboutNavigator.Navigator>
  )
}

function ContactScreen({ navigation }) {
  return(
    <ContactNavigator.Navigator
      initialRouteName='Contact'
      screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: () => (
          <Icon name="menu" size={24}
            color= 'white'
            onPress={ () => navigation.toggleDrawer() }
            />
        )  
      }}
    >
      <ContactNavigator.Screen name="Contact Us" component={Contact} />
    </ContactNavigator.Navigator>
  )
}

function MenuScreen({ navigation }) {
  return(
    <MenuNavigator.Navigator 
      initialRouteName='Menu'
      screenOptions={{
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: "#fff"            
          }
      }}
    >
      <MenuNavigator.Screen name="Menu" component={Menu} 
        options={{
          headerLeft: () => (
            <Icon name="menu" size={24}
              color= 'white'
              onPress={ () => navigation.toggleDrawer() }
              />
          )  
        }}/>
      <MenuNavigator.Screen name="DishDetail" component={DishDetail} options={{ title: 'Dish Details' }}/> 
    </MenuNavigator.Navigator>
  )
}

function HomeScreen({ navigation}) {
  return(
    <HomeNavigator.Navigator 
      initialRouteName='Home'
      screenOptions={{
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: "#fff"            
          },
          headerLeft: () => (
            <Icon name="menu" size={24}
              color= 'white'
              onPress={ () => navigation.toggleDrawer() }
              />
          )  
      }}
    >
      <HomeNavigator.Screen name="Home" component={Home} />
    </HomeNavigator.Navigator>
  )
}

function ReservationScreen({ navigation}) {
  return(
    <ReservationNavigator.Navigator 
      initialRouteName='Reservation'
      screenOptions={{
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: "#fff"            
          },
          headerLeft: () => (
            <Icon name="menu" size={24}
              color= 'white'
              onPress={ () => navigation.toggleDrawer() }
              />
          )  
      }}
    >
      <ReservationNavigator.Screen name="Reservation" component={Reservation} />
    </ReservationNavigator.Navigator>
  )
}

function MainScreen() {

  function CustomDrawerContentComponent(props) {
    return (
      <DrawerContentScrollView {...props}>
          <View style={styles.drawerHeader}>
            <View style={{flex:1}}>
            <Image source={require('./images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
          </View>
          <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }

  return(
    <MainNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#D1C4E9'
      }}
      drawerContent={props => <CustomDrawerContentComponent {...props} />}
    >
      <MainNavigator.Screen name="Login" component={LoginScreen} 
        options={{
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }}
        />
      <MainNavigator.Screen name="Home" component={HomeScreen} 
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }}
        />
      <MainNavigator.Screen name="About Us" component={AboutScreen} 
        options={{
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info-circle'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }}
        />
      <MainNavigator.Screen name="Menu" component={MenuScreen} 
        options={{
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }}
        />
      <MainNavigator.Screen name="Contact Us" component={ContactScreen} 
        options={{
          title: 'Contact Us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          )
        }}
        />
      <MainNavigator.Screen name="Reservation" component={ReservationScreen}
        options={{
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          )
        }}
        />
        <MainNavigator.Screen name="Favorites" component={FavoritesScreen}
        options={{
          title: 'My Favorites',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='heart'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          )
        }}
        />
    </MainNavigator.Navigator>
  )
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  render() {
 
    return (
      <NavigationContainer>
        <MainScreen />        
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);