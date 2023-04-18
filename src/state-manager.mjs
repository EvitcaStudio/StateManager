/**
 * A class representing a state machine manager.
 * 
 * @class StateManager  
 * @license StateManager does not have a license at this time. For licensing contact the author
 * @author https://github.com/doubleactii
 * Copyright (c) 2023 Evitca Studio
 */
class StateManager {
	/**
	 * Creates a new state machine manager.
	 * 
	 * @param {Object<State>} pStates - Array of state objects to register.
	 */
	constructor(pStates) {
		/**
		 * An object containing all the registered states.
		 * 
		 * @type {Object<string, State>}
		 */
		this.states = {};

		/**
		 * The current state of the state machine.
		 * 
		 * @type {State|null}
		 */
		this.currentState = null;

		// Loop passed states and register them. {'name': foo, 'state': state}
		if (typeof (pStates) === 'object' && !Array.isArray(pStates)) {
			for (const state in pStates) {
				this.registerState();
			}
		}
	}

	/**
	 * Registers a new state with the state machine.
	 * 
	 * @param {string} pName - The name of the state.
	 * @param {State} pState - The state object.
	 */
	registerState(pName, pState) {
		if (typeof (pName) === 'string') {
			if (pState instanceof State) {
				pState.name = pName;
				this.states[pName] = pState;
				pState.manager = this;
			} else {
				console.error(`${pState} is not a valid state.`);
			}
		} else {
			console.error('Invalid name for state.');
		}
	}

	/**
	 * Sets the current state of the state machine.
	 * 
	 * @param {string} pName - The name of the state to set.
	 * @param {*} pRest - The arguments that were passed when setting this state.
	 */
	setState(pName, ...pRest) {
		const state = this.states[pName];
		if (!state) {
			console.warn(`State ${pName} not found.`);
			return;
		}

		if (this.currentState) {
			this.currentState.exit();
		}

		this.currentState = state;
		this.currentState.enter(...pRest);
	}

	/**
	 * Gets the current state.
	 */
	getCurrentState() {
		return this.currentState ? this.currentState.name : null;
	}

	/**
	 * Updates the current state of the state machine.
	 * 
	 * @param {number} pDelta - The delta time since the last update in seconds.
	 */
	update(pDelta) {
		if (this.currentState) {
			this.currentState.update(pDelta);
		}
	}
}

/**
 * A class representing a state.
 */
class State {
	/**
	 * Called when entering the state.
	 */
	enter() { }

	/**
	 * Called when executing the state.
	 * 
	 * @param {number} pDelta - The delta time since the last update in seconds.
	 */
	update(pDelta) { }

	/**
	 * Called when exiting the state.
	 */
	exit() { }
}

export { StateManager, State };