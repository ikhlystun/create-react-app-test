const VERSION = self.LENTA_SW_VERSION;
const CACHE_FILES = [
  '/assets/offline/index.html',
  '/assets/offline/offline.css',
  '/assets/offline/vendors.js',
  '/assets/offline/offline.js',
  '/assets/offline/offline.sprite.svg',
  '/assets/offline/fonts/pt_sans-bold.woff2',
  '/assets/offline/fonts/pt_sans-regular.woff2',
  '/assets/offline/fonts/pt_sans-caption-regular.woff2',
  '/assets/offline/fonts/pt_sans-caption-bold.woff2',
  '/assets/offline/fonts/pt_serif-bold.woff2',
  '/assets/offline/fonts/pt_serif-italic.woff2',
  '/assets/offline/fonts/pt_serif-regular.woff2'
];
const HOST_WHITELIST = [
  'localhost',
  'm.lenta.ru'
];

self.addEventListener('install', installSW);

self.addEventListener('activate', activateSW);

self.addEventListener('fetch', fetchSW);

function installSW(event) {
  self.skipWaiting();

  if (checkHost(self.location.host)) {
    event.waitUntil(caches.open(VERSION).then(function(cache) {
      return cache.addAll(CACHE_FILES);
    }));
  }
}

function activateSW(event) {
  const cacheWhitelist = [VERSION];

  if (checkHost(self.location.host)) {
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  };
}


function fetchSW(event) {
  const request = event.request;
  const reqUrl = new URL(request.url);

  if (isSWRequest(reqUrl)) {
    event.respondWith(finalResponce(request, reqUrl));
  }
}

/**
 * Функция фильтрации запросов
 * Нужна для того, чтобы SW не обрабатывал лишнее
 *
 * @param url
 * @returns {boolean}
 */
function isSWRequest(url) {
  const checkIncludeFile = CACHE_FILES.indexOf(url.pathname) > -1;
  const checkWhiteHost = checkHost(url.host);

  return checkIncludeFile || checkWhiteHost;
}

/**
 * Проверка принадлежности url'а нашему приложению
 * @param host
 * @returns {boolean}
 */
function checkHost(host) {
  return !!HOST_WHITELIST.find(function(hostWhite) {
    return host.indexOf(hostWhite) > -1;
  });
}

/**
 * Функция поиска запросов в кэше клиента и их отдача
 * @param request
 * @param url
 */
function finalResponce(request, url) {
  const positionFileInCache = CACHE_FILES.indexOf(url.pathname);

  if (positionFileInCache > -1) return caches.match(CACHE_FILES[positionFileInCache]);
  if (url.pathname === '/tictactoe') return caches.match(CACHE_FILES[0]);

  return fetch(request)
    .catch(function() {
      return caches.match(CACHE_FILES[0]);
    });
}

