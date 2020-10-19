import DomActions from './DomActions.js';
import DomEvents from './DomEvents.js';
import loadComponentsContainer from './ComponentsContainer.js';
import SourceCodeSection from './DocumentSection.js';

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
	    new Tree().init().then(function(){
	        new SourceCodeSection().init();
	        tsp.dom_events.init(label_map);
	    });
	});
	tsp.dom_actions.init(); //initialDomActions should be called only after tsp.loadComponentsContainer.init() and tsp.dom_events.init()


});





class Tree{
    _build_files(file_arr){
        let file_html = '';
        for(let index in file_arr){
            let temp_arr = file_arr[index].split('\\');
            let file_name = temp_arr[temp_arr["length"]-1]
            file_html += `<li class='file'><a href="#" class='file-click' filename='${file_name}' ` +
                            `file-type='document' file-path='${file_arr[index]}' >${file_name}</a></li>`;
        }
        return file_html;
    }

    _get_folder_section(folder_path){
        let temp_arr = '';
        let name = '';
        if( folder_path.indexOf('MY-ROOT') >=0){
            name = 'MY-ROOT';
        }
        else{
            temp_arr = folder_path.split('\\');
            name = temp_arr[temp_arr["length"]-1]
        }
        let html = `<div class='folder-section' folder-name='${name}' folder-path='${folder_path}'>`
			html +=				`<span class="folder">`
			html +=				  `<span class='open-close-folder'> > </span>${name}`
			html +=				`</span>`
			html +=				`<span class='three-dots'>...</span>`
			html +=			`</div>`;
	return html;
    }
    _get_html(m1, main_folder_name){
        if (m1 == {} || m1 == undefined){
            return '';
        }
        let file_html = '';
        let folder_html = [];
        let nested_section = '';
        let folder_section = '';
        let overall_folder_html = '';
        for(let key in m1){
            if(key == 'files'){
                file_html = this._build_files(m1['files']);
            }
            else if(key != '__proto__'){
                folder_html.push(this._get_html(m1[key], key));
            }
        }
        for(let index in folder_html){
            overall_folder_html += folder_html[index];
        }
        nested_section = `<ul class="nested">` + file_html + overall_folder_html + '</ul>';

        folder_section = this._get_folder_section(main_folder_name);

        let res = `<li>` + folder_section + nested_section + `</li>`;
        return res;
    }
    _get_tree_structure(){
        let temp_map = {};
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/tree",
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){

                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();
    }
    init(){
        let def = $.Deferred();
        let self = this;
        this._get_tree_structure().then(function(res){
            let tree_html = self._get_html(res, `../frontend_files/web-app/all_general_files/separate_project/MY-ROOT`);
            document.getElementById('myUL').innerHTML = tree_html;
            def.resolve();
        });
        return def.promise();
    }

}

