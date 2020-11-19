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

        /*events for tree*/
        $('.folder').on('click', function(){
            let parent = $(this).parent();
            let sibling_1_nested = $(parent).siblings().get(0);
            $(sibling_1_nested).toggleClass('active');
            $(parent).toggleClass('folder-down');
//            let sibling_1_nested = $(this).siblings().get(0);
//            $(sibling_1_nested).toggleClass('active');
//            $(this).toggleClass('folder-down');
        });



        /*beginning of navigation  bar */
 		let self = this;
 		self.kojinFlag = 0;

        //.sidenav-button-class ,
        $('#closebtn').click( function(){
			if(self.kojinFlag == 0){ //closing navigation-bar
				var sideNavWidth = '40%';
				var sideNavLeft = 0;
				$('#navigation-bar').css('width','0px');
				$('#source-code-main-div').css({'left':'0px','width':'100%'});
                $('#sidenav-button-id').css('display','block');
                $('.split__bar').css('left','-20px');
				self.kojinFlag = 1;
			}
			else {//opening navigation-bar
				$('#source-code-main-div').css('left','19%');
				$('#navigation-bar').css('width','19%');
				$('#sidenav-button-id').css('display','none');
		        $('.split__bar').css('left','19%');
				self.kojinFlag = 0;
			}
		});
	/*end   navigation bar */


        $('#sidenav-button-id').on('click',function(){
            let curr_ele = $(this);
            if(self.kojinFlag == 1 || curr_ele.css('display') !=='None' ){
            	$('#source-code-main-div').css({'left':'19%','width':'81%'});
				$('#source-code-main-div').css('left','19%');
                curr_ele.css('display','none');
				$('#navigation-bar').css({'width':'19%' , 'left':'0%'});
				 $('.split__bar').css('left','19%');
				self.kojinFlag = 0;
            }
        });
    }
    _context_menu_for_project_tree(){
          let self = this;
          let curr_active_folder = '';
          let parent_folder = '';

          $('.three-dots').on("click", function(event) {
                parent_folder = $(this).parent().get(0);
                curr_active_folder = $(parent_folder).attr('folder-path');
                event.preventDefault();
                $(".context")
                    .show()
                    .css({
                      top: event.pageY,
                      left: event.pageX
                    });
                });

            $(document).click(function(e) {
                if($(e.target).hasClass('three-dots') != true){
                    $(".context").css('display', 'none');
                }
            });

            $('.inner-item').on('click',function(){
                let option_name = $(this).text().trim();
                switch(option_name){
                    case "New File":
                    self.tsp.DomActions._create_new_project_file_form(self, 'new-project-file-create-form')
                    break;

                }
            });
             $('#new-project-file-submit').on('click',function(){
                let project_note_name = $('#new-project-note-name').val();
                let temp_map = {
                    'folder_id' : '',
                    'folder_path' : curr_active_folder,
                    'file_name' : project_note_name,
                    'file_type' : 'document'
                }
//                self.action_obj._initiate_loder();
                 self.tsp.DomActions._create_file_in_backend_duplicate(temp_map).then(function(){

                    if (curr_active_folder.indexOf('MY-ROOT') >=0 ){
                        curr_active_folder = curr_active_folder.replace('MY-ROOT', project_note_name + '.txt');
                    }
                    let new_file_html = `<li class="file"><a href="#" class="file-click" filename='${project_note_name}' file-type="document" file-path='${curr_active_folder}'>${project_note_name}</a></li>`
                    let nested_folder_sibling = $(parent_folder).siblings().get(0);
                    $(nested_folder_sibling).prepend($(new_file_html));
                    /*initialising events for the created file in tree*/
                    let source_code_section_obj = new SourceCodeSection();
                    source_code_section_obj
                        .buildTab(project_note_name, 'document', curr_active_folder);
                    source_code_section_obj._initialise_summer_note();

                    let content_str = 'File Creation Success';
                    self.tsp.DomActions._notification_dialog(content_str);
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
            return def.resolve(tsp, to_return_values);
        });
        return def.promise();
    }

}
