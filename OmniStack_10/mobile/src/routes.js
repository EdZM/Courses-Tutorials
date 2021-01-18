// vou ter 2 rotas uma chamada Main e outra chamada Profile
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';


const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main, 
            navigationOptions:{
                title: 'DevRadar'  
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no GitHub'
            },
        },
    
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF', // 
            headerStyle: {
                backgroundColor: '#393940'
                // nao posso adicionar color : #FFF, pq nao ha herança de estilização
            }
        }
    })
);

export default Routes;