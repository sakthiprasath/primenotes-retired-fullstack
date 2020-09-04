import DomActions from './DomActions.js';
import loadComponentsContainer from './ComponentsContainer.js';

export default class DomEvents{
    components_list= [];
    static _get_action_object(){
        return new DomActions()
    }
    static _get_components_container_object(){
        return new loadComponentsContainer()
    }

    _build_tree_and_close_sidenav(){
        $(".dTree").dTree();
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
            $('#pane').css('display','block');
         });

         $('#change-pane-orientation-left').on('click',function(){
            $('#pane').removeClass('pane-orientation-right-class');
            $('#pane').addClass('pane-orientation-left-class');
         });

        $('#change-pane-orientation-right').on('click',function(){
            $('#pane').removeClass('pane-orientation-left-class');
            $('#pane').addClass('pane-orientation-right-class');
         });

    }

    _create_component_open_close(){
       /*component create dialog open close*/
        var self = this;//this event obj
        $('.create-component').on('click',function(){
            let action_obj = DomEvents._get_action_object(self, this);
            action_obj._create_component_open_close(self,this);
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
            DomEvents._get_action_object().maximize_icon_click_action(self);
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
        $('.tab').on('click',function(){

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
            let new_component_name = $('#create-component-text-box').val()
            if(new_component_name == ''){
                return;
            }
            let component_list = self._get_components_list();
            if(component_list.indexOf(new_component_name.toLowerCase()) < 0){
                let action_obj = DomEvents._get_action_object();
                action_obj._create_file_in_backend('html_components', new_component_name);

                /*create a new component button, building the same in current DOM and also in the backend;*/

                //building the DOM Button
                let new_component_button = `<button class='create-component create-component button tab-options-button' title='`+
                                        new_component_name + `' class="button tab-options-button">` +
			                            new_component_name + `</button>`;
                $('#component-tabs').append($(new_component_button));

                //building the component in DOM
                let ele = action_obj._build_new_component(new_component_name);
                $('#destination-container').append($(ele));
                $('#'+new_component_name).dialog();
                self._create_component_open_close();
            }
            else{
                 alert('Component Exists with the same name : '+ new_component_name);
            }
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

    _open_close_main_section_wrapper(){
        let self = this;
        self.active_bg_color = '#3d3f57';
        self.inactive_bg_color = 'none';
        function _hide_all_main_section_wrapper_class(){
            $('.main-section-wrapper-class').css('display','none');
            let css_map = {'background':self.inactive_bg_color,
                            'color': '#c2bac5'};
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

    _context_menu_for_project_tree(){
            $('.file-click').on("contextmenu", function(event) {
              event.preventDefault();
              $(".context")
                .show()
                .css({
                  top: event.pageY - 100,
                  left: event.pageX
                });
            });
            $(document).click(function() {
//                $(".context").css('display', 'none');
            });
    }

    init(label_map){

        this.label_map = label_map;
        let self = this;
        this.action_obj = new DomActions();
        this._create_component_buttons_generation('html_components').then(function(){
            self._create_component_open_close();
        });
        this._create_component_form()
        this._component_container_open_close();
        this._create_new_file_factory_form();
        this._download_video_click_event();
        this._maximize_icon_click_event();
        this._initialize_file_chat_switches_events();
        this._initialize_tool_tips();

        this._tabs_dropdown_click();
        this._open_close_main_section_wrapper();
        this._build_tree_and_close_sidenav();
        this._create_event_listeners_for_dragbar();

        this._move_tabs_for_source_code_section();
        this._context_menu_for_project_tree();
    }

}


