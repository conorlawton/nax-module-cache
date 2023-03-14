import { Mod, PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod';

export default class ModuleCache implements PluginClass {
	mod: Mod;

	oldLoadScript: Function | undefined;

	prefixes: { [index: string]: string };

	constructor(mod: Mod) {
		this.mod = mod;
		this.prefixes = {};
		window.moduleCache = this;
	}

	postload() {
		this.oldLoadScript = ig._loadScript;
		ig._loadScript = this._loadScript.bind(this);
	}

	preload() {
		console.log("test");
	}

	_loadScript(moduleName: string, requirer: string) {
		if (moduleName.includes(".")) {
			const root = moduleName.split(".")[0];
			let path: string;
			if (path = this.prefixes[root]) {
				ig.lib = path;
			}
		}

		this.oldLoadScript!(moduleName, requirer);

		ig.lib = "";
	}

	registerModPrefix = (prefix: string, path: string) => {
		this.prefixes[prefix] = path;
	}
}