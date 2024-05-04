# StateManager
A simple state machine manager and state class that can be used in JavaScript games.

## Installation

### ES Module

```js
import { StateManager, State } from './state-manager.mjs';
```

### IIFE (Immediately Invoked Function Expression)

```js
<script src="state-manager.js"></script>;
// ...
window.StateManagerBundle.StateManager;
window.StateManagerBundle.State;
```

### CommonJS (CJS) Module

```js
const { StateManager, State } = require('./state-manager.cjs.js');
```

# Usage
Import StateManager and State:
```js
import { StateManager, State } from './state-manager.mjs';
```
Create your own states by extending the State class:
```js
class IdleState extends State {
  enter() {
    console.log('Entering IdleState');
  }

  update(pDelta) {
    console.log(`Updating IdleState with delta ${pDelta}`);
  }

  exit() {
    console.log('Exiting IdleState');
  }
}
```
Create a new StateManager instance and register your states:
```js
const stateManager = new StateManager();
stateManager.registerState('idle', new IdleState());
```
Set the initial state:
```js
stateManager.setState('idle');
```
Update the state machine in your game loop:
```js
function gameLoop() {
  // caclulate delta and pass it to the state manager's update method
  stateManager.update(delta);
  requestAnimationFrame(gameLoop);
}
```
# API
# StateManager  

## new StateManager(pStates)  
Creates a new state machine manager.
```js
import { StateManager, State } from './state-manager.mjs';
class FooState extends State {
  // ...
}
class BarState extends State {
  // ...
}
const stateInfo = [
  {name: 'foo', state: new FooState()},
  {name: 'bar', state: new BarState()}
];

const stateManager = new StateManager(stateInfo);
// Now able to change to those states
stateManager.setState('foo');
stateManager.setState('bar');
```

- pStates {Object<State>} - An object containing all the states to be registered.
## registerState(pName, pState)  
Registers a new state with the state machine.

- pName {string} - The name of the state.
- pState {State} - The state object.
```js
import { StateManager, State } from './state-manager.mjs';
const stateManager = new StateManager();
class IdleState extends State {
  // ...
}
stateManager.registerState('idle', new IdleState());
```

## setState(pName, pArg, pArg2, ..., pArgN)  
Sets the current state of the state machine.

- pName {string} - The name of the state to set.
- pArg {*} - Argument(s) to pass to the enter method of the state.
```js
stateManager.setState('idle');
// or with arguments
stateManager.setState('idle', 1, 2, 3);
```
## getCurrentState()  
Gets the current state.

```js
stateManager.getCurrentState(); // 'idle'
```

## update(pDelta)  
Updates the current state of the state machine.

- pDelta {number} - The delta time since the last update in seconds.
```js
stateManager.update(delta);
```

# State
A class representing a state.

## manager
Reference to the manager that is managing this state. 
Will be **`undefined`** if the state is unregistered.
```js
class IdleState extends State {
  // ...
}
const idle = new IdleState();
idle.manager // manager that registered this state.
```

## enter()
Called when entering the state.
```js
class IdleState extends State {
  enter() {
    console.log('Entering IdleState');
  }
}
```

## update(pDelta)
Called when executing the state. This is automatically called when the state manager updates.

- pDelta {number} - The delta time since the last update in seconds.
```js
class IdleState extends State {
  update(pDelta) {
    console.log(`Updating IdleState with delta ${pDelta}`);
  }
}
```

## exit()
Called when exiting the state.
```js
class IdleState extends State {
  exit() {
    console.log('Exiting IdleState');
  }
}
```

# Arguments can be passed when setting the state

```js
import { StateManager, State } from './state-manager.mjs';
const stateManager = new StateManager();

class IdleState extends State {
  enter(pParam) {
    console.log(pParam); // 'foo';
  }
}

const idle = new IdleState();
stateManager.registerState('idle', idle);
stateManager.setState('idle', 'foo');


```

# Author
StateManager was created by doubleactii.

### Global Dependency

StateManager relies on the `VYLO` variable being globally accessible.