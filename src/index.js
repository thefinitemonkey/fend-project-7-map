import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: http://bit.ly/CRA-PWA
let config = {
  runtimeCaching: [
    {
      // Match any same-origin request that contains 'api'.
      urlPattern: "https://api.foursquare.com",
      // Apply a network-first strategy.
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 10 seconds.
        networkTimeoutSeconds: 10,
        // Use a custom cache name for this route.
        cacheName: 'foursquare-api-cache',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 60
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [
            0, 200
          ],
          headers: {
            'x-test': 'true'
          }
        },
        // Configure the broadcast cache update plugin.
        broadcastUpdate: {
          channelName: 'my-update-channel'
        },
        // Add in any additional plugin logic you need.
        // matchOptions and fetchOptions are used to configure the handler.
        fetchOptions: {
          mode: 'no-cors'
        },
        matchOptions: {
          ignoreSearch: true
        }
      }
    }, {
      // Match any same-origin request that contains 'api'.
      urlPattern: "https://maps.googleapis.com",
      // Apply a network-first strategy.
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 10 seconds.
        networkTimeoutSeconds: 10,
        // Use a custom cache name for this route.
        cacheName: 'googlemaps-api-cache',
        // Configure custom cache expiration.
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 60
        },
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [
            0, 200
          ],
          headers: {
            'x-test': 'true'
          }
        },
        // Configure the broadcast cache update plugin.
        broadcastUpdate: {
          channelName: 'my-update-channel'
        },
        // Add in any additional plugin logic you need.
        // matchOptions and fetchOptions are used to configure the handler.
        fetchOptions: {
          mode: 'no-cors'
        },
        matchOptions: {
          ignoreSearch: true
        }
      }
    }
  ]
};
serviceWorker.register(config);

/*
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Service worker registration successful: " + reg.scope);
      })
      .catch(error => {
        console.log("Registration failed: " + error);
      });
  }
*/
