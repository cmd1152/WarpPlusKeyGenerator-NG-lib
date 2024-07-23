/**
  * WarpPlusKeyGenerator-NG (library)
  **
  * Based on 0x24a's GitHub repository github.com/0x24a/WarpPlusKeyGenerator-NG,
  * 4n0n4me provided the most crucial technical fixes,
  * Which cmd1152 then incorporated and packaged into a library.
  */


const http2 = require('http2');
const BASE_KEYS = [
  // 0x24a's keys, do not abuse uwu
  "a6p7K2e0-Z7ej890B-T12p8vb7",
  "56Rt0O2S-6XF74gq0-8F127pKj",
  "751xJA0Z-x4N6J7k1-i1C5I87e",
  "t6u13bA9-Dj926li0-7XUr05s8",
  "YUK9l850-ZO2K164I-92d35NIy",
  "Z9Jnd751-C078ocv6-8n341Kse",
  "39U0YG1q-d5KyB312-0Hnw596J",
  "58o1A9hB-9wb142nS-0896mkFi",
  "70I4JrU6-25Y4HAt1-53gIt84u",
  "7348MJEz-75d3Q9Js-71HFM6I4",
  // cmd1152's keys, do not abuse uwu
  "A9bl284M-C6F8l92V-283LQ0oA",
  "SCg3089f-a1MT9u52-sy1qI739",
  "uT890z1k-3WMF8L57-c38mf2B4",
  "I18o7e0s-9fQW386M-N451h8Bn",
  "3V7U21nx-3s2l58nC-lXk684W0",
  "m35oj60h-9y648jUE-F4v6C78i",
  "O306n7Jc-0V791uTe-8vh7B1L9",
  "71G5Lq2O-5w182orS-T415W0Bg",
  "GH701hg8-04p1k8AX-1N25ys4j",
  "3e1v56wN-87p5m6Jf-92Rgiv17",
  "9GY4F15i-g19d5t6V-59E1VKI8",
  "769c2sSL-bZj971V8-k2VuW071",
  "mrLY4576-Eo498zQ3-08d19VFC",
  "9f1Nk34p-m89Vi5a3-5139Izks",
]

const WARP_CLIENT_HEADERS = {
  "CF-Client-Version": "a-6.11-2223",
  "User-Agent": "okhttp/3.12.1",
}  // From Cloudflare Warp APK

const get_auth_headers = (token) => {
  return {
    "Content-Type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${token}`,
  }
}

const get_auth_headers_get = (token) => {
  return {"Authorization": `Bearer ${token}`}
}
function getRandomItemFromArray(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
function register_single() {
  return new Promise((resolve, reject) => {
    try {
      const client = http2.connect('https://api.cloudflareclient.com');
      const req = client.request({
        ':path': '/v0a2223/reg',
        ':method': 'POST',
        ...WARP_CLIENT_HEADERS
      })
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        let json = data?JSON.parse(data):{account:{}};

        let user_id = json.id;
        let license_code = json.account.license;
        let token = json.token;

        resolve({
          user_id,
          license_code,
          token
        })
      });
      req.on('error', (error) => {
        reject(error);
      });
      req.end();
    } catch (e) { reject(e) }
  })
}


function generate_key(base_key, debug) {
  return new Promise(async (resolve, reject) => {
    let client;
    let timeout = setTimeout(() => {
      if (client) client.close();
      reject(new Error('Timed out'));
    }, 60*1000)
    try {
      // i don't hvae any more good idea, so i use more if (stop) ...
      client = http2.connect('https://api.cloudflareclient.com');
 
      if (debug) console.log("Registering User 1...");
      const user1 = await register_single();

      if (debug) console.log("Registering User 2...");
      const user2 = await register_single();

      if (debug) console.log("Referring U2 -> U1");
      await sendPatchRequest(client, user1, user2);

      if (debug) console.log("Removing U2");
      await sendDeleteRequest(client, user2);

      if (debug) console.log("Referring BaseKey -> U1");
      await sendPutRequest(client, user1, `/v0a2223/reg/${user1.user_id}/account`, { license: base_key });

      if (debug) console.log("Referring U1");
      await sendPutRequest(client, user1, `/v0a2223/reg/${user1.user_id}/account`, { license: user1.license_code });

      if (debug) console.log("Getting account details");
      const accountInfo = await sendGetRequest(client, user1);

      if (debug) console.log("Removing U1");
      await sendDeleteRequest(client, user1);
 
      if (client) client.close();
      clearTimeout(timeout);
 
      resolve({
        accountType: accountInfo.account_type,
        referralCount: accountInfo.referral_count,
        licenseCode: accountInfo.license,
      });
    } catch (err) {
      if (client) client.close();
      clearTimeout(timeout);
      reject(err);
    }
  })
}
function sendPatchRequest(client, user1, user2) {
  return new Promise((resolve, reject) => {
    try {
      const patchRequest = client.request({
        ':method': 'PATCH',
        ':path': `/v0a2223/reg/${user1.user_id}`,
        ...get_auth_headers(user1.token),
        ...WARP_CLIENT_HEADERS
      });
      patchRequest.setEncoding('utf8');
      patchRequest.end(JSON.stringify({ referrer: user2.user_id }));

      patchRequest.on('response', () => {
        resolve();
      });
    
      patchRequest.on('error', (error) => {
      reject(error);
      });
    } catch (e) { reject(e) }
  });
}

function sendDeleteRequest(client, user) {
  return new Promise((resolve, reject) => {
    try {
      const deleteRequest = client.request({
        ':method': 'DELETE',
        ':path': `/v0a2223/reg/${user.user_id}`,
        ...get_auth_headers_get(user.token),
        ...WARP_CLIENT_HEADERS
      });
      deleteRequest.end();
    
      deleteRequest.on('response', () => {
        resolve();
      });
    
      deleteRequest.on('error', (error) => {
        reject(error);
      });
    } catch (e) { reject(e) }
  });
}

function sendPutRequest(client, user, path, body) {
  return new Promise((resolve, reject) => {
    try {
      const putRequest = client.request({
        ':method': 'PUT',
        ':path': path,
        ...get_auth_headers(user.token),
        ...WARP_CLIENT_HEADERS
      });
      putRequest.end(JSON.stringify(body));
    
      putRequest.on('response', () => {
        resolve();
      });
    
      putRequest.on('error', (error) => {
        reject(error);
      });
    } catch (e) { reject(e) }
  });
}

function sendGetRequest(client, user) {
  return new Promise((resolve, reject) => {
    try {
      const getRequest = client.request({
        ':method': 'GET',
        ':path': `/v0a2223/reg/${user.user_id}/account`,
        ...get_auth_headers_get(user.token),
        ...WARP_CLIENT_HEADERS
      });
    
      getRequest.setEncoding('utf8');
      let responseData = '';
    
      getRequest.on('data', (chunk) => {
        responseData += chunk;
      });
    
      getRequest.on('end', () => {
        try {
          const responseJson = JSON.parse(responseData);
          resolve({
            account_type: responseJson.account_type,
            referral_count: responseJson.referral_count,
            license: responseJson.license,
          });
        } catch (error) {
          reject(error);
        }
      });
    
      getRequest.on('error', (error) => {
        reject(error);
      });
    
      getRequest.end();
    } catch (e) { reject(e) }
  });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cli(num, debug, maxretry) {
  const keys = [];

  for (let i = 1; i <= num; i++) {
    let sleepTime = 30;
    let retry = 0;
    while(true) {
      try {
        const key = await generate_key(getRandomItemFromArray(BASE_KEYS), debug);
        keys.push(key);
        break;
      } catch (error) {
        if (debug) console.log(error);
        retry += 1;
        if (retry > maxretry) break;
      }
      await sleep(sleepTime * 1000);
    }
  }

  return keys;
}

async function createKeys(n=1, debug=false, mr = 0) {
  let num = parseInt(n);
  let maxretry = parseInt(mr);
  if (num && num > 0 && maxretry+'' && maxretry >= 0) {
    return await cli(num, debug, maxretry);
  } else return [];
}

module.exports = createKeys;