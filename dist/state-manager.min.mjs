/**
 * A class representing a state machine manager.
 * 
 * @class StateManager  
 * @license StateManager does not have a license at this time. For licensing contact the author
 * @author https://github.com/doubleactii
 * Copyright (c) 2023 Evitca Studio
 */
class t{constructor(t){if(this.states={},this.currentState=null,"object"==typeof t&&!Array.isArray(t))for(const e in t)this.registerState()}registerState(t,e){"string"==typeof t?e instanceof r?(e.name=t,(this.states[t]=e).manager=this):console.error(e+" is not a valid state."):console.error("Invalid name for state.")}setState(t,...e){var r=this.states[t];r?(this.currentState&&this.currentState.exit(),this.currentState=r,this.currentState.enter(...e)):console.warn(`State ${t} not found.`)}getCurrentState(){return this.currentState?this.currentState.name:null}update(t){this.currentState&&this.currentState.update(t)}}class r{enter(){}update(t){}exit(){}}export{t as StateManager,r as State};