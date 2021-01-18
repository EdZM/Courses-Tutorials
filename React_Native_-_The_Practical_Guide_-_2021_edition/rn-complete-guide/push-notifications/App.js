import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


Notifications.setNotificationHandler({
  handleNotification: async () => { // é executada para mostrar ao SO o que deve ser feito com a notificação antes de mostrá-la. Retorna uma promise, por isso o uso do async
    return {
      shouldShowAlert: true, // mostra a notificação enquanto o app estiver rodando, não só quando ele estiver em primeiro plano(foreground)
    };
  }

});

export default function App() {
  const [pushToken, setPushToken] = useState();
  
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(statusObj => { //checa como estão as permissões atuais. Não funciona no android
      if(statusObj.status !== 'granted'){
        return Permissions.askAsync(Permissions.NOTIFICATIONS);// pede a permissão do user
      }
      return statusObj; // se a permissão ja foi dada a verificação abaixo não será executada
    
    })
    .then(statusObj => { //é possivel que o user nao tenha dado a permissão. Nesse caso não há mais nada a fazer
      if (statusObj.status !== 'granted') {
        throw new Error('Permission not granted!'); // isso garante que o codigo abaixo só roda se a permissao for realmente concedida
      }
    })
    .then( () => { // aqui será realizado o processo de signup com servers oficiais de push notifications(Esse processo é feito inteiramente pelo expo. Não fosse assim, o processo seria muito mais complicado)
      return Notifications.getExpoPushTokenAsync(); // pega o token necessario para enviar push notifications no server do expo

    })
    .then(data => { 
      //console.log(data); // imprime o objeto obtido da promise acima(onde está token). Para que isso funcione é necessario estar logado na conta de desenvolvedor do expo
      
      const token = data.data;  
      setPushToken(token); 
      // OBS.:
      // fetch('https://your-own-api.com') //para mandar para varios devices, é feito o seguinte: uma requisição para a minha API, onde pode ter uma base de dados com os dados dos meus users
                                           // lá pode estar armazenado o token que seria usado para enviar as notificaões

    })
    .catch((err)=>{
      return null;
    }); 
  
  }, []);
  
  useEffect(()=>{
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => { // especifica o que fazer quando o user interage com a notificação enquanto o app NAO estiver aberto
      console.log(response);
    }) 
    

    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => { //permite definir funcoes que devem ser executadas quando as notificações sao recebidas E enquanto o app estiver rodando em primeiro plano
      console.log(notification);
    }); 

    return () => { // caso o user 'saia' do app ou o componente tenha sido desmontado, é necessario fazer a remoção da inscrição
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };

  }, []);



  const triggerNotificationHandler = () => { 
    // Notifications.scheduleNotificationAsync({ // agenda uma notificação local
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first local notification we are sending'
    //   },
    //   trigger: { // define quando a notificação deve ser enviada
    //     seconds: 10,
    //   },
    // });
    
    // Envio de push notifications usando o proprio app. Essas notificações poderiam ser enviadas de um server tambem
    fetch('https://exp.host/--/api/v2/push/send', { // faz uma requisição http usando a url do push notification server do expo. Essa url foi usada por baixo dos panos ao usar o push notification tool do expo
      method: 'POST', //metodo da requisicao http
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // tem a mensagem que quero mandar
        to: pushToken,
        data: {extraData: 'Some data'},
        title: 'Sent via the app',
        body: 'This push notification was sent via the app!',

      })


    }); 
    
  
  };
  
  
  return (
    <View style={styles.container}>
      <Button title="Trigger Notification" onPress={triggerNotificationHandler}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
