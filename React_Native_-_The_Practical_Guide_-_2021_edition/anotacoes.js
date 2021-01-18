/*

React.js resumo:
  - lib do javascript para construcão de interfaces de usuário
  - tipicamente usado para web development

  - sempre usa em algum momento a lib reactDOM.render() 
      - basicamente recebe o app react e renderiza algo na tela 
      - essa lib é quem sabe como renderizar elementos HTML  
      
      - react itself is platform-agnostic:
          - útil: 
              na contrução da árvore de componentes, 
              para descobrir se houve mudanças, 
              para descobrir se algo precisa ser novamente renderizado,
              no gerenciamento de estados
              na passagem de dados 
            
          -> tudo isso de uma forma abstrata, o que permite seu uso em qualquer plataforma

React native: 
  Anotações mais gerais
    - coleção de elementos react especiais* 
      *especiais: o react native sabe como converter e compilar esses componentes para widgets do iOS ou android
    
    - atua como se fosse a lib reactDOM, já que sabe como se comunicar com a plataforma nativa e como renderizar widgets nativos 
    - não há como usar certas tags como div, h1, p , pois não há equivalentes diretos a elas no código nativo
    - permite acesso a apis nativas das plataformas, como uso da camera, 
    - dá ferramentas para conectar o código JS ao código de plataforma nativa 
    - dá mais flexibilidade 
  
    ********React + React Native == REAL Native Mobile Apps, que poderão ser embarcados na App Store ou na Google Play 
    -Obs: o React Native mapeia componentes reutilizaveis para componentes equivalentes das respectivas plataformas, como:
      -os componentes android.view e UIView são convertidos em <View> pelo react Native
      -os componentes EditText e UITextField são convertidos em <TextInput> pelo react Native
      -and so on...
  
    - a parte de UI é compilada para native views, native widgets, native code
    - a parte da lógica do negócio é compilada por uma thread javascript hospedada pelo react native, como se o JS rodasse numa VM dentro do App
        - essa VM sabe como se comunicar com as features/módulos/api nativas da plataforma
        - Para o SO, o app está rodando via uma ponte especial que liga essa VM com os módulos nativa da plataforma
        - A ponte e a VM são fornecidas automaticamente pelo react native
  
  Como funciona: 
    1 - Meu código tem as Views(parte visível ao usuário) + código JS 
    2 - As Views são convertidas/compiladas em Views nativas da plataforma
    3 - o Còdigo JS é compilado via uma VM(JS core) fornecida pelo próprio react native
    4 - Através de uma ponte especial, também fornecida pelo React Native, a VM troca informações com os módulos nativos da plataforma

    - É bom entender isso porque assim consigo saber o que estou escrevendo e como o código acaba virando um app nativo

    - re-renderizar a UI, assim como outros processos, são as coisas que mais exigem performance
    - uma das coisas que tornam essa lib forte é justamente sua capacidade de compilar os elementos referentes a UI


  Expo ou React Native CLI:

    -> expo cli:
       - é gratuito, 
       - usado para a maioria dos apps que usam react native
       - é restrito a seu ecossistema


    -> react native cli:
      - tem só uma configuração básica inicial
      - indicado para devs mais avançados
      - dá muita flexibilidade e controle
      - algumas features precisam ser criadas do zero, sem qualquer suporte ou ferramenta

    -> sempre é possível alternar entre o expo e um fluxo de desenvolvimento que nao use o expo

  Expo cli:
    - bom para o desenvolvimento e fluxo de trabalho
    - pode ser publicado como app Expo
    - pode ser publicado também como app standalone


  Principios importantes:
    - Style components on your own or use third party libraries
    - Build components on your own or third party libraries
    - create responsive designs on your own (check for device size and OS)

  fast moving target: react native muda muito rapido
    - pode exigir mudanças atualizações no projeto
    - dependencias de pacotes de terceiros também mudam
    - bugs required

  Local and Push Notification:

  Database se conecta com o app via web server(API) por questões de segurança 

  Autenticação:
    -> Em geral, 
        
    
        * em apps que usam react native --> se autenticam com o server --> ele gera um token, que somente ele sabe
        --> o token é retornado para o app para ser armazenado de alguma forma(redux storage por exemplo), 
        --> esse token permite supor se o user esta logado ou nao
        --> as requisições ao server só podem ser feitas usando esse token gerado para o user




  Revisar:
    - Autenticação de usuario
    - Navigation
    - State Management
    - Hooks 
    - Redux
    - Redux-thunk(usado para a database)
    - Native device features
    - Criar apps sem expo
    
*/