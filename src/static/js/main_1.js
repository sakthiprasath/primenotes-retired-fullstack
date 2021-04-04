
import Dialog from './Dialog.js';
import DomActions from './DomActions.js';
import DomEvents from './DomEvents.js';
import loadComponentsContainer from './ComponentsContainer.js';
import SourceCodeSection from './DocumentSection.js';
import TreeClass from './TreeView.js';
import TreeCRUD from './TreeCRUD.js';
import Header from './Header.js';
import DeveloperComponents from './DeveloperComponents.js';
import SearchBox from './SearchBox.js';
import DetailsPanel from './DetailsPanel/DetailsPanel.js';
//import IndexedDb from './lib/IndexedDb.js';


class Tsp{
	constructor(){}
}

function calculate_progress_bar(counter, factor){
    $("#pre-loader-bar").progress({
      percent: Number(factor * counter) // convert the value from the table to a number
    });
    if(Math.floor(factor * counter)  === 100){
        setTimeout(function(){
            document.getElementById("destination-container").style.display = "block";
            document.getElementById("top-header").style.display = "block";
            document.getElementById("pre-loader-bar").style.display = "none";
        },2000);
    }
}

$(document).ready(function(){
    var tsp = new Tsp();
    let class_list = [
        Dialog,
        DomActions,
//        IndexedDb,
        loadComponentsContainer,
        TreeClass,
        TreeCRUD,
        SourceCodeSection,
        Header,
        DeveloperComponents,
        SearchBox,
        DetailsPanel,
        DomEvents
        ];
	let len = class_list.length;


	 $("#pre-loader-bar").progress('increment');
    let factor = 100/len ;
    document.getElementById("pre-loader-bar").style.display = "block";
    document.getElementById("destination-container").style.display = "none";
    document.getElementById("top-header").style.display = "none";

    function recursive_dom_builder(index, tsp, ret_Values){
        if(index >= len)
            return null;
        (new class_list[index]()).init(tsp, ret_Values).then(function(tsp, ret_values){
            calculate_progress_bar(index + 1, factor);
            return recursive_dom_builder(index+1, tsp, ret_values);
        });
    }
recursive_dom_builder(0, tsp, '');

});

