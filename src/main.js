import { convertValue, getCoins } from './modules/coin.js';
var defaultInitialCoin = 'united-states-dollar';
var defaultFinalCoin = 'bitcoin';


document.addEventListener('DOMContentLoaded', function() {
    // var btnConvert = document.querySelector('#btn-convert');
    var iptValue = document.querySelector('#value');
    var slctCoinInicial = document.querySelector('#coin-initial');
    var slctCoinFinal = document.querySelector('#coin-final');
    
    function transformValue(){
        console.log(slctCoinInicial.value + ' -> ' + slctCoinFinal.value);
        if (document.querySelector('#value').value > 0){
            convertValue(iptValue.value, slctCoinInicial.value, slctCoinFinal.value).then(function(value) {
                document.querySelector('#result').value = value;
            });
        }    
    }

    function fillSelect(){
        getCoins().then(function(coins) {
            coins.forEach(function(coin) {
                let option = document.createElement('option');
                option.value = coin.id;
                option.innerHTML = coin.symbol;
                slctCoinInicial.appendChild(option);
                slctCoinFinal.appendChild(option.cloneNode(true));
            });
            slctCoinInicial.value = defaultInitialCoin;
            slctCoinFinal.value = defaultFinalCoin;
        });
    }

    // btnConvert.addEventListener('click', function() {
    //     transformValue();
    // });

    iptValue.addEventListener('change', function() {
        transformValue(); 
    });

    iptValue.addEventListener('keypress', function() {
        transformValue(); 
    });

    //Fill the selects with the coins
    fillSelect();   
    
    transformValue();
});