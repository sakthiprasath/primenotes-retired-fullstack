import SourceCodeSection from './DocumentSection.js';


export default class TreeClass{
    _get_tree_file_html(path, name, uuid){
                let file_html = `<li class='file'>`
                                    + `<a href="#" class='file-click' content-type="file" file-uuid='${uuid}' filename='${name}' title='${name}'`
                                    +    `file-type='document' file-path='${path}' >`
                                    +    `<div class="tree-note-file-name-div">`
                                    +       `<span> * </span>`
                                    +    `</div>`
                                    +   `<span class="tree-note-file-name">${name}`
                                    +   `</span>`
                                    + `</a><span class='three-dots' content-type="file">...</span> </li>`;
                return file_html;
    }

    _get_tree_folder_html(path, name, uuid){
        let html = `<li><div class='folder-section' folder-name='${name}' folder-uuid='${uuid}' folder-path='${path}'>`
			html +=				`<span class="folder">`
			html +=				  `<span class='open-close-folder'> <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/folder-blue-512.png" style="width: 20px;height: 17px;"> </span>${name}`
			html +=				`</span>`
			html +=				`<span class='three-dots'>...</span>`
			html +=			`</div><ul class="nested"></ul></li>`;

		return html;
    }

    _build_trash_section(){
        let self = this;
        let path = '';
        for(let i in self.trash_list){
            path = self.trash_list[i];
            let file_html = `<li class='file'>`
                                    + `<a href="#" class='file-click' content-type="file" file-uuid='${self.metadata_map[path].uuid}' filename='${self.metadata_map[path].name}' title='${self.metadata_map[path].name}'`
                                    +    `file-type='document' file-path='${path}' >`
                                    +    `<div class="tree-note-file-name-div">`
                                    +       `<span> * </span>`
                                    +    `</div>`
                                    +   `<span class="tree-note-file-name">${self.metadata_map[path].name}`
                                    +   `</span>`
                                    + `</a><span class='three-dots' content-type="file">...</span> </li>`;
            let nested_section = $('.tree-trash-class').siblings().get(0);
            $(nested_section).append($(file_html));
        }
        let tree_trash_section = $('.tree-trash-class').parent();
        $('.tree-trash-tab-class').append($(tree_trash_section).clone());
        $(tree_trash_section).remove();
        //append($(nested_section));
    }

    _build_files(file_arr){
        let file_html = '';
        let self = this;
        for(let index in file_arr){
            if(self.metadata_map[file_arr[index]].trash !== undefined){
                self.trash_list.push(file_arr[index]);
                continue;
            }
            let temp_arr = file_arr[index].split('\\');
            let file_name = self.metadata_map[file_arr[index]].name;
            //(temp_arr[temp_arr["length"]-1]).replace('.txt', '');//hard-coded
            let file_uuid = self.metadata_map[file_arr[index]].uuid;

            this.file_list.push({
                  title: file_name,
                  description: file_arr[index]
                });

            file_html += `<li class='file'>`
                            + `<a href="#" class='file-click' content-type="file" file-uuid='${file_uuid}' filename='${file_name}' title='${file_name}'`
                            +    `file-type='document' file-path='${file_arr[index]}' >`
                            +    `<div class="tree-note-file-name-div">`
                            +       `<span> * </span>`
                            +    `</div>`
                            +   `<span class="tree-note-file-name">${file_name}`
                            +   `</span>`
                            + `</a><span class='three-dots' content-type="file">...</span> </li>`;
        }
        return file_html;
    }

    _get_folder_section(folder_path){
        let self = this;
        let class_list_str = "";
        let name = '';
        let folder_uuid = '';
        if( folder_path.indexOf('MY-ROOT') >=0){
            name = 'MY-ROOT';
        }
        else{
//            console.log(folder_path);
            folder_uuid = self.metadata_map[folder_path].uuid;
            name = self.metadata_map[folder_path].name
            this.folder_list.push({
                      title: name,
                      description: folder_path
                    });
        }
        if(folder_path === 'Trash'){
            class_list_str += ' tree-trash-class';
        }
        let html = `<div class='folder-section ${class_list_str}' folder-name='${name}' folder-uuid='${folder_uuid}' folder-path='${folder_path}'>`
			html +=				`<span class="folder">`
			html +=				  `<span class='open-close-folder'> <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/folder-blue-512.png" style="width: 20px;height: 17px;"> </span>${name}`
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
    let self = this;
        let temp_map = {};
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url: self.tsp.PrimenotesCache.data.url_prefix + "/api/individual-component-fetch/tree",
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){

                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();
    }

    _get_tree_structure_metadata(){
        let self = this;
        let temp_map = {};
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url: self.tsp.PrimenotesCache.data.url_prefix + "/api/tree-note/get-tree-with-metadata",
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();
    }

    _build_tree_and_close_sidenav(){

        /*beginning of navigation  bar */
 		let self = this;
 		self.kojinFlag = 0;

        //.sidenav-button-class ,
        $('#closebtn').click( function(){
			if(self.kojinFlag == 0){ //closing navigation-bar
				var sideNavWidth = '40%';
				var sideNavLeft = 0;
				$('#navigation-bar').css('width','0px');
				$('#parent-source-code-main-div').css({'left':'0px','width':'100%'});
//                $('#sidenav-button-id').css('display','block');
                $('.split__bar').css('left','-20px');
				self.kojinFlag = 1;
			}
			else {//opening navigation-bar
			    let screen_width = window.innerWidth;
                let size_map = {};
                switch(screen_width){
                    case screen_width <= 500:{
                        size_map['nav-bar-width'] = 100;
                        size_map['split-bar-left'] = 100;
                        size_map['source-code-left'] = 100;
                        size_map['source-code-width'] = 0;
                        break;
                    }
                    case screen_width > 500 && screen_width < 650 :{
                        size_map['nav-bar-width'] = 50;
                        size_map['split-bar-left'] = 50;
                        size_map['source-code-left'] = 50;
                        size_map['source-code-width'] = 50;
                        break;
                    }
                    case screen_width > 650 && screen_width < 850 :{
                        size_map['nav-bar-width'] = 40;
                        size_map['split-bar-left'] = 40;
                        size_map['source-code-left'] = 40;
                        size_map['source-code-width'] = 60;
                        break;
                    }
                    case screen_width > 850:{
                        size_map['nav-bar-width'] = 25;
                        size_map['split-bar-left'] = 25;
                        size_map['source-code-left'] = 25;
                        size_map['source-code-width'] = 75;

                        break;
                    }
                }
                let percent = function(num){ return (num + "%");}

				$('#navigation-bar').css('width', percent(size_map['nav-bar-width']));
		        $('.split__bar').css('left',percent( size_map['split-bar-left']));
				$('#parent-source-code-main-div').css('left',percent(size_map['source-code-left']));
				$('#parent-source-code-main-div').css('width',percent(size_map['source-code-width']));

//				$('#sidenav-button-id').css('display','none');
				self.kojinFlag = 0;
			}

		});
	/*end   navigation bar */


        $('#sidenav-button-id, #main-section-button').on('click',function(){
            let curr_ele = $(this);
            if(self.kojinFlag == 1  ){
//            	$('#parent-source-code-main-div').css({'left':'19%','width':'81%'});
//				$('#parent-source-code-main-div').css('left','19%');
//                curr_ele.css('display','none');
//				$('#navigation-bar').css({'width':'19%' , 'left':'0%'});
//				 $('.split__bar').css('left','19%');
				 let screen_width = window.innerWidth;
                let size_map = {};
                    if (screen_width <= 500){
                        size_map['nav-bar-width'] = 100;
                        size_map['split-bar-left'] = 100;
                        size_map['source-code-left'] = 100;
                        size_map['source-code-width'] = 0;
                    }
                    else if (screen_width > 500 & screen_width < 650) {
                        size_map['nav-bar-width'] = 50;
                        size_map['split-bar-left'] = 50;
                        size_map['source-code-left'] = 50;
                        size_map['source-code-width'] = 50;
                    }
                    else if (screen_width > 650 & screen_width < 850) {
                        size_map['nav-bar-width'] = 40;
                        size_map['split-bar-left'] = 40;
                        size_map['source-code-left'] = 40;
                        size_map['source-code-width'] = 60;
                    }
                    else if (screen_width > 850){
                        size_map['nav-bar-width'] = 20;
                        size_map['split-bar-left'] = 20;
                        size_map['source-code-left'] = 20;
                        size_map['source-code-width'] = 80;
                    }

                let percent = function(num){ return (num + "%");}

				$('#navigation-bar').css('width', percent(size_map['nav-bar-width']));
		        $('.split__bar').css('left',percent( size_map['split-bar-left']));
				$('#parent-source-code-main-div').css('left',percent(size_map['source-code-left']));
				$('#parent-source-code-main-div').css('width',percent(size_map['source-code-width']));
                self.kojinFlag = 0;
            }
            else{
			    var sideNavWidth = '40%';
				var sideNavLeft = 0;
				$('#navigation-bar').css('width','0px');
				$('#parent-source-code-main-div').css({'left':'0px','width':'100%'});
//                $('#sidenav-button-id').css('display','block');
                $('.split__bar').css('left','-20px');
				self.kojinFlag = 1;
			}
        });
    }

    clone_folder_into_dialog(folder_path){
        let self = this;
        let uuid = self.metadata_map[folder_path]['uuid'];
        let q1 = ($(`.folder-section[folder-uuid=${uuid} ]`)).parent().get(0);
        let q2 = $($(q1).children().get(0)).clone();// folder-section
        let q3 = $($(q1).children().get(1)).clone();//nested section
        $('#folder-clone-section').empty().append($(q2)).append($(q3));
        self._events();
        self.tsp.SourceCodeSection.events();
        self.tsp.Dialog._create_new_project_file_form('folder-clone-section');
        self.cloned_folder_parent_in_tree = q1;
    }

    action_functions(){
        let self = this;
        self.action_function_map = {
        create_new_tree_note_submit : function(){
                let project_note_name = $('#new-project-note-name').val();
                if (self.curr_active_folder.indexOf('MY-ROOT') >=0 ){
                        self.curr_active_folder = self.curr_active_folder.replace('MY-ROOT', '');
                }
                let path = '';
//                if(self.create_type == 'folder'){
//                    path = self.curr_active_folder + '/' + project_note_name;
//                }
//                else{
                    path = self.curr_active_folder + '/' + project_note_name;
//                }
//                self.curr_active_folder + '/' + project_note_name;
                let temp_map = {
                    'folder_id' : '',
                    'folder_path' : path,
                    'file_name' : project_note_name,
                    'file_type' : 'document',
                    'create_type': self.create_type
                }
//                self.action_obj._initiate_loder();
//                 self.tsp.DomActions._create_file_in_backend_duplicate(temp_map).
                 self.tsp.DomActions._create_file_in_backend_with_metadata(temp_map).then(function(ret_value){
                    self.tsp.TreeClass.metadata_map[path] = ret_value;
                    let new_file_html = '';
                    let file_name = '';
                    //$(self.parent_folder).attr('folder-path').replace('MY-ROOT','')
                    let folder_path =  self.curr_active_folder + '/' + project_note_name ;
                    if(self.create_type == 'folder'){
                        new_file_html = self._get_tree_folder_html(folder_path, project_note_name, ret_value['uuid']);
//                        new_file_html = `<li><div class="folder-section folder-down" folder-name='${project_note_name}' folder-path='${folder_path}'>`;
//                        new_file_html += `<span class="folder"><span class="open-close-folder"> <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/folder-blue-512.png" style="width: 20px;height: 17px;">  </span>${project_note_name}</span>`;
//                        new_file_html += `<span class="three-dots">...</span></div>`;
//                        new_file_html += `<ul class="nested"></ul></li>`;
//                          new_file_html = `<li>` + ret_html +`</li><ul class="nested"></ul></li>`;
                    }
                    else if(self.create_type == 'file'){
                        file_name = ('${self.curr_active_folder}').toString();
                        new_file_html  = `<li class="file"><a href="#" class="file-click" filename="${project_note_name}" file-uuid="${ret_value.uuid}" title="${ret_value.name}" file-type="document" content-type="file" file-path="${path}">`;
                        new_file_html +=    `<div class="tree-note-file-name-div"><span>  * </span>`;
                        new_file_html +=     `</div>`;
                        new_file_html +=     `<span class="tree-note-file-name">${project_note_name}`;
                        new_file_html +=     `</span>`;
                        new_file_html +=   `</div></a>`;
                        new_file_html += `<span class="three-dots" content-type="file">...</span>`
                        new_file_html += `</li>`;

                    }
                    let nested_folder_sibling = $(self.parent_folder).siblings().get(0);
                    if(nested_folder_sibling === undefined){
                        let q1 = $(self.parent).find('.nested');
                        $(q1).append($(new_file_html));
                    }
                    else{
                        $(nested_folder_sibling).prepend($(new_file_html));
                    }

                    /*initialising events for the created file in tree*/
                    let source_code_section_obj = self.tsp.SourceCodeSection;
                    if(self.create_type != 'folder'){
                        source_code_section_obj
                            .buildTab(project_note_name, 'document', path);
//                        source_code_section_obj._initialise_summer_note();
                    }
                    self._events();
                    self.tsp.SourceCodeSection.events();
                    self.tsp.DomActions._notification_dialog(`${self.create_type} Creation Success`);
                });
        },

        copy_paste_UI_update : function(project_note_name, path, uuid){
                        let new_file_html  = `<li class="file"><a href="#" class="file-click" filename="${project_note_name}" content-type="file" file-type="document" file-uuid="${uuid}" title="${project_note_name}" file-path="${path}">`;
                        new_file_html +=    `<div class="tree-note-file-name-div"><span> * </span>`;
                        new_file_html +=     `</div>`;
                        new_file_html +=     `<span class="tree-note-file-name">${project_note_name}`;
                        new_file_html +=     `</span>`;
                        new_file_html +=   `</div></a>`;
                        new_file_html += `<span class="three-dots" content-type="file">...</span>`
                        new_file_html += `</li>`;
                        let nested_folder_sibling = $(self.parent_folder).siblings().get(0);
                        $(nested_folder_sibling).prepend($(new_file_html));
            },

        cut_paste_UI_update : function(project_note_name, new_path, old_path, uuid){
                        let temp_file_list = $('.file-click');
                        let len = temp_file_list.length;
                        let temp_clone = '';
                        for(let i=0;i < len; i++){
                            console.log(temp_file_list[i]);
                            if($(temp_file_list[i]).attr('file-uuid') === uuid){
                                 temp_clone = $(temp_file_list[i]).clone();
                                 $(temp_file_list[i]).parent().remove();
                                 console.log(temp_clone);
                                 break;
                            }
                        }

                        let new_file_html  = `<li class="file"></li>`;
                        temp_clone.attr('file-path', new_path);
                        let new_ele = $(new_file_html).append(temp_clone);
                        let nested_folder_sibling = $(self.parent_folder).siblings().get(0);
                        $(nested_folder_sibling).prepend(new_ele);

                        /*Updating Tabs section after cut paste*/
                        let target_tab = $(`#tab-container > .tab [file-path='${old_path}']`)[0];
                        $(target_tab).attr('file-path', new_path);

            },

        move_to_trash_in_UI : function(path, uuid){
                        let temp_file_list = $('.file-click');
                        let len = temp_file_list.length;
                        let temp_clone = '';

                        for(let i=0;i < len; i++){
                            if($(temp_file_list[i]).attr('file-uuid') === uuid){
                                 temp_clone = $(temp_file_list[i]).clone();
                                 $(temp_file_list[i]).parent().remove();
                                 break;
                            }
                        }
                        let new_file_html  = `<li class="file"></li>`;
                        temp_clone.attr('file-path', path);
                        let new_ele = $(new_file_html).append(temp_clone);
                        let nested_folder_sibling = $('.tree-trash-class').siblings().get(0);
                        $(nested_folder_sibling).prepend(new_ele);
            }
        }
    }

    _events(){
        let self = this;
         let context_menu = function(event, curr){
//             if($('.context').is(":visible")){
//                    return;
//                }
                $('.context').hide();

                if(event.target.getAttribute('content-type') === "file"){
                    self.parent_folder = $(curr).siblings().get(0);
                    self.curr_active_file = $(self.parent_folder).attr('file-path');
                    self.curr_active_folder = undefined;
                    $('.only-folder').hide();
                    if($('.item.active').attr('data-tab') === "trash"){
                        $('.only-file').hide();
                        $('.only-trash').show();
                        $('.both-file-and-folder').hide();
                    }
                    else{
                        $('.only-file').show();
                        $('.only-trash').hide();
                        $('.both-file-and-folder').show();
                    }
                }
                else if($(event.target).closest('a')[0] !== undefined && $(event.target).closest('a')[0].getAttribute('content-type') === "file"){
                    self.parent_folder = $(event.target).closest('a')[0];
                    self.curr_active_file = $(self.parent_folder).attr('file-path');
                    self.curr_active_folder = undefined;
                    $('.only-folder').hide();
                    if($('.item.active').attr('data-tab') === "trash"){
                        $('.only-file').hide();
                        $('.only-trash').show();
                        $('.both-file-and-folder').hide();
                    }
                    else{
                        $('.only-file').show();
                        $('.only-trash').hide();
                        $('.both-file-and-folder').show();
                    }
                }
                else{ //folder right click
                    self.parent_folder = $(curr).parent().get(0);
                    if($(self.parent_folder).attr('folder-path') === undefined)
                        self.parent_folder = $(curr).get(0);

                    self.curr_active_folder = $(self.parent_folder).attr('folder-path');
                    $('.only-file').hide();
                    if($('.item.active').attr('data-tab') === "trash"){
                        $('.only-folder').hide();
                        $('.only-trash').show();
                        $('.both-file-and-folder').hide();
                    }
                    else{
                        $('.only-folder').show();
                        $('.only-trash').hide();
                        $('.both-file-and-folder').show();
                    }
                }
                event.preventDefault();
                $(".context")
                    .show()
                    .css({
                      top: event.pageY - 130,
                      left: event.pageX
                    });
         }
         $('.three-dots').off("mouseover");
         $('.three-dots').on("mouseover", function(event) {
               context_menu(event, this);
                });

         $('.context').off('mouseleave');
         $('.context').on('mouseleave', function(){
               $('.context').hide();
         });


         $('.folder-section').off('contextmenu');
         $('.folder-section').contextmenu(function(e){
            e.preventDefault();
            context_menu(e, this);
         });

         $('.file').off('contextmenu');
         $('.file').contextmenu(function(e){
            e.preventDefault();
            context_menu(e, this);
         });

         /*events for tree*/
        $('.folder-section').off('click');
        $('.folder-section').on('click', function(e){
            $('.folder-section').css('background','none');
            $(this).css('background', self.highlight_background_color);
            self.curr_active_folder = $(this).attr('folder-path');
            self.curr_active_file = undefined;
            if($(e.target).hasClass('three-dots')){ return; }
            let curr = $(this);
            let sibling_1_nested = $(curr).siblings().get(0);
            $(sibling_1_nested).toggleClass('active');
            $(curr).toggleClass('folder-down');
//            let sibling_1_nested = $(this).siblings().get(0);
//            $(sibling_1_nested).toggleClass('active');
//            $(this).toggleClass('folder-down');
        });

        $('.split__bar, #navigation-bar, .sidenav-button-class, #middle-section, file-factory-split-bar').off('mouseover');
        $('.split__bar, #navigation-bar, .sidenav-button-class, #middle-section, file-factory-split-bar').mouseover(function(){
//            $('.sidenav-button-class').show();
            $('.split__bar').css('background','rgb(156 187 214)');
        });
        $('.split__bar, #navigation-bar #middle-section').off('mouseleave');
        $('.split__bar, #navigation-bar #middle-section').mouseleave(function(){
//            $('.sidenav-button-class').css('display','none');
            $('.split__bar').css('background','#e5e9ec');
        });

    }

    __internal_rename(uuid, old_path, new_path, new_name){
            let self = this;
            let def = $.Deferred();
            let new_file_name = $('#tree-note-file-rename').val();
//            self.label_map[file_key].name = new_file_name;
            let send_data = {
                'uuid': uuid,
                'new_path' : new_path,
                'new_name' : new_name
            }
            self.tsp.DomActions._rename_tree_note_files_with_metadata(send_data).then(function(response){
                return def.resolve(response);
            });
            return def.promise();
        }

    _onfocusout_rename_field(){
        let self = this;
        $('#tree-note-file-rename').on('blur',function(){
	        let new_name = $(this).val();
            let qq = self.parent_folder;
            let old_path = '', old_name = '', uuid ='';
            if(self.curr_active_folder !== undefined){
                old_path = $(qq).attr('folder-path');
                old_name = $(qq).attr('title');
                uuid = $(qq).attr('folder-uuid');
            }
            else{
                old_path = $(qq).attr('file-path');
                old_name = $(qq).attr('title');
                uuid = $(qq).attr('file-uuid');
            }
			let path_arr = old_path.split('/');
            path_arr[path_arr["length"]-1]='';
            let new_path = path_arr.join('/');
            new_path = new_path + new_name;

            let html ='';
            if(self.curr_active_folder !== undefined){
                html = self._get_tree_folder_html(new_path, new_name, uuid);
            }
            else{
                html = self._get_tree_file_html(new_path, new_name, uuid);
            }
			if(old_name !== new_name){
                self.__internal_rename(uuid, old_path, new_path, new_name).then(function(response){
                    delete self.metadata_map[old_path];
                    self.metadata_map[new_path] = response;
                    let temp = $(qq).parent().parent();
                    temp.append($(html));
                    $(qq).parent().remove();

			        self.tsp.SourceCodeSection.events();
			        self._events();
			        self.tsp.DomActions._notification_dialog('Rename Successful');

                });
			}
			else{
			    $(qq).show();
			    $(this).remove();
			}
        });
    }

    _build_rename_field_and_call_backend(){
        let self = this;
        let q1 = self.parent_folder;
        let q2 = $(`<input id="tree-note-file-rename"  type="text" />`);
        $(q1).before(q2);
        $(q1).hide();
        let q3_text = '';
        if(self.curr_active_folder !== undefined){
            q3_text = $(q1).attr('folder-name')
        }
        else{
            q3_text = $(q1).attr('filename')
        }
        $(q2).val(q3_text)
        $(q2).focus();

        $('#tree-note-file-rename').keypress(function (e) {
          if (e.which == 13) {
            $(this).blur();
          }
        });
        self._onfocusout_rename_field();
    }

    _context_menu_for_project_tree(){
          let self = this;
            $(document).click(function(e) {
                if($(e.target).hasClass('three-dots') != true){
                    $(".context").css('display', 'none');
                }
            });

            $('.inner-item').on('click',function(){
                let option_name = $(this).text().trim();
                switch(option_name){
                    case "New File":{
                        self.create_type = 'file';
                        self.tsp.Dialog._create_new_project_file_form('new-project-file-create-form')
                        break;
                    }
                    case "Move To Trash":{
                        let uuid = '';
                        let delete_type = '';
                        let path = '';
                        if(self.curr_active_folder !== undefined){
                            uuid = self.metadata_map[self.curr_active_folder].uuid;
                            path = self.curr_active_folder;
                            delete_type = 'folder';
                        }
                        else{
                            uuid = self.metadata_map[self.curr_active_file].uuid;
                            path = self.curr_active_file;
                            delete_type = 'file';
                        }

                        self.tsp.DomActions._delete_project_note_file(uuid).then(function(){
                            self.metadata_map[path]['trash'] = true;
                            self.action_function_map.move_to_trash_in_UI(path, uuid);
                            self._events();
                            self.tsp.DomActions._notification_dialog(delete_type +' Moved To Trash');
                        });
                        break;
                    }
                    case "New Folder":{
                        self.create_type = 'folder';
                        self.tsp.Dialog._create_new_project_file_form('new-project-file-create-form')
                        break;
                    }
                    case "Rename":{
                        self._build_rename_field_and_call_backend();
                        break;
                    }
                    case "Copy":{
                        self.copy_flag = true;
                        self.cut_flag = false;
//                        if(self.curr_active_folder !== undefined){
//                            self.curr_copy_folder = self.curr_active_folder;
//                        }
                        if(self.curr_active_file !== undefined){
                            self.curr_copy_file = self.curr_active_file;
                        }
                        break;
                    }
                    case "Cut":{
                        self.copy_flag = false;
                        self.cut_flag = true;
//                        if(self.curr_active_folder !== undefined){
//                            self.curr_copy_folder = self.curr_active_folder;
//                        }
                         if(self.curr_active_file !== undefined){
                            self.curr_copy_file = self.curr_active_file;
                        }
                        break;
                    }
                    case "Paste":{
                        if(self.copy_flag == true){
                            self.curr_active_folder;
                            let data_map = {
                                'old_file_uuid': self.metadata_map[self.curr_copy_file].uuid,
                                'new_path': self.curr_active_folder + '/' + self.metadata_map[self.curr_copy_file].name
                            }
                            self.tsp.DomActions._copy_paste_file_in_backend_with_metadata(data_map).then(function(response){
                                self.tsp.TreeClass.metadata_map[response.path] = response;
                                self.action_function_map.copy_paste_UI_update(response.name, response.path, response.uuid);
                                self._events();
                                self.file_list.pop({title:response.name, description: self.curr_copy_file});
                                self.file_list.push({
                                          title: response.name,
                                          description: response.path
                                     });
                                     self.file_folder_list = [{
                                      name: "File",
                                      results:  self.file_list //this is list

                                    },
                                    {
                                      name: "Folder",
                                      results: self.folder_list //this is list
                                    },
                                ];
                                self.tsp.SourceCodeSection.events();
                            });
                            self.tsp.DomActions._notification_dialog(`Copy Paste was Successful`);
                        }
                        else{
                            let data_map = {
                                'file_uuid': self.metadata_map[self.curr_copy_file].uuid,
                                'new_path': self.curr_active_folder + '/' + self.metadata_map[self.curr_copy_file].name
                            }
                            self.tsp.DomActions._cut_paste_file_in_backend_with_metadata(data_map).then(function(response){
                                delete self.tsp.TreeClass.metadata_map[self.curr_copy_file];
                                self.tsp.TreeClass.metadata_map[response.path] = response;

                                self.action_function_map.cut_paste_UI_update(response.name, response.path, self.curr_copy_file, response.uuid);
                                self._events();
                                self.file_list.pop({title:response.name, description: self.curr_copy_file});
                                self.file_list.push({
                                          title: response.name,
                                          description: response.path
                                     });
                                     self.file_folder_list = [{
                                          name: "File",
                                          results:  self.file_list //this is list
                                        },
                                        {
                                          name: "Folder",
                                          results: self.folder_list //this is list
                                        },
                                      ];
                                self.tsp.SourceCodeSection.events();
                            });
                            self.tsp.DomActions._notification_dialog(`Cut Paste was Successful`);
                        }
                    }

                    case "Details":{
                         if(self.curr_active_folder !== undefined){
                            self.tsp.DetailsPanel.launch_details_data(self.curr_active_folder);
                        }
                        else{
                            self.tsp.DetailsPanel.launch_details_data(self.curr_active_file);
                        }
                        break;
                    }
                }
            });
    }
    _build_breadcrumb(path){
        let self = this;
        let path_arr = path.split('/');
        let html = "";
        let len = path_arr.length;
        for (let index = 0; index < path_arr.length; index++) {

            if(index !== len-1){
                html += `<a class='section' folder-path='${path_arr.slice(0,index+1).join("/")}'>${path_arr[index]} </a>`;
                html += `<div class='divider'> / </div> `;
            }
            else{
                html += `<a class='active section'>${path_arr[index]}</a>`;
            }
        }
         $('.ui.breadcrumb').empty();
         $('.ui.breadcrumb').append($(html));

         $('.breadcrumb > .section').off('click');
         $('.breadcrumb > .section').on('click', function(){
               if($(this).attr('folder-path') !== undefined) self.tsp.TreeClass.clone_folder_into_dialog( $(this).attr('folder-path'));
         });
    }
    init(tsp, to_return_values){
        let def = $.Deferred();
        let self = this;
        tsp.TreeClass = this;
        this.tsp = tsp;
        this.file_list = [];
        this.folder_list = [];
        this.action_function_map = {};
        this.curr_copy_file = undefined;
        this.curr_copy_folder = undefined;

        this.action_functions();
        this.metadata_map = {};
        this.trash_list = [];
        this.highlight_background_color = '#cce2d6';
        this.cloned_folder_parent_in_tree = null;
        $('.tabular.menu .item').tab();
        this.file_folder_list = [{
              name: "File",
              results:  this.file_list //this is list

            },
            {
              name: "Folder",
              results: this.folder_list //this is list

            },
        ];
        this._get_tree_structure_metadata().then(function(res){
            self.metadata_map = res[1];
            let tree_html = self._get_html(res[0], `../frontend_files/web-app/all_general_files/separate_project/MY-ROOT`);
            document.getElementById('myUL').innerHTML = tree_html;
            self._build_tree_and_close_sidenav();
            self._build_trash_section();
            self._context_menu_for_project_tree();
            self._events();
            return def.resolve(tsp, to_return_values);
        });
        return def.promise();
    }
}
