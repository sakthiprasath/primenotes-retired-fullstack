import DomActions from './DomActions.js';
import DomEvents from './DomEvents.js';
import loadComponentsContainer from './ComponentsContainer.js';

class Tsp{
	constructor(){
		Tsp.prototype.dom_events = new DomEvents();
	    Tsp.prototype.dom_actions = new DomActions();
        Tsp.prototype.loadComponentsContainer_live_obj = new Object();
	}
}



$(document).ready(function(){
    var tsp = new Tsp();
	tsp.loadComponentsContainer_live_obj = new (loadComponentsContainer)()

	tsp.loadComponentsContainer_live_obj.init().then(function(label_map){
	    tsp.dom_events.init(label_map);
	});
	tsp.dom_actions.init(); //initialDomActions should be called only after tsp.loadComponentsContainer.init() and tsp.dom_events.init()
});