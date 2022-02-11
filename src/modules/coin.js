var URL_BASE = 'https://api.coincap.io/v2';

export function convertValue(valueToConvert, idCoinInitial, idCoinFinal){
  return new Promise((resolve) => {
    let initialRate = 0;
    let finalRate = 0;

    getRateUSD(idCoinInitial).then(function(rate) {
      initialRate = rate;

      getRateUSD(idCoinFinal).then(function(rate) {
        finalRate = rate;
        resolve(((valueToConvert / initialRate) * finalRate).toFixed(2));
      });
    });    
  });
}

function getRateUSD(idCoin){ 
  return new Promise((resolve) => {
    let url = URL_BASE + '/rates/';
    let rate = 0;

    fetch(url + idCoin, { headers: { 'Content-Type': 'application/json' }}).then(function(response) {
      response.json().then(function(data) {
        rate = data.data.rateUsd;
        resolve(rate);
      });
    }).catch(function(err) {
      console.error('Failed retrieving information', err);
    });    
  });
}

export function getCoins(){
  return new Promise((resolve) => {
    let url = URL_BASE + '/rates';
    fetch(url, { headers: { 'Content-Type': 'application/json' }}).then(function(response) {
        response.json().then(function(data) {
          resolve(data.data);
        });
      }).catch(function(err) {
        console.error('Failed retrieving information', err);
      });
  });
}