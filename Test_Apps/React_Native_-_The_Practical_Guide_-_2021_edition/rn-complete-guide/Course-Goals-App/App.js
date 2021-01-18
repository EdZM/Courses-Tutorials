import React, {useState} from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


// flexDirection: direçao flexivel, faz com que o conteudo seja disposto em linha ou coluna(padrao)
// justifyContent: alinha e distribui o conteudo ao longo do eixo principal definido por flexDirection
//                  na linha:(eixo principal: da esquerda para direita) 
//                  na coluna(eixo principal: de cima para baixo)
//
// alignItems: especifica como os elementos filhos serão posicionados ou alinhados no eixo cruzado(horizontal no caso de flexDirection ser column e vertical se ele for row)
//             center: centraliza verticalmente os itens 
// width: especifica quanto do espaço disponível será ocupado pelo textInput

// inline styles: definição da estilização em uma linha só
// flex box: espaço unidimensional onde estão colocados alguns elementos
//           nesse espaço pode-se aplicar a propriedade flex, que é útil para fazer itens encolherem ou crescerem dentro de um espaço
//            ex: flex: 1 o item ocupa toda a largura disponível relativa para ele
// view ~= div
// TODAS as views usam flex box para organizar seus componentes filhos
// a propriedade key deve sempre ser única e estar na raiz da lista 
// o componente ScrollView serve para: 
//                (ao contrario do browser, apps mobile não fornecem rolagem automatica)
//                ->garantir que quando a lista de metas ultrapassar os limites da tela, a lista fica scrollable
//                ->e é útil para listas pequenas 
//                ->Problema: todos os itens da lista ficam renderizados na tela, até os que estao fora de seus limites. Se forem milhoes de itens na lista, o app ficará muito lento
//                    -> resolve-se o problema acima usando o FlatList, que lida com listas de infinitos itens
//                        -> o FlatList é um pouco mais complexo de usar
//                        -> adiciona automaticamente chaves aos itens, mas só se o atributo de data(um objeto) estiver em um certo formato 

// para dar o output de uma lista, array de conteudos, usa-se o map() para transformar/mapear o array de dados em array de componentes


export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]); // hooks 
  const [isAddMode, setIsAddMode] = useState(false); // hooks

  console.log("Re-rendered");
  console.log(courseGoals);

  const addGoalHandler = (goalTitle) => {
 
    
    setCourseGoals(currentGoal => [...currentGoal, { id: Math.random().toString(), value: goalTitle}]); // adiciona o enteredGoal ao final do array que contem os estados anteriores 
                                                                    // duvida: de onde eu pego esse "currentGoal"
    setIsAddMode(false);
    // todas as mudanças de estado são aplicadas de uma vez, sem que seja necessárias novas renderizações
  }


  const removeGoalHandler = goalId => { // goalId serve para identificar qual elemento será removido
    setCourseGoals(currentGoal => { 
      return currentGoal.filter((goal) => goal.id !== goalId); // Obs1: retorna um novo array que obedece um certo criterio. Obs2: goal é cada elemento do array
                                                               // no array sobram só elementos cujo id é diferente daquele passado como argumento
    });
  }

  const cancelGoalAddHandler = () => {
    setIsAddMode(false);


  };


  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      
      <GoalInput 
        visible={isAddMode} 
        onAddGoal={addGoalHandler} 
        onCancel={cancelGoalAddHandler}
      />
      
      <FlatList 
        keyExtractor={(item, index) => item.id} //diz pro Flalist com extrair uma chave única para cada item da minha lista de dados
        data={courseGoals} 
        renderItem={itemData => <GoalItem 
                                  id={itemData.item.id}
                                  onDelete={removeGoalHandler} 
                                  title={itemData.item.value}
                                /> /* obs1: A propriedade renderItem é uma alternativa ao map para fazer o output dos dados. Obs2: itemData contem o objeto courseGoals */ }
      />
            
    </View>
  );
}

const styles = StyleSheet.create({  // pode dar um ganho de performance futuramente
                                    // caso algum atributo esteja incorreto, o react native conseguirá identificar o erro
  screen: {
    padding: 50,
  },
  

});
