var cacheID = "fend-p7-001";

self.addEventListener("install", event => {
    console.log("install");
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      return cache
        .addAll([
          "/"
        ])
        .catch(error => {
          console.log("Caches open failed: " + error);
        });
    })
  );
});

self.addEventListener("fetch", event => {
  let cacheRequest = event.request;
  event.respondWith(
    caches.match(cacheRequest).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(fetchResponse => {
            return caches.open(cacheID).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(error => {
            return new Response("Application is not connected to the internet", {
              status: 404,
              statusText: "Application is not connected to the internet"
            });
          })
      );
    })
  );
});