import DomActions from './DomActions.js';
import loadComponentsContainer from './ComponentsContainer.js';

export default class DomEvents{
    components_list= [];
    active_component_dialog_elements = [];
    static _get_action_object(){
        return new DomActions()
    }
    static _get_components_container_object(){
        return new loadComponentsContainer()
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
    _move_tabs_for_source_code_section(){
        /*move tabs left right */
            $('#move-tabs-right').on('click',function(){
                let curr_target = $('#tab-container');
                let tabs_container_left = parseInt(curr_target.css('left'));
                curr_target.css('left', tabs_container_left + 100);
            });
            $('#move-tabs-left').on('click',function(){
                let curr_target = $('#tab-container');
                let tabs_container_left = parseInt(curr_target.css('left'));
                curr_target.css('left', tabs_container_left - 100);
            });


    }
    _create_component_buttons_generation(file_type){

         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/get-all-files/" + file_type,
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        let files = {};
                        files = response;
                        for(let i in files){
                            let file = files[i];
                            let button_html = `<button class="create-component create-component button tab-options-button" title="` + file +`">`+
				                                file+ `</button>`;
                            $('#component-tabs').append($(button_html))
                        }

                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();

    }


    _initialize_file_chat_switches_events(){//component container left-corner
        self = this;
        self.action_obj._initialize_file_chat_switches_actions();
    }

    _initialize_tool_tips(){
       $('[data-toggle="tooltip"]').tooltip();
    }

    _component_container_open_close(){
        /*component container open-close */
         $('#close-editor-button').on('click',function(){
            $('#pane').css({'display':'block'});
         });

         $('#change-pane-orientation-left').on('click',function(){
            $('#pane').removeAttr('class');
            $('#pane').addClass('pane-orientation-left-class');
         });

        $('#change-pane-orientation-right').on('click',function(){
            $('#pane').removeAttr('class');
            $('#pane').addClass('pane-orientation-right-class');
         });
         $('#component-factory-title').on('dblclick', function(){
            $('#pane').removeAttr('class');
            DomEvents._get_action_object().maximize_icon_click_action();
         });

    }

    _create_component_open_close(){
       /*component create dialog open close*/

        this.active_component_dialog_element = '';
        var self = this;

        self.action_obj = DomEvents._get_action_object();
        self.action_obj._build_new_component().then(function(){
            self.dialog_component = self.action_obj._build_component_dialog().parent();
            $(self.dialog_component).css('display', 'none');
        });

        $('.create-component').on('click',function(){
            $(self.dialog_component).css('display', 'block');
            self.action_obj._create_component_open_close(self,this);
        });
    }

    _download_video_click_event(){
        /*download youtube video*/
        self = this;
        $('#download-video-button').on('click',function(){
            self.action_obj.download_video_click_action();
        });
    }

    _maximize_icon_click_event(){
        self = this;
        self.prev_width = 0;
        self.prev_height = 0;
        $('.maximize-icon').on('click',function(){
            DomEvents._get_action_object().maximize_icon_click_action();
            $('#pane').removeClass('pane-orientation-left-class');
            $('#pane').removeClass('pane-orientation-right-class');
        });
    }
    _tabs_dropdown_click(){
        self = this;
        self.tabs_dropdown_click_flag = 0;
        
        $('#tabs-list-drop-down').on('click',function(){
            let action_obj = DomEvents._get_action_object()
            action_obj._tabs_drop_down_click(self);
        });

    }
    _get_components_list(){
            let compo_names = [];
            let elems = $('.create-component');
            for (let i=0; i< elems.length;i++){
                compo_names.push(elems[i].title.toLowerCase());
            }
            return compo_names;
    }
    _create_component_form(){
        let self = this;
        $('#create-component-submit-btn').on('click',function(){
            let action_obj = DomEvents._get_action_object();
            action_obj._create_component_submit_execution(self)
        });

		$('#close-create-component-form').on('click', function(){
				$('#create-component-form').css('display','none')
		});

        $('#create-component-add-btn').on('click',function(){
			$('#create-component-form').css('display','block');

		});
    }

    _create_new_file_factory_form(){
        /*create new file */
        let self = this;
        $('#create-new-file').on('click', function(){
            $('#create-new-file-form').css('display','block');

        });
        $('#create-new-file-submit-btn').on('click',function(){

            let file_name = $('#create-file-text-box').val();
            if (file_name == '' || self.label_map[file_name] != undefined){
                alert('File exists with the same name ');
                return;
            }
            self.label_map[file_name] = [file_name];
            let action_obj = DomEvents._get_action_object();
            action_obj._create_file_in_backend('file_factory', file_name);
            let html="<div class='individual-search' id='"+file_name+"'> <span class='search-result-item' >"+file_name+"</span></div>";

	        $('#file-middle-section').prepend($(html));
	        loadComponentsContainer.initialisingEventHandlers();
        });

        $('#close-create-file-form').on('click',function(){
            $('#create-new-file-form').css('display', 'none');
        });
    }

     __internal_rename(rename_field){
            let new_file_name = $(rename_field).val();
            let old_file_name = rename_field.getAttribute('placeholder').trim();

            let actionObj = DomEvents._get_action_object();
            actionObj._rename_file_factory_files('file_factory', old_file_name, new_file_name).then(function(){
                let new_span = `<span class="search-result-item">${new_file_name}</span>`
                let parent_ele = $(rename_field).parent();
                parent_ele.attr('id', new_file_name.trim().replaceAll('  ',' ').replaceAll(' ','-'));
                parent_ele.empty();
                parent_ele.append($(new_span));
            });
        }

    _build_rename_field_and_call_backend(curr_icon_obj){
        let self = this;
        let file_name = curr_icon_obj.getAttribute('file-name').trim();

        let input =  `<input type='text' value='${file_name}' placeholder='${file_name}' onfocusout=self.__internal_rename(this); />`;
        let curr_file_ele = $('#'+ file_name.trim().replaceAll('  ',' ').replaceAll(' ','-'));
        curr_file_ele.empty();
        curr_file_ele.append($(input));
    }

    _delete_file_in_the_backend(curr_icon_obj){
        let self = this;
        let file_name = curr_icon_obj.getAttribute('file-name').trim();
        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
          let action_obj = DomEvents._get_action_object()
          action_obj._delete_file('file_factory', file_name).then(function(){
            alert('file_deleted');
          }).fail(function(){
            alert('cant delete the file');
          });

        }
    }
    _mark_favourite_in_the_backend(file_name){
            alert(file_name)
    }


    _open_close_main_section_wrapper(){
        let self = this;
        self.active_bg_color = '#3d3f57';
        self.inactive_bg_color = '#7ebdd2';
        function _hide_all_main_section_wrapper_class(){
            $('.main-section-wrapper-class').css('display','none');
            let css_map = {'background':self.inactive_bg_color,
                            'color': 'black'};
            $('.open-close').css(css_map);


        }
        $('#open-close-overlay').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#overlay').css('display','block');
            let css_map = {'background':'rgb(20 222 92)',
                            'color': 'black'};
            $(this).css(css_map);
        });

        $('#html-renderer').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#html-renderer-section').css('display','block');
            let css_map = {'background':'rgb(20 222 92)',
                            'color': 'black'};
            $(this).css(css_map);
        });

        $('#main-section-button').on('click',function(){
            _hide_all_main_section_wrapper_class();
            $('#main-sections').css('display','block');
            let css_map = {'background':'rgb(20 222 92)',
                            'color': 'black'};
            $(this).css(css_map);
        });


    }
    _create_event_listeners_for_dragbar(){
        const bar = document.querySelector('.split__bar');
        const left = document.querySelector('.split__left');
        let self = this;
        self.mouse_is_down = false;

        bar.addEventListener('mousedown', (e) => {
          self.mouse_is_down = true;
        })

        document.addEventListener('mousemove', (e) => {
          if (!self.mouse_is_down) return;
          let screenWidth = screen.width;
          let q1 = screenWidth - parseInt(`${e.clientX}px`);
          let q2 =  parseInt(`${e.clientX}px`);
          left.style.width = `${e.clientX}px`;
          $('#source-code-main-div').css('width',q1);
          $('#source-code-main-div').css('left',q2);
          $('.split__bar').css('left',q2-5);
        })

        document.addEventListener('mouseup', () => {
          self.mouse_is_down = false;
        })
    }

    _create_new_project_file_form(self, curr_active_folder){
         var modal = document.getElementById("modal-id");
         modal.style.display = "block";

         // Get the <span> element that closes the modal
         var span = document.getElementById("close-modal");

         // When the user clicks on <span> (x), close the modal
         span.onclick = function() {
            modal.style.display = "none";
         }



         // When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";

                   }
            }
    }

    _context_menu_for_project_tree(){
          let self = this;
          let curr_active_folder = '';
//          let html = `<div class="inner-item-form">` +
//				    `<input id="new-project-note-name" type="text" /> `+
//				    `<button id='new-project-file-submit'>Create</button> </div>`;
//
//          $('.modal-body').append($(html).clone());
          $('.three-dots').on("click", function(event) {
                let parent_folder = $(this).parent().get(0);
                curr_active_folder = $(parent_folder).attr('folder-name');
                event.preventDefault();
                $(".context")
                    .show()
                    .css({
                      top: event.pageY - 100,
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
                    self._create_new_project_file_form(self, curr_active_folder)
                    break;

                }
            });
             $('#new-project-file-submit').on('click',function(){
                let project_note_name = $('#new-project-note-name').val();
                let temp_map = {
                    'folder_id' : '',
                    'folder_name' : curr_active_folder,
                    'file_name' : project_note_name,
                    'file_type' : 'document'
                }
                self.action_obj._create_file_in_backend_duplicate(temp_map);

        });


    }
    __display_youtube_streaming_dialog(){
        $(this.dialog_component).css('display', 'block');
    }
    _initialize_youtube_stream(){
        let action_obj = DomEvents._get_action_object();
        let self = this;
        $('#stream-youtube-video').on('click',function(){
            let youtube_link = $('#youtube-video-link').val();
             self.__display_youtube_streaming_dialog();
             $(self.dialog_component).css('display', 'block');
            action_obj._create_component_open_close('youtube', youtube_link);
        });

        $('#open-youtube-frame').on('click',function(){
            self.__display_youtube_streaming_dialog();
        });
    }
    _initialize_local_video_Stream(){
        (function localFileVideoPlayer() {
          'use strict'
          var URL = window.URL || window.webkitURL
          var displayMessage = function (message, isError) {
            var element = document.querySelector('#message')
            element.innerHTML = message
            element.className = isError ? 'error' : 'info'
          }
          var playSelectedFile = function (event) {
            var file = this.files[0]
            var type = file.type
            var videoNode = document.getElementById('local-stream-video-node')
            var canPlay = videoNode.canPlayType(type)
            if (canPlay === '') canPlay = 'no'
            var message = 'Can play type "' + type + '": ' + canPlay
            var isError = canPlay === 'no'
            displayMessage(message, isError)

            if (isError) {
              return
            }

            var fileURL = URL.createObjectURL(file)
            videoNode.src = fileURL;

            videoNode.style.width = '400px';
            videoNode.style.height = '300px';
          }
          var inputNode = document.getElementById('local-stream')
          inputNode.addEventListener('change', playSelectedFile, false);

//          $('#local-stream').on('change', function(){
//            playSelectedFile();
//          });
        })()

    }

//    _delete_file_in_the_backend()
//    _mark_favourite_in_the_backend()

    _build_file_factory_options(){
        let flag = 0;
        let self = this;
        $('.individual-search').on('mouseover', function(){
            if ( flag == 1 ){
                return;
            }
            let curr_this =  $(this);
            let curr_file_name  = curr_this.context.textContent;
            let file_factory_option_icons =  `<div class="file">` +
                `<div class="file-factory-options">` +
                    `<img class="file-factory-option-icons" file-name='${curr_file_name}' onclick=self._build_rename_field_and_call_backend(this); alt="Rename icon" src="https://img.icons8.com/ultraviolet/344/rename.png" lazy="loaded"> ` +
                    `<img class="file-factory-option-icons" file-name='${curr_file_name}' onclick=self._delete_file_in_the_backend(this); alt="Delete Bin icon" src="https://img.icons8.com/carbon-copy/344/delete-forever--v1.png" lazy="loaded"> `+
                     `<img class="file-factory-option-icons" file-name='${curr_file_name}' onclick=self._mark_favourite_in_the_backend('${curr_file_name}'); alt="Star icon" src="https://img.icons8.com/fluent/2x/star.png">` +
                 `</div>`+
            `</div>`;
            $(this).append(file_factory_option_icons);
            flag =1;
        });
        $('.individual-search').on('mouseleave', function(){
            let curr_this =  $(this);
            let file_icons = curr_this.find('.file');
            file_icons.remove();
            flag = 0;
        });

    }

    _header_orientation_events(){
        $('#right-header-id').on('click',function(){

            $('#top-header').removeClass('top-header-top-margin');
            $('#top-header').removeClass('top-header-left-margin');
            $('#top-header').removeClass('top-header-bottom-margin');

            $('#top-header').addClass('top-header-right-margin');

            $('#logo-section').removeClass('logo-section-top-margin');
            $('#logo-section').addClass('logo-section-right-margin');

            $('.open-close').addClass('tab-option-buttons-right-in-margin');
            $('#top-header-tab-options').addClass('top-header-right-margin-tab-options');

            $('#destination-container').css('top',0);
            $('#destination-container').css('left',0);
            $('#destination-container').css('width','calc(100% - 125px)');
        });
        $('#top-header-id').on('click',function(){

            $('#top-header').removeClass('top-header-right-margin');
            $('#top-header').removeClass('top-header-left-margin');
            $('#top-header').removeClass('top-header-bottom-margin');
            $('#top-header').addClass('top-header-top-margin');

            $('#logo-section').removeClass('logo-section-right-margin');
            $('#logo-section').addClass('logo-section-top-margin');

            $('.open-close').removeClass('tab-option-buttons-right-in-margin');
            $('#top-header-tab-options').removeClass('top-header-right-margin-tab-options');

            $('#destination-container').css('top',50);
            $('#destination-container').css('left',0);
            $('#destination-container').css('width','100%');

        });

        $('#left-header-id').on('click',function(){

            $('#top-header').removeClass('top-header-right-margin');
            $('#top-header').removeClass('top-header-top-margin');
            $('#top-header').removeClass('top-header-bottom-margin');
            $('#top-header').addClass('top-header-left-margin');

            $('#logo-section').removeClass('logo-section-top-margin');
            $('#logo-section').addClass('logo-section-right-margin');

            $('.open-close').addClass('tab-option-buttons-right-in-margin');
            $('#top-header-tab-options').addClass('top-header-right-margin-tab-options');

            $('#destination-container').css('top',0);
            $('#destination-container').css('width','calc(100% - 125px)');
            $('#destination-container').css('left','125px');

        });

        $('#bottom-header-id').on('click',function(){

            $('#top-header').removeClass('top-header-right-margin');
            $('#top-header').removeClass('top-header-left-margin');
            $('#top-header').removeClass('top-header-top-margin');
            $('#top-header').addClass('top-header-bottom-margin');

            $('#logo-section').removeClass('logo-section-right-margin');
            $('#logo-section').addClass('logo-section-top-margin');

            $('.open-close').removeClass('tab-option-buttons-right-in-margin');
            $('#top-header-tab-options').removeClass('top-header-right-margin-tab-options');

            $('#destination-container').css('top',0);
            $('#destination-container').css('left',0);
            $('#destination-container').css('width','100%');
        });
    }

    init(label_map){

        this.label_map = label_map;
        let self = this;
        this.action_obj = new DomActions();
        this._create_component_buttons_generation('html_components').then(function(){
            self._create_component_open_close();
        });
        this._header_orientation_events();
        this._create_component_form()

        this._component_container_open_close();
        this._create_new_file_factory_form();

        this._download_video_click_event();
        this._maximize_icon_click_event();

        this._initialize_file_chat_switches_events();
        this._initialize_tool_tips();

        this._tabs_dropdown_click();
        this._open_close_main_section_wrapper();
        this._create_event_listeners_for_dragbar();

        this._move_tabs_for_source_code_section();

        this._initialize_youtube_stream();
        this._initialize_local_video_Stream();

        this._build_tree_and_close_sidenav();
        this._context_menu_for_project_tree();

        this._build_file_factory_options();

    }

}


