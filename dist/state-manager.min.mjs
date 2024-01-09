/**
 * statemanager@1.0.0 https://github.com/EvitcaStudio/StateManager
 * Compiled 1/9/2024, 10:26:58 AM UTC
 * 
 * statemanager is licensed under a MIT styled License. See LICENSE.md for more info.
 * 
 * Copyright 2024, Evitca Studio, All Rights Reserved
 */
 var t={d:(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{O:()=>r,Z:()=>a});class r{states={};currentState=null;version="1.0.0";constructor(t){if("object"==typeof t&&!Array.isArray(t))for(const e in t)this.registerState()}registerState(t,e){"string"==typeof t?e instanceof a?(e.name=t,(this.states[t]=e).manager=this):console.error(e+" is not a valid state."):console.error("Invalid name for state.")}setState(t,...e){var r=this.states[t];r?(this.currentState&&this.currentState.exit(),this.currentState=r,this.currentState.enter(...e)):console.warn(`State ${t} not found.`)}getCurrentState(){return this.currentState?this.currentState.name:null}update(t){this.currentState&&this.currentState.update(t)}}class a{enter(){}update(t){}exit(){}}var s=e.Z,n=e.O;export{s as State,n as StateManager};