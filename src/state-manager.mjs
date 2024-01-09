import { Logger } from './vendor/logger.min.mjs';
/**
 * A class representing a state machine manager.
 * 
 * @class StateManager  
 * @license StateManager does not have a license at this time. For licensing contact the author
 * @author https://github.com/doubleactii
 */
class StateManager {
	/**
	 * An object containing all the registered states.
	 * 
	 * @private
	 * @type {Object<string, State>}
	 */
	states = {};
	/**
	 * The current state of the state machine.
	 * 
	 * @private
	 * @type {State|null}
	 */
	currentState = null;
	/**
	 * The version of the module.
	 */
	version = "VERSION_REPLACE_ME";
	/**
	 * Creates a new state machine manager.
	 * 
	 * @param {Object<State>} pStates - Array of state objects to register.
	 */
	constructor(pStates) {
        /** The logger module this module uses to log errors / logs.
         * @private
         * @type {Object}
         */
        this.logger = new Logger();
        this.logger.registerType('StateManager-Module', '#ff6600');
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
				this.logger.prefix('StateManager-Module').error(`${pState} is not a valid state.`);
			}
		} else {
			this.logger.prefix('StateManager-Module').error('Invalid name for state.');
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
			this.logger.prefix('StateManager-Module').warn(`State ${pName} not found.`);
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