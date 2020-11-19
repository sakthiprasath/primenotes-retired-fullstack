import DomActions from './DomActions.js';
import DomEvents from './DomEvents.js';
import loadComponentsContainer from './ComponentsContainer.js';
import SourceCodeSection from './DocumentSection.js';
import TreeClass from './TreeView.js';
import Header from './Header.js';
import DeveloperComponents from './DeveloperComponents.js';
class Tsp{
	constructor(){
//		Tsp.prototype.dom_events = new DomEvents();
//	    Tsp.prototype.dom_actions = new DomActions();
//        Tsp.prototype.loadComponentsContainer_live_obj = new Object();
	}
}



$(document).ready(function(){
    var tsp = new Tsp();
    let class_list = [
        DomActions,
        loadComponentsContainer,
        TreeClass,
        SourceCodeSection,
        Header,
        DeveloperComponents,
        DomEvents
        ];

//	tsp.loadComponentsContainer_live_obj = new (loadComponentsContainer)()

//	tsp.loadComponentsContainer_live_obj.init().then(function(label_map){
//	    new TreeClass().init().then(function(){
//	        new SourceCodeSection().init();
//	        tsp.dom_events.init(tsp, label_map);
//	        tsp.dom_actions.init(); //initialDomActions should be called only after tsp.loadComponentsContainer.init() and tsp.dom_events.init()
//	    });
//	});

	let len = class_list.length;
    function recursive_dom_builder(index, tsp, ret_Values){
        if(index >= len)
            return null;
        (new class_list[index]()).init(tsp, ret_Values).then(function(tsp, ret_values){
            return recursive_dom_builder(index+1, tsp, ret_values);
        });
    }
recursive_dom_builder(0, tsp, '');

});
