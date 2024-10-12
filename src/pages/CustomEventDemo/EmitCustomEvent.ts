// 创建CustomEvent并分发事件提取
export function emitCustomEvent(eventType: string, data: any) {
  let event = new CustomEvent(eventType, { detail: data });
  window.dispatchEvent(event);
}