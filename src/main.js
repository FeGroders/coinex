import { convertValue, getCoins } from './modules/coin.js';
var defaultInitialCoin = 'bitcoin';
var defaultFinalCoin = 'united-states-dollar';


document.addEventListener('DOMContentLoaded', function() {
    // var btnConvert = document.querySelector('#btn-convert');
    var iptValue = document.querySelector('#value');
    var slctCoinInicial = document.querySelector('#coin-initial');
    var slctCoinFinal = document.querySelector('#coin-final');
    
    function transformValue(){
        if (document.querySelector('#value').value > 0){
            convertValue(iptValue.value, slctCoinInicial.value, slctCoinFinal.value).then(function(value) {
                document.querySelector('#result').value = value;
            });
        }    
    }

    function fillSelect(){
        return new Promise((resolve) => {
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
                resolve();
            });
        });
    }

    iptValue.addEventListener('change', function() {
        transformValue(); 
    });

    iptValue.addEventListener('keypress', function() {
        transformValue(); 
    });

    //Fill the selects with the coins
    fillSelect().then(function(){
        transformValue();
    });   
});