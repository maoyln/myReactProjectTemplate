// 发布订阅模式简易demo

export class EventManager {
  private subscribers: { [key: string]: Function[] } = {};
  constructor() {
    this.subscribers = {};
  }
  
  on(type: string, fn: Function) {
    this.subscribers[type] = this.subscribers[type] || [];
    this.subscribers[type].push(fn);
  }

  off(type: string, fn: Function) {
    if (this.subscribers[type]) {
      this.subscribers[type] = this.subscribers[type].filter((cb: Function) => cb !== fn )
    }
  }

  publish(type: string, data: string) {
    const callbacks = this.subscribers[type]
    if (callbacks) {
      callbacks.forEach((callback: Function) => callback(data))
    }
  }

}

const eventManager = new EventManager();

// 创建订阅者函数
function subscriber1(data: string) {
  console.log(`Subscriber 1 received: ${data}`);
}

function subscriber2(data: string) {
  console.log(`Subscriber 2 received: ${data}`);
}

// 订阅事件
eventManager.on('event1', subscriber1);
eventManager.on('event1', subscriber2);

// 发布事件
eventManager.publish('event1', 'Hello World!');

