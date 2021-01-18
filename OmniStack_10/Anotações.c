/* Anota��es:

DIA 1:
- JavaScript � a �nica linguagem de programa��o interpretada pelos navegadores(tem ferramentas para entend�-lo)
- Node.js ==> plataforma que pode rodar JavaScript sem que seja necessario o navegador
- npm ==> node package manager, usado para gerenciar os pacotes/biblioteca que ser�o usados pela aplica��o, instalar pacotes novos que servem, por exemplo,
  para envio de email, acesso a banco de dados, etc.
- op��o mais rapida para o npm: yarn(faz um uso mais avan�ado de node e JS)

OBS.: estou usando o chocolatey(windows) pra instalar os pacotes, dependencias, etc

====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
DIA 2:
-Back end:	parte n�o vis�vel pelo usu�rio que inclui: Regras de neg�cio, conex�o com banco de dados,,
		envio de email, comunica��o com web services, autentica��o de usu�rio e criptografia
- Desenvolvido em Node.js
- Desenvolvendo uma api(aplica��o sem parte visual) restful(precisa seguir padr�es sobre metodos, tipos de parametros, etc.) 
- A estrutura de dados JSON faz a comunica��o entre back e front
- package.json ==> armazena informa��es sobre o projeto
- instala��o biblioteca express(micro framework) ==> auxilia na cria��o das rotas/recursos da aplica��o
- instalar pacotes pode invocar instala�oes de outros pacotes/dependencias
- instalacao nodemon ==> percebe altera��es feitas no c�digo
- instalacao insomnia(� open source) ==> teste de rotas do backend
- Uso em nuvem do MongoDB ==> banco de dados n�o relacional, 
	->user: EdZM -> pass:edzm

- instalacao mongoose: biblioteca que d� acesso do node a base de dados mongo
	- caso de algum erro com o mongo - tente trocar as vers�es
					 - (pode ser causado por proxy ou bloqueio de acesso a algumas portas) acesse portquiz.net:27107 --> porta do MONGODB

- instala��o axios : yarn add axios que faz chamadas para outras apis


====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

DIA 3:
- Comparação de Abordagens: 
	-> Tradicional:
		- A resposta da requisição é a pagina contendo HTML, CSS
		- Aqui o trabalho ficava todo em cima do back end, que retornava uma pagina inteira contendo o HTML e o CSS por requisição
		- Limitada muito o front end no browser, já que o aplicativo mobile ou serviços externos não são capazes de interpretar o HTML


	-> SPA(single page applications): (Aqui entra o React.js, Angular.js, Vue.js,...)
		- Aqui a resposta da requisição feita pelo back end é uma estrutura de dados JSON ==> requisições só trazem dados como resposta		
		- O browser fica responsável pela parte visual, apresentação, ao inves do back end, e para isso usa os dados obtidos como resposta da requisição.
		- A página nunca recarrega, o que aumenta a performance.
		- Pode-se ter quantos front	end(clientes) eu quiser, já que existe essa questao da performance e o fato de o retorno do back end ser um JSON.
		- É bem mais dinamico, mais rápido, otimizado.
		- As ferramentas aqui usadas (como React, que é a mais famosa) fazem a parte de lidar com as requisições, as respostas em JSON(Fazer isso em JS daria muito mais trabalho)
		  visando garantir maior performance na construção da interface
		- Aqui até as rotas são controladas por essas ferramentas

	- yarn create reatc-app <pasta>
	- todo hmtl e css da aplicação são gerados via JavaScript
	- Sempre começe pela parte visual para depois fazer a parte funcional

	
	- node tem comportamento padrão de evitar acessos externos a api criada, então só permite acessos feitos ao mesmo endereço
	- a api esta executando no localhost: 3333 e o front end, no localhost: 3000, logo haverá um bloqueio
		-> yarn add cors( cross origin resource sharing ) para evitar o bloqueio

====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

DIA 4:

	React Native:

		-Surgimento por volta de 2015

		-Abordagem tradicional:
			- a aplicação é feita pra IOS e outra é feita pra Android
			- torna o processo repetitivo tanto para criação quanto para eventuais alterações

		-Abordagem do React Native:
			- todo o código é feito em JavaScript 
			- o código não é convertido em código nativo, e em vez disso, o dispositivo passa a 
			  entender o código JS e a interface gerada é totalmente nativa
			- no react Native , há o javaScript core, um framework que dá o entendimento de JS para o SO do mobile			

		- Expo: 
			- framework do react native que disponibiliza ferramentas que permitem usar grande parte das funcionalidades do celular, como camera, sensores, mapas, ...
			- sem ele é necessario instalar uma serie de dependencias, feramentas de desenvolvimento (como Android studio, Xcode), algo muito penoso
			- util para aplicações mais fechadas e restritas, que nao vão crescer depois

		- instalação yarn global add expo-cli

		- PWA: Progressive Web Apps

	DIA 5:

		- Até agora(apenas com requisições HTTP):
			- para que o backend forneça alguma informação ou resposta a uma requisição, é necessário que o front end faça alguma requisição
		- para contornar isso: 
			- instalação framework socket.io: yarn add socket.io, permite o uso do protocolo WebSocket









*/