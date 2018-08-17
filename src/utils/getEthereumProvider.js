import Web3 from 'web3'
// NOTE https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
let getEthereumProvider = new Promise(function(resolve, reject) {
  window.addEventListener('load', () => {
      var results, web3;

      // If web3 is not injected (modern browsers)...
      if (typeof web3 === 'undefined') {
          // Listen for provider injection
          window.addEventListener('message', ({ data }) => {
              if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS') {
                  // Use injected provider, start dapp...
                  web3 = new Web3(ethereum);
                  // results = {web3: web3}
                  // resolve(results);
              }
          });
          // Request provider
          window.postMessage({ type: 'ETHEREUM_PROVIDER_REQUEST' }, '*');


      } else {// If web3 is injected (legacy browsers)...
          // Use injected provider, start dapp
          web3 = new Web3(web3.currentProvider);
          results = {web3: web3}
          resolve(results)
      }
  });
})
export default getEthereumProvider
