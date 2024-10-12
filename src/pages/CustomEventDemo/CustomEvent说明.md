> CustomEvent 是一个非常有用的工具，用于在不同的组件或模块之间进行通信。下面我将详细介绍 CustomEvent 的使用，并提供一个使用 React + Hooks + TypeScript 封装的示例。

# CustomEvent 的使用

## 详细介绍 CustomEvent

CustomEvent 是一个内置的 JavaScript 构造函数，用于创建自定义事件。自定义事件可以携带自定义数据，并且可以像普通事件一样被触发和监听。

### 创建自定义事件

```javascript
const event = new CustomEvent('eventName', {
  detail: {
    key1: 'value1',
    key2: 'value2'
  },
  bubbles: true, // 是否冒泡
  cancelable: true // 是否可以取消
});

```

- eventName：自定义事件的名称。
- detail：自定义数据，可以通过 event.detail 访问。
- bubbles：布尔值，表示事件是否冒泡。
- cancelable：布尔值，表示事件是否可以被取消。

### 触发自定义事件

```javascript
element.dispatchEvent(event);
```

- element：触发事件的 DOM 元素。

### 监听自定义事件

```javascript
element.addEventListener('eventName', (event) => {
  console.log(event.detail);
});

```

## React + Hooks + TypeScript 封装示例

### 1. 定义自定义事件的类型
首先，我们需要定义自定义事件的类型，以确保类型安全。

```javascript
type EventDetail = {
  message: string;
};

type CustomEventType = CustomEvent<EventDetail>;

```

### 2. 创建自定义事件的封装
我们可以创建一个自定义事件的封装，使其更易于在 React 组件中使用。

```javascript
import { useEffect, useRef } from 'react';

const useCustomEvent = (eventName: string, handler: (event: CustomEventType) => void) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: CustomEventType) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};

```

### 3. 创建示例组件

我们将创建两个组件：一个子组件用于触发自定义事件，一个父组件用于监听自定义事件。

#### 子组件

```javascript
import React from 'react';

const ChildComponent: React.FC = () => {
  const sendMessage = () => {
    const customEvent = new CustomEvent('customMessage', {
      detail: {
        message: 'Hello from child component!'
      }
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message to Parent</button>
    </div>
  );
};

export default ChildComponent;

```

#### 父组件

```javascript
import React from 'react';
import ChildComponent from './ChildComponent';
import { useCustomEvent } from './useCustomEvent';

const ParentComponent: React.FC = () => {
  const handleCustomMessage = (event: CustomEvent<{ message: string }>) => {
    console.log('Received message from child:', event.detail.message);
  };

  useCustomEvent('customMessage', handleCustomMessage);

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent />
    </div>
  );
};

export default ParentComponent;

```

### 完整代码

#### types.ts

```javascript
type EventDetail = {
  message: string;
};

type CustomEventType = CustomEvent<EventDetail>;

```

#### useCustomEvent.ts

```javascript
import { useEffect, useRef } from 'react';

const useCustomEvent = (eventName: string, handler: (event: CustomEventType) => void) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: CustomEventType) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    window.addEventListener(eventName, eventListener);

    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};

export default useCustomEvent;

```

#### ChildComponent.tsx

```javascript
import React from 'react';

const ChildComponent: React.FC = () => {
  const sendMessage = () => {
    const customEvent = new CustomEvent('customMessage', {
      detail: {
        message: 'Hello from child component!'
      }
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message to Parent</button>
    </div>
  );
};

export default ChildComponent;

```

#### ParentComponent.tsx

```javascript
import React from 'react';
import ChildComponent from './ChildComponent';
import { useCustomEvent } from './useCustomEvent';

const ParentComponent: React.FC = () => {
  const handleCustomMessage = (event: CustomEvent<{ message: string }>) => {
    console.log('Received message from child:', event.detail.message);
  };

  useCustomEvent('customMessage', handleCustomMessage);

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent />
    </div>
  );
};

export default ParentComponent;

```