
## delay

#### import
```typescript
import delay from "https://deno.land/x/denodash@0.1.1/src/utils/delay.ts"
```

#### signature
```typescript
delay = (time: number, fn?: Function, ...args: any[]): Promise<any>
```

Creates a promise which resolves only after a number of milliseconds (time) has passed.

#### Source:

```typescript
export const delay = (time: number, fn?: Function, ...args: any[]): Promise<any> =>
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(fn ? fn(...args) : undefined);
    }, time);
  });

export default delay;

```

#### Test Examples: 

```typescript
import { Rhum } from "../testing_deps.ts";
```

  