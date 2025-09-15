// @ts-ignore
import { Logger } from './vendor/logger.min.mjs';

/**
 * A class representing a state.
 */
export class State {
	/**
	 * The name of the state.
	 */
	name?: string;

	/**
	 * The manager instance this state belongs to.
	 */
	manager?: StateManager;

	/**
	 * Called when entering the state.
	 */
	enter(...args: any[]): void { }

	/**
	 * Called when executing the state.
	 * 
	 * @param pDelta - The delta time since the last update in seconds.
	 */
	update(pDelta: number): void { }

	/**
	 * Called when exiting the state.
	 */
	exit(): void { }
}

/**
 * A class representing a state machine manager.
 */
export class StateManager {
	/**
	 * An object containing all the registered states.
	 */
	private states: Record<string, State> = {};
	
	/**
	 * The current state of the state machine.
	 */
	private currentState: State | null = null;
	
	/**
	 * The version of the module.
	 */
	version = "VERSION_REPLACE_ME";
	
	/**
	 * The logger module this module uses to log errors / logs.
	 */
	private logger: Logger;

	/**
	 * Creates a new state machine manager.
	 * 
	 * @param pStates - Object of state objects to register.
	 */
	constructor(pStates?: Record<string, State>) {
		// @ts-ignore
		this.logger = new Logger();
		this.logger.registerType('StateManager-Module', '#ff6600');
		
		// Loop passed states and register them. {'name': foo, 'state': state}
		if (typeof (pStates) === 'object' && !Array.isArray(pStates)) {
			for (const stateName in pStates) {
				this.registerState(stateName, pStates[stateName]);
			}
		}
	}

	/**
	 * Registers a new state with the state machine.
	 * 
	 * @param pName - The name of the state.
	 * @param pState - The state object.
	 */
	registerState(pName: string, pState: State): void {
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
	 * @param pName - The name of the state to set.
	 * @param pRest - The arguments that were passed when setting this state.
	 */
	setState(pName: string, ...pRest: any[]): void {
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
	getCurrentState(): string | null {
		return this.currentState ? this.currentState.name || null : null;
	}

	/**
	 * Updates the current state of the state machine.
	 * 
	 * @param pDelta - The delta time since the last update in seconds.
	 */
	update(pDelta: number): void {
		if (this.currentState) {
			this.currentState.update(pDelta);
		}
	}
}
