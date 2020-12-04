import SourceCodeSection from './DocumentSection.js';



export default class TreeClass{
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
				$('#parent-source-code-main-div').css('left','19%');
				$('#navigation-bar').css('width','19%');
//				$('#sidenav-button-id').css('display','none');
		        $('.split__bar').css('left','19%');
				self.kojinFlag = 0;
			}
		});
	/*end   navigation bar */


        $('#sidenav-button-id').on('click',function(){
            let curr_ele = $(this);
            if(self.kojinFlag == 1 || curr_ele.css('display') !=='None' ){
            	$('#parent-source-code-main-div').css({'left':'19%','width':'81%'});
				$('#parent-source-code-main-div').css('left','19%');
                curr_ele.css('display','none');
				$('#navigation-bar').css({'width':'19%' , 'left':'0%'});
				 $('.split__bar').css('left','19%');
				self.kojinFlag = 0;
            }
        });
    }
    _events(){
        let self = this;
         $('.three-dots').off("click");
         $('.three-dots').on("click", function(event) {
                self.parent_folder = $(this).parent().get(0);
                self.curr_active_folder = $(self.parent_folder).attr('folder-path');
                event.preventDefault();
                $(".context")
                    .show()
                    .css({
                      top: event.pageY,
                      left: event.pageX
                    });
                });

         /*events for tree*/
        $('.folder').off('click');
        $('.folder').on('click', function(){
            let parent = $(this).parent();
            let sibling_1_nested = $(parent).siblings().get(0);
            $(sibling_1_nested).toggleClass('active');
            $(parent).toggleClass('folder-down');
//            let sibling_1_nested = $(this).siblings().get(0);
//            $(sibling_1_nested).toggleClass('active');
//            $(this).toggleClass('folder-down');
        });
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
                        self.create_type = 'File';
                        self.tsp.DomActions._create_new_project_file_form(self, 'new-project-file-create-form')
                        break;
                    }
                    case "Move To Trash":{
                        let active_file_path = $($('.tab-active').children()[0]).attr('file-path');
                        self.tsp.DomActions._delete_project_note_file('document', active_file_path).then(function(){
                            self.tsp.DomActions._notification_dialog('File Moved To Trash');
                        });
                        break;
                    }
                    case "New Folder":{
                        self.create_type = 'Folder';
                        self.tsp.DomActions._create_new_project_file_form(self, 'new-project-file-create-form')
                        break;
                    }
                }
            });
             $('#new-project-file-submit').on('click',function(){
                let project_note_name = $('#new-project-note-name').val();
                if (self.curr_active_folder.indexOf('MY-ROOT') >=0 ){
                        self.curr_active_folder = self.curr_active_folder.replace('MY-ROOT', '');
                }
                let temp_map = {
                    'folder_id' : '',
                    'folder_path' : self.curr_active_folder,
                    'file_name' : project_note_name,
                    'file_type' : 'document',
                    'create_type': self.create_type
                }
//                self.action_obj._initiate_loder();
                 self.tsp.DomActions._create_file_in_backend_duplicate(temp_map).then(function(){


                    let new_file_html = '';
                    let file_name = '';
                    //$(self.parent_folder).attr('folder-path').replace('MY-ROOT','')
                    let folder_path =  self.curr_active_folder + '/' + project_note_name ;
                    if(self.create_type == 'Folder'){
                        new_file_html = `<li><div class="folder-section folder-down" folder-name='${project_note_name}' folder-path='${folder_path}'>`;
                        new_file_html += `<span class="folder"><span class="open-close-folder"> &gt; </span>${project_note_name}</span>`;
                        new_file_html += `<span class="three-dots">...</span></div>`;
                        new_file_html += `<ul class="nested"></ul></li>`;
                    }
                    else if(self.create_type == 'File'){
                        file_name = ('${self.curr_active_folder}').toString();
                        new_file_html = `<li class="file"><a href="#" class="file-click" filename='${project_note_name}' file-type="document" file-path=file_name >${project_note_name}</a></li>`;
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
                    let source_code_section_obj = new SourceCodeSection();
                    if(self.create_type != 'Folder'){
                        source_code_section_obj
                            .buildTab(project_note_name, 'document', self.curr_active_folder);
                        source_code_section_obj._initialise_summer_note();
                    }
                    self._events();
                    self.tsp.DomActions._notification_dialog(`${self.create_type} Creation Success`);
                });
        });

    }

    init(tsp, to_return_values){
        let def = $.Deferred();
        let self = this;
        tsp.TreeClass = this;
        this.tsp = tsp;
        this._get_tree_structure().then(function(res){
            let tree_html = self._get_html(res, `../frontend_files/web-app/all_general_files/separate_project/MY-ROOT`);
            document.getElementById('myUL').innerHTML = tree_html;
            self._build_tree_and_close_sidenav();
            self._context_menu_for_project_tree();
            self._events();
            return def.resolve(tsp, to_return_values);
        });
        return def.promise();
    }

}
