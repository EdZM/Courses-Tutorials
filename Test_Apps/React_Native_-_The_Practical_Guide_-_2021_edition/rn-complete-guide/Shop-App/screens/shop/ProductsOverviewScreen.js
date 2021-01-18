import React, {useEffect, useState, useCallback} from 'react';
import { Text, View, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  
  const [isLoading, setIsLoading] = useState(false); // dependendo do seu valor um componente pode sobrescrever todo o conteudo da tela
  const [isRefreshing, setIsRefreshing] = useState(false); // usada para definir quando esta havendo pull refresh
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch(); //usado para acessar a função dispatch
  
  const loadProducts = useCallback(async () => { // useCallback retorna uma versão memoizada da funçao que só muda se as entradas mudarem
    
    setError(null);
    setIsRefreshing(true);
    //console.log('loaded');
    
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
    
  }, [dispatch, setIsLoading, setError]); //essas funções de dependencia do useCallback nunca mudam
  
  useEffect(()=>{
    const willFocusSub = props.navigation.addListener( // toda vez que a pagina inicial for revisitada seus produtos são recarregados
      'willFocus', 
      loadProducts
    );

    return ()=>{
      willFocusSub.remove();
    }

  },[]);

  useEffect(() => { // irá disparar a função que busca os produtos quando o componente for carregado
                    // useEffect não aceita o uso de async na arrow function 
                    // por essa função estar definida fora do useEffect ela pode ser usada em qualquer parte do codigo agora     
    setIsLoading(true);
    loadProducts().then( () => {
      setIsLoading(false);  
    });

  }, [dispatch, loadProducts]); //o efeito deve rodar toda vez que o componente for carregado
                                //a função loadProducts entra como dependencia do useEffect para evitar loop infinito

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  



  if(error){
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="Try Again" onPress={loadProducts} color={Colors.primary}/>
      </View>
    );
  }


  if (isLoading){
    return (
      <View style={styles.centered }>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }


  return (
    <FlatList
      onRefresh={loadProducts} // onRefresh exige uma função para carregar o que será mostrado na tela apos o pull refresh
      refreshControl={isRefreshing} // junto com a propriedade acima, essa é necessaria para saber quando finalizar o refresh, por isso usa variavel de estado
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  centered:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },



});

export default ProductsOverviewScreen;
