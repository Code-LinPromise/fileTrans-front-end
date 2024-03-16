const url = `ws://${window.location.hostname}:27149/ws`;
const wsClient = new WebSocket(url);

class WsClient {
  client:WebSocket
  constructor(client:WebSocket) {
    this.client = client
  }
  send(data:any) {
    this.client.send(JSON.stringify(data))
  }
  onMessage(fn:any) {
    this.client.onmessage = ({ data }) => {
      fn(JSON.parse(data))
    }
  }
}


const promise:Promise<any> = new Promise((resolve, reject) => {
  wsClient.onopen = () => {
    resolve(new WsClient(wsClient))
  }
  setTimeout(() => {
    reject(new Error('get ws connection timeout'))
  }, 10000)
})

export const getWsClient = () => promise