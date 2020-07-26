import DomActions from './DomActions.js';
import DomEvents from './DomEvents.js';
import loadComponentsContainer from './ComponentsContainer.js';

class Tsp{
	constructor(){
		Tsp.prototype.loadComponentsContainer =loadComponentsContainer;
		Tsp.prototype.dom_events = new DomEvents();
	    Tsp.prototype.dom_actions = new DomActions();
	}
}



$(document).ready(function(){
    var tsp = new Tsp();
	new (tsp.loadComponentsContainer)().init();
	tsp.dom_events.init()
	tsp.dom_actions.init(); //initialDomActions should be called only after tsp.loadComponentsContainer.init() and tsp.dom_events.init()
});