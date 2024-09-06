// utils/PubSub.ts
class PubSub {
  private _topics: { [key: string]: Function[] } = {};

  subscribe(topic: string, callback: Function): void {
    if (!this._topics[topic]) {
      this._topics[topic] = [];
    }
    this._topics[topic].push(callback);
  }

  unsubscribe(topic: string, callback: Function): void {
    if (this._topics[topic]) {
      this._topics[topic] = this._topics[topic].filter(cb => cb !== callback);
    }
  }

  publish(topic: string, data: any): void {
    if (this._topics[topic]) {
      this._topics[topic].forEach(callback => callback(data));
    }
  }
}

export default PubSub;
