# StateManager
A simple state machine manager and state class that can be used in JavaScript games.

# Usage
Import StateManager and State:
```js
import { StateManager, State } from './StateManager.js';
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
  const delta = getDeltaSinceLastFrame();
  stateManager.update(delta);
  requestAnimationFrame(gameLoop);
}
```
# API
# StateManager(pStates)  
Creates a new state machine manager.

- pStates {Object<State>} - An object containing all the states to be registered.
## registerState(pName, pState)  

Registers a new state with the state machine.

- pName {string} - The name of the state.
- pState {State} - The state object.

## setState(pName)  
Sets the current state of the state machine.

- pName {string} - The name of the state to set.

## getCurrentState()  
Gets the current state.

## update(pDelta)  
Updates the current state of the state machine.

- pDelta {number} - The delta time since the last update in seconds.

# State
A class representing a state.

## enter()
Called when entering the state.

## update(pDelta)
Called when executing the state.

- pDelta {number} - The delta time since the last update in seconds.
## exit()
Called when exiting the state.

# License
StateManager does not have a license at this time. For licensing contact the author.