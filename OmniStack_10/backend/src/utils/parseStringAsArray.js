module.exports = function parseStringAsArray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());// o map percorre o vetor e pra cada elemento ele faz alguma coisa, no caso o trim(remove espaçamentos antes e depois de uma string)

}