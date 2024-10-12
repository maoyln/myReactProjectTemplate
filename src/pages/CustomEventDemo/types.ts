export type EventDetail = {
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CustomEventType = CustomEvent<EventDetail>;

export enum CustomEventMessageType {
  MyEventMessageType = 'MyEventMessageType'
}