import DomActions from './DomActions.js';
import DomEvents from './DomEvents.js';
import loadComponentsContainer from './ComponentsContainer.js';
import SourceCodeSection from './DocumentSection.js';
import TreeClass from './TreeView.js';
import Header from './Header.js';
import DeveloperComponents from './DeveloperComponents.js';
import SearchBox from './SearchBox.js';

class Tsp{
	constructor(){}
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
        SearchBox,
        DomEvents
        ];
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
