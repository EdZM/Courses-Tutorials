import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => { //será o criador de acoes com codigo assincrono e com requisiçoes http
  
  return async dispatch => {  
    try{
      const response = await fetch('https://rn-complete-guide-82625-default-rtdb.firebaseio.com/products.json', {
        // A parte abaixo é desnecessaria pq se trata de um metodo get
        // method: 'GET', 
        // header: {
        //   'Content-Type': 'application/json',
        // },

        // body: JSON.stringify({ 
        //   title,
        //   description,
        //   imageUrl,
        //   price,        
        //}),
      })
      if(!response.ok){ // se o codigo status da requisição é 200, então a requisição foi bem sucedida
                        // é necessario ainda tratar para codigos 400, 500 referentes a autenticação do user
        throw new Error('Something went wrong!');
      }
      
      
      const resData = await response.json(); // resData tem agora o dado retornado pelo firebase
      console.log(resData);
      const loadedProducts = [];

      for (key in resData) {
        loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts })// dispara uma ação do tipo SET_PRODUCTS que armazena os produtos da loja em um array 

    } catch(err){

      throw err;

    }
    
  }


};


export const deleteProduct = productId => {
  return async dispatch => {

    const response = await fetch(`https://rn-complete-guide-82625-default-rtdb.firebaseio.com/products/${productId}.json`, { // retorna uma promise
      method: 'DELETE', 
    })
  
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch ({ type: DELETE_PRODUCT, pid: productId });
  }
  
  
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => { // async é uma alternativa a then e catch e permite usar o await no fetch abaixo
    
    // posso usar qualquer async function aqui, antes do dispatch         
    //fetch('https://rn-complete-guide-82625-default-rtdb.firebaseio.com/products.json'); //conexao com a API ou web server do firebase
                                                                                        // usado para oter dados ou requisições http
                                                                                        // ao definir um nó, o products na URL, uma seçao é criada no firebase
                                                                                        // e, por exigencia do firebase, é necessario colocar o .json
    const response = await fetch('https://rn-complete-guide-82625-default-rtdb.firebaseio.com/products.json', { // retorna uma promise
      method: 'POST', // um novo produto será incluido na base de dados, por isso o POST 
      header: {
        'Content-Type':'application/json',
      },
      
      body: JSON.stringify({ // contem o dado a ser incluido na requisição e que deve estar em formato JSON. Isso é garantido por JSON.stringfy, que converte objetos e arrays para formato JSON
        title,
        description,
        imageUrl,
        price,
        // note que o id é desnecessário pq o firebase cria isso automaticamente
      }),


    })
    
    const resData = await response.json(); // resData tem agora o dado retornado pelo firebase

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
  
};

export const updateProduct = (id, title, description, imageUrl) => {
  
  return async dispatch => {
    const response = await fetch(`https://rn-complete-guide-82625-default-rtdb.firebaseio.com/products/${id}.json`, {  //nesse caso não preciso do valor de response
    //await fetch(`https://rn-complete-guide-82625-default-rtdb.firebaseio.com/products/${id}.json`, {  //nesse caso não preciso do valor de response
      method: 'PATCH',  // poderia usar PUT mas isso iria sobrescrever todo o recurso(o produto no caso)
                        // o patch permite alterações especificas no recurso
      header: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ 
        // somente esses 3 campos do produto com o id podem ser alterados 
        title,
        description,
        imageUrl,
        //price,
        
      }),
    })
    
    if(!response.ok){
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    });
  }
  
};
