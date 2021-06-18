import DomEvents from './DomEvents.js';

class applyDragAndDrop{
	/*Make resizable div by Hung Nguyen*/

	static Draggable(srcElement,dragStart, dragDrop) {
		srcElement.classList.add('draggable');
		var self = this;
		var move = function(event) {

			event.stopPropagation();
			event.preventDefault();
			var originalX = parseInt($('#pane').css('left'));
			var originalY = parseInt($('#pane').css('top'));
			var mouseDownX = event.clientX;
			var mouseDownY = event.clientY;
			function dragEgg(event) {
				$('#pane').css('left',originalX + event.clientX- mouseDownX);
				$('#pane').css('top',originalY + event.clientY- mouseDownY )
			}
			function dropEgg(event) {
				document.removeEventListener('mousemove', dragEgg, true);
				document.removeEventListener('mouseup', dropEgg, true);
				event.stopPropagation();
			}
			document.addEventListener('mouseup', dropEgg, true);
			document.addEventListener('mousemove', dragEgg, true);
		};
		srcElement.addEventListener('mousedown', move, false);
	};
};




class ColorCoding{
		colorcoding(container,mode) {
			  var ua = navigator.userAgent;
			  //Opera Mini refreshes the page when trying to edit the textarea.
			  if (ua && ua.toUpperCase().indexOf("OPERA MINI") > -1) { return false; }
			  var codeEditorObj= CodeMirror.fromTextArea(document.getElementById(container), {
			    mode: "text/"+mode,
			    htmlMode: true,
			    lineWrapping: true,
			    smartIndent: false,
			    addModeClass: true,
			    lineNumbers: true,
			  });
			  switch(mode){
			  	case 'html':{
			  		if(container ==='header-scripts'){
			  			ColorCoding.prototype.htmlHeaderScriptsObj=codeEditorObj;
			  		}else{
			  			ColorCoding.prototype.htmlEditorObj=codeEditorObj;
			  		}
			  		break;
			  	}
			  	case 'css':{
			  		ColorCoding.prototype.cssEditorObj=codeEditorObj;
			  		break;
			  	}
			  	case 'javascript':{
			  		ColorCoding.prototype.jsEditorObj=codeEditorObj;
			  		break;
			  	}
			  }
			}
	}
class CodeEditor{
		constructor(){
			$('.sakthi').css('visibility','hidden');
			$('.ui-layout-resizer').css('display','none');
			}
		createEventListeners(){
					$('.sakthi').css('visibility','visible');
					$('.ui-layout-resizer').css('display','block');
					$('#main').css('display','none');
						var ColorCodingObj=new ColorCoding();
						ColorCodingObj.colorcoding("html-file","html");
						ColorCodingObj.colorcoding("js-file","javascript");
						ColorCodingObj.colorcoding("css-file","css");
						ColorCodingObj.colorcoding("header-scripts","html");

						var buttonObj=new ButtonsEventsAndActions();
						buttonObj.events();
					$('.ui-layout-pane').css('background-color','white');
					$('.CodeMirror ').css('background-color','white');
			}
	}

export default class loadComponentsContainer {
    file_factory_path = "";
	makeResizableDiv(div) {
		  const element = document.querySelector(div);
		  const resizers = document.querySelectorAll(div + ' .resizer')
		  const minimum_width = 570;
		  const minimum_height = 275;

		  let original_width = 0;
		  let original_height = 0;
		  let original_x = 0;
		  let original_y = 0;
		  let original_mouse_x = 0;
		  let original_mouse_y = 0;
		  for (let i = 0;i < resizers.length; i++) {
		    const currentResizer = resizers[i];
		    currentResizer.addEventListener('mousedown', function(e) {
		      e.preventDefault()
		      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
		      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
		      original_x = element.getBoundingClientRect().left;
		      original_y = element.getBoundingClientRect().top;
		      original_mouse_x = e.pageX;
		      original_mouse_y = e.pageY;
		      window.addEventListener('mousemove', resize)
		      window.addEventListener('mouseup', stopResize)
		    })

		    function resize(e) {
		      $('#right-side-components').attr('class','');
		      $('#right-side-components').addClass('right-side-components-full-screen');
		      element.classList = '';
		      element.classList = 'pane-reduce-transition';
		      if (currentResizer.classList.contains('bottom-right')) {
		        const width = original_width + (e.pageX - original_mouse_x);
		        const height = original_height + (e.pageY - original_mouse_y)
		        if (width > minimum_width) {
		          element.style.width = width + 'px'
		        }
		        if (height > minimum_height) {
		          element.style.height = height + 'px'
		        }
		      }
		      else if (currentResizer.classList.contains('bottom-left')) {
		        const height = original_height + (e.pageY - original_mouse_y)
		        const width = original_width - (e.pageX - original_mouse_x)
		        if (height > minimum_height) {
		          element.style.height = height + 'px'
		        }
		        if (width > minimum_width) {
		          element.style.width = width + 'px'
		          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
		        }
		      }
		      else if (currentResizer.classList.contains('top-right')) {
		        const width = original_width + (e.pageX - original_mouse_x)
		        const height = original_height - (e.pageY - original_mouse_y)
		        if (width > minimum_width) {
		          element.style.width = width + 'px'
		        }
		        if (height > minimum_height) {
		          element.style.height = height + 'px'
		          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
		        }
		      }
		      else {
		        const width = original_width - (e.pageX - original_mouse_x)
		        const height = original_height - (e.pageY - original_mouse_y)
		        if (width > minimum_width) {
		          element.style.width = width + 'px'
		          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
		        }
		        if (height > minimum_height) {
		          element.style.height = height + 'px'
		          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
		        }
		      }
		    }

		    function stopResize() {
		      window.removeEventListener('mousemove', resize)
		    }
		  }
		}

    buildDragAndDropEleSet(){
		applyDragAndDrop.Draggable(document.getElementById('component-factory-title'));
	}

    _maximize_icon_click_event(){
            let self = this;
            self.prev_width = 0;
            self.prev_height = 0;
            $('.maximize-icon').on('click',function(){
                $('#make-resize').show();
                $('.resize-icon').hide();
                self.tsp.DomActions.maximize_icon_click_action();
                $('#pane').removeClass('pane-orientation-left-class');
                $('#pane').removeClass('pane-orientation-right-class');
            });
        }
    _initialize_file_chat_switches_events(){//component container left-corner
          let self = this;
            $('#chat-middle-section').css('display','none');
            $('#single-chat').css('display','none');
            $('#group-chat').css('display','none');
            $("#right-side-components").css('left','250px');

            $('.file-switch, #sidenav-button-id1, .file-name').on('click',function(){
                $('.quick-notes-top-section').show();
                self.active_switch = "file-switch";
                let classList =  $("#right-side-components").attr('class');
                if(classList.indexOf('right-side-components-full-screen') >=0 ){
                       $("#right-side-components").removeClass('right-side-components-full-screen');
                    $("#right-side-components").addClass('right-side-components-split-screen');
                    $('.file-factory-split-bar').css('left','350px');
                    $('#left-and-middle-section').css('width','350px');

                }
                else{
                     $("#right-side-components").removeClass('right-side-components-split-screen');
                    $("#right-side-components").addClass('right-side-components-full-screen');
                    $('.file-factory-split-bar').css('left','0px');
                }
                if(this.id === "sidenav-button-id1"){
                    return;
                }
//             $('#components-search-container').css({'top':'0',
//                                                    'height':'100%'
//                                                  });
             $('#component-factory-title').hide()
             $('#right-side-section').hide();
             let component_factory_icon_elems = $('.component-factory-left-icons');
                let len = component_factory_icon_elems.length;
                for(let i=0;i < len; i++){
                    let class_list = $(component_factory_icon_elems[i]).attr('class').split(' ');
                }

//                $(this).addClass('active');

                $('#middle-section').show();
                let file_editor = $('#quick-notes-in-file-factory').clone();
                $('#quick-notes-in-file-factory').remove();
                $('#video-stream-in-file-factory').hide();

                let file_editor_obj = $(file_editor).removeClass('text-editor-in-middle-section').addClass('text-editor-in-right-side-components');
                $('#right-side-components-container').append(file_editor_obj);
                $("#right-side-components").css('left','350px');
                $('#file-factory-split-bar').css('left','348px');
//                $('.file-name').off('click');
                self.fillRightSideComponents(self, $($('.individual-search')[0]).attr('id'));
                self._build_file_factory_options();
                self._open_settings();
             });

            $('.video-stream-switch').on('click',function(){
                $('.quick-notes-top-section').hide();
//                $('#components-search-container').css({'top':'35px',
//                                                    'height':' calc( 100% - 36px)'
//                                                  });
                $('#component-factory-title').show();

                $('#pane').css({'display':'block'});
                $('#right-side-section').show();
                let component_factory_icon_elems = $('.component-factory-left-icons');
                let len = component_factory_icon_elems.length;
                for(let i=0;i < len; i++){
                    let class_list = $(component_factory_icon_elems[i]).attr('class').split(' ');
                    if( class_list.indexOf('active') >=0 ){
                        $(component_factory_icon_elems[i]).removeClass('active');
                        break;
                    }
                }

                self.active_switch = "video-stream-switch";
                let classList =  $("#right-side-components").attr('class');
                if(classList.indexOf('right-side-components-split-screen') >=0 ){
                    $("#right-side-components").removeClass('right-side-components-split-screen');
                    $("#right-side-components").addClass('right-side-components-full-screen');
                    $('.file-factory-split-bar').css('left','0px');
                }
                else{
                    $("#right-side-components").removeClass('right-side-components-full-screen');
                    $("#right-side-components").addClass('right-side-components-split-screen');
                    $('.file-factory-split-bar').css('left','350px');
                    $('#left-and-middle-section').css('width','350px');
                }

                let file_editor = $('#quick-notes-in-file-factory').clone();
                $('#quick-notes-in-file-factory').remove();
                $('#middle-section').show();
                let file_editor_obj = $(file_editor).removeClass('text-editor-in-right-side-components').addClass('text-editor-in-middle-section').hide();
                $('#left-and-middle-section').append($(file_editor_obj));
                $('#video-stream-in-file-factory').css('display','block');
//                $('.file-name').off('click');

//                self.fillRightSideComponents(self, $('.file-name').text().trim() + '.txt');
                self.initialisingEventHandlers(self);
                self._build_file_factory_options();
                self._open_settings();

            });
    }

    searchResults(self, labelMap, searchContent){
        var searchResultTop=10;
        var  html='';

        let def=$.Deferred();
        for(let key in labelMap){
            if( searchContent === undefined  || labelMap[key].content.includes(searchContent.toLowerCase().trim()) || labelMap[key].name.includes(searchContent.toLowerCase().trim())) {
                html +=`<div class='individual-search' id='${key}'>`;
                html +=`<span class='search-result-item' >${labelMap[key].name}</span></div>`;
            }
        }
        def.resolve(html);
        return def.promise();
    };

    _get_file_factory_list(){
        let file_type = 'file_factory';
        let temp_map = {};
        let self = this;
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url: self.tsp.PrimenotesCache.data.url_prefix + "/api/individual-component-fetch/get-all-file-factory-contents",
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        let files = {};
                        let ret_json = {};
                        ret_json = response;
//                        self.file_factory_path = ret_json['file_path'];

//                        for(let i in files_map){
//                            let file = files[i];
//                            temp_map [file] = [file];
//                        }

                        for(let i in ret_json){
//                            console.log(ret_json[i].name);
                            temp_map[ret_json[i].uuid_file_name] = {
                                'name' : ret_json[i].name,
                                'content' : ret_json[i].content,
                                'date_created': ret_json[i].date_created,
                                'last_updated': ret_json[i].last_updated,
                                'starred': ret_json[i].starred
                            } ;
                        }
                        return defObj.resolve(temp_map);
                    }
                });
            return defObj.promise();
    }
    initialize_save_action_for_save_button(self){
//        let iframe_obj = document.getElementById('quick-file-editor');

        $('#quick-file-editor').on('blur',function(){
                var file_key = $('.file-name').attr('file-key')
                let file_data = $('#quick-file-editor').val();//document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML;
                var savable_data = {
                            'file_key' : file_key,
                            'name' : self.label_map[file_key].name,
                            'content' : file_data
                }

                var defObj=$.Deferred();
                    var promise =
                        $.ajax
                        ({
                            url: self.tsp.PrimenotesCache.data.url_prefix + "/api/individual-component-fetch/save-file-factory",
                            data: JSON.stringify(savable_data),
                            type : "POST",
                            contentType: 'application/json;charset=UTF-8',
                            success : function(response){
                                self.label_map[file_key].content = file_data;
                                self.tsp.NotificationBar.launch_notification('file saved');
                                return defObj.resolve(response);
                            }
                        });
                    return defObj.promise();
        });
    }
    callSearchResults(searchContent){
        let self = this;
        $('#file-middle-section').empty();
        var defSecond=$.Deferred();
        $.Deferred().resolve().then(function(){
                self.searchResults(self, self.label_map, searchContent).then(function(backHtml){
                $('#file-middle-section').append(backHtml);
                self.initialisingEventHandlers(self);
                defSecond.resolve();
                });
                return defSecond.promise();
        });
    }

    initialisingEventHandlers(self){

        $('#search-box').off('keyup');
        $('#search-box').on('keyup',function(){
            self.callSearchResults($(this).val());
        });

        /*after buliding the search results in middle section
         * create event listeners for search results*/
//        $('.file-switch').addClass('active');
        $('.individual-search').off('click');
        $('.individual-search').on('click',function(){
            $('#quick-notes-in-file-factory').show();
            $('.individual-search').css({'background':'none'})
            $(this).css({'background':'rgb(224 238 243)'});
            $('#right-side-components').css('display','block');
            $('#right-side-components-container').css('display','block');
//            $('.file-name').text(this.textContent.trim())
            let file_key = $(this).attr('id');


            let component_factory_icon = $('.active').prop('id');
            if(self.active_switch == "video-stream-switch"){
                 $('#middle-section').hide();
                 $('#quick-notes-in-file-factory').show();

                 let file_editor = $('#quick-notes-in-file-factory').clone();
                 $('#quick-notes-in-file-factory').remove();

                 let file_editor_obj = $(file_editor).removeClass('text-editor-in-right-side-components').addClass('text-editor-in-middle-section');
                 $('#left-and-middle-section').append(file_editor_obj);


                 let screenWidth = screen.width;
                 let pane_width = parseInt($('#pane').css('width'));
                 let pane_left =  parseInt($('#pane').css('left'));
                 let pane_right = parseInt($('#pane').css('right'));
                 $('#right-side-components').removeClass('right-side-components-split-screen');
                 $('#left-and-middle-section').css('width',pane_width/2);
                 $('.file-factory-split-bar').css('left' , (pane_width/2));
                 $('#right-side-components').css('left' , (pane_width/2));
                 $('#right-side-components').css('width' , (pane_width/2) + 45);

            }
            else if(self.active_switch == "file-switch"){
                $('#video-stream-in-file-factory').hide();
                $('#quick-notes-in-file-factory').show();
                $('#middle-section').show();

            }


         self.fillRightSideComponents(self, file_key);


        });

//        $('#close-component-results-container').off('click');
//        $('#close-component-results-container').on('click',function(){
//            $('#pane').css('display','none');
//            $('#close-editor-button').css('display','block');
//            $($('#right-side-components').children()[0]).attr('src','');
//        });

        /*ckeditor part starts */
//    CKEDITOR.replace( 'editor1' );
//    CKEDITOR.config.height = '95%';
//    CKEDITOR.on( 'instanceReady', function( evt )
//      {
//        var editor = evt.editor;
//
//       editor.on('change', function (e) {
//        var contentSpace = editor.ui.space('contents');
//        var ckeditorFrameCollection = contentSpace.$.getElementsByTagName('iframe');
//        var ckeditorFrame = ckeditorFrameCollection[0];
//        var innerDoc = ckeditorFrame.contentDocument;
//        var innerDocTextAreaHeight = $(innerDoc.body).height()*3;
//        console.log(innerDocTextAreaHeight);
//        });
//     });


};

    fillRightSideComponents(self, file_key){
        if(file_key === undefined || file_key === '')
            return;
            //console.log(currId);
            $('.file-name').text(self.label_map[file_key].name);
            $('.file-name').attr('file-key', file_key)
//            document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML = '';
            $('#quick-file-editor').val('');
            var html='';
            var componentClassName='';
                    $.Deferred().resolve().then(function(){
                        $.when(self.get_file_from_server(file_key)).done(function(res){
                            self._appendHtmlAndEventListner(file_key,res);
                        });
                    });
        self.initialize_save_action_for_save_button(self);
        self.starr_in_UI(file_key);
        self.tsp.DetailsPanel.launch_quick_file_details_data(file_key);
    }

    _appendHtmlAndEventListner(mainClass, general_text_data){
//        document.getElementById('quick-file-editor').contentWindow.document.designMode = "On";
//        document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML = general_text_data;
 $('#quick-file-editor').val(general_text_data);
        //        function transform(option, argument) {
        //          editor.document.execCommand(option, false, argument);
        //        }

    };





    get_file_from_server(file_key){
//        file_name = this.file_factory_path + '/' + file_name;
        var defObj=$.Deferred();
//            var promise =
//                $.ajax
//                ({
//                    url:'http://localhost:5000/api/individual-component-fetch/general_files/file_factory?file_path='+JSON.stringify(file_name),
//                    type : "GET",
//                    contentType:'application/x-www-form-urlencoded',
//                    success : function(response){
//                        return defObj.resolve(response);
//                    }
//                });
            return defObj.resolve(this.label_map[file_key].content);
    }

     _component_container_open_close(){
        /*component container open-close */

//         $('#change-pane-orientation-left').on('click',function(){
//            $('#pane').removeAttr('class');
//            $('#pane').addClass('pane-orientation-left-class');
//            $('#right-side-components').addClass('right-side-components-full-screen');
//            $('.file-factory-split-bar').css('left','0px');
//            $('#left-and-middle-section').css('width','0px');

//         });

//        $('#change-pane-orientation-right').on('click',function(){
//            $('#pane').removeAttr('class');
//            $('#pane').addClass('pane-orientation-right-class');
//            $('#right-side-components').addClass('right-side-components-full-screen');
//            $('.file-factory-split-bar').css('left','0px');
//            $('#left-and-middle-section').css('width','0px');
//         });
//         $('#component-factory-title').on('dblclick', function(){
//            $('#pane').removeAttr('class');
//            self.tsp.DomActions.maximize_icon_click_action();
//            $('#right-side-components').addClass('right-side-components--screen');
//            $('.file-factory-split-bar').css('left','250px');
//            $('#left-and-middle-section').css('width','255px');
//         });

    }
     action_functions(){
        let self = this;
        this.action_function_map = {};
        this.action_function_map = {
            create_new_file  : function(){
                self.tsp.Dialog.launch_dialog( 'create-new-quick-file-form')
                $('#create-file-text-box').focus();
            },
            create_new_file_submit_btn : function(){
                let file_name = $('#create-file-text-box').val();
                if (file_name == '' || self.label_map[file_name + '.txt'] != undefined){
                    alert('File exists with the same name ');
                    return;
                }
                let temp_map = {
                    'folder_id' : '',
                    'folder_path' : '../frontend_files/web-app/all_general_files/file_factory',
                    'file_name' : file_name,
                    'file_type' : 'file_factory',
                    'create_type': 'File'
                }
                self.tsp.DomActions._create_file_in_backend_duplicate(temp_map).then(function(ret_json){

//                    console.log(ret_json);
//                    let file_name_id =  //file_name.replaceAll('  ',' ').replaceAll(' ','-') ;
                    let html=`<div class='individual-search' id="${ret_json.uuid_file_name}" > <span class='search-result-item' >${ret_json.name}</span></div>`;
                    $('#file-middle-section').prepend($(html));
                    self.initialisingEventHandlers(self);
                    $('.file-name').text(ret_json.name);
                    $('.file-name').attr('file-key', ret_json.uuid_file_name);
                    self.label_map[ret_json.uuid_file_name] = {
                                                                    'name' : ret_json.name,
                                                                    'content' : ret_json.content,
                                                                    'date_created': ret_json.date_created,
                                                                    'last_updated': ret_json.last_updated,
                                                                    'starred': ret_json.starred
                                                              };
//                    document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML = '';
                    $('#quick-file-editor').val();
                    self.tsp.NotificationBar.launch_notification('File Creation Success');
                    $('#modal-id').hide();
                });
            }
        }
    }
    _create_new_file_factory_form(){
            /*create new file */
            let self = this;
            $('#create-new-file').on('click', function(){
//                $('#create-new-file-form').css('display','block');
                self.action_function_map.create_new_file();
            });
//            $('#create-new-file-submit-btn').on('click',function(){
//                self.action_function_map.create_new_file_submit_btn();
//            });

            $('#close-create-file-form').on('click',function(){
                $('#create-new-file-form').css('display', 'none');
            });
    }

    _create_event_listeners_for_file_factory_dragbar(){
        const bar = $('.file-factory-split-bar');
        const left_part = $('#left-and-middle-section');
        const right_part = $('#right-side-components');
        let self = this;
        self.file_factory_mouse_is_down = false;

        bar.on('mousedown', function(e){
          self.file_factory_mouse_is_down = true;
           $('#right-side-components').removeClass('right-side-components-split-screen');//.css({'left':'250px', 'width':'1090px'});
            $('#quick-notes-backdrop').show();
        });

        bar.on('mouseup', function(e){
            $('#quick-notes-backdrop').hide();
        });
        $(document).on('mousemove', (e) => {
          if (!self.file_factory_mouse_is_down) return;
          let screenWidth = screen.width;
          let pane_width = parseInt($('#pane').css('width'));
          let screenLeft =  parseInt($('#pane').css('left'));
          let screenRight = parseInt($('#pane').css('right'));

          let q1 = pane_width - parseInt(`${e.clientX}px`) + screenLeft;//130 is the
          let q2 =  parseInt(`${e.clientX}px`);
          if(q2 < screenLeft || q2 > screenLeft + pane_width)
            return;
          left_part.css('width',q2 - screenLeft);
          right_part.css('width',q1 + 40);
          right_part.css('left',q2 - screenLeft + 3);
          bar.css('left',q2-screenLeft);
        });

        document.addEventListener('mouseup', () => {
          self.file_factory_mouse_is_down = false;

        });
    }

    __display_youtube_streaming_dialog(){
//        $(this.dialog_component).css('display', 'block');
//        $(this.dialog_component).css({'width': '40%','height': '55%','top':'32%','left':'40%'});
        $('#pane').show();
    }

    _initialize_youtube_stream(){
        let self = this;
        $('#stream-youtube-video').on('click',function(){
            let youtube_link = $('#youtube-video-link').val();
             self.__display_youtube_streaming_dialog();
//             $(self.dialog_component).css('display', 'block');
            self.tsp.DomActions._create_component_open_close('youtube', youtube_link);
        });

        $('#open-youtube-frame').on('click',function(){
            self.__display_youtube_streaming_dialog();
        });
    }

    __internal_rename(self, rename_field, file_key){
            let new_file_name = $(rename_field).val();
            self.label_map[file_key].name = new_file_name;
            let send_data = {
                'file_key': file_key,
                'name' : new_file_name
            }
            self.tsp.DomActions._rename_file_factory_files('file_factory', send_data).then(function(){
                let new_span = `<span class="search-result-item">${new_file_name}</span>`
                let parent_ele = $(rename_field).parent();
                parent_ele.attr('id', file_key);
                parent_ele.empty();
                parent_ele.append($(new_span));
                $('.file-name').text(new_file_name)
                self.tsp.NotificationBar.launch_notification('File Renamed');
            });
        }
    _onfocusout_rename_field(file_key){
        let self = this;
        $('#quick-file-rename-field').on('blur',function(){
            self.__internal_rename(self, this, file_key);
        });
    }
    _build_rename_field_and_call_backend(){
        let self = this;
        let file_key = $('.file-name').attr('file-key');
        let file_name = self.label_map[file_key].name;
        let input =  $(`<input type='text' id='quick-file-rename-field' value='${file_name}' />`);
        let curr_file_ele = $('#'+ file_key)
        curr_file_ele.empty();
        curr_file_ele.append(input);
        let input_text = input.val();
        input.val('');
        input.val(input_text).focus();
        $('#quick-file-rename-field').keypress(function (e) {if (e.which == 13)    $(this).blur();});

//        input.focus();
        self._onfocusout_rename_field(file_key);
    }
    _delete_file_in_the_backend(){
        let self = this;
        let file_key = $('.file-name').attr('file-key');

        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
          self.tsp.DomActions._delete_file(file_key).then(function(){
            let curr_file_ele = $('#' + file_key);
             $(curr_file_ele).remove();
            delete  self.label_map[file_key];
            self.fillRightSideComponents(self, Object.keys(self.label_map)[0]);

            self.tsp.NotificationBar.launch_notification('File Deleted');
          }).fail(function(){
            alert('cant delete the file');
          });

        }
    }
    starr_in_UI(file_key){
        if(self.label_map[file_key].starred == "true"){
                    $('.quick-file-fav').css('background-color', 'red');
                    self.tsp.NotificationBar.launch_notification('File Starred ');
                }
                else{
                    $('.quick-file-fav').css('background-color', 'white');
                    self.tsp.NotificationBar.launch_notification('File UnStarred ');
                }
    }
    _mark_favourite_in_the_backend(){
            let self = this;
            let file_key = $('.file-name').attr('file-key');
            self.tsp.DomActions._make_quick_file_favourite(file_key).then(function(res){
                self.label_map[file_key] = res;
                self.starr_in_UI(file_key);
            });
    }
    _build_file_factory_options(){
        let self = this;
//        $('.quick-file-rename').off('click');
        $('.quick-file-rename').on('click',function(){
            self._build_rename_field_and_call_backend();
        });
        $('.quick-file-delete').off('click');
        $('.quick-file-delete').on('click',function(){
            self._delete_file_in_the_backend();

        });
        $('.quick-file-fav').off('click');
        $('.quick-file-fav').on('click',function(){
            self._mark_favourite_in_the_backend();
        });

        $('.quick-file-detail').off('click')
        $('.quick-file-detail').on('click', function(){
            let file_key = $('.file-name').attr('file-key');
            self.tsp.DetailsPanel.launch_quick_file_details_data(file_key);
            self.tsp.DetailsPanel.open_details();
        })


//        $('.individual-search').off('mouseleave');
//        $('.individual-search').on('mouseleave', function(){
//            let curr_this =  $(this);
//            let file_icons = curr_this.find('.file');
//            file_icons.remove();
//            flag = 0;
//        });

    }
    _open_settings(){
        let self = this;
        $('#quick-notes-setting').off('click');
        $('#quick-notes-setting').on('click', function(){
            if(self.open_setting_flag === 0){
                $('.options').css({'display':'flex'});
                $('.file-factory-options').css('visibility','visible');
//                $('#quick-file-editor').css('left','55px');
                self.open_setting_flag = 1;
            }
            else{
                $('.options').css({'display':'none'});
                $('.file-factory-options').css('visibility','hidden');
//                $('#quick-file-editor').css('left','15px');
                self.open_setting_flag = 0;
            }
        });

    }
    _make_resize(){
        $('#make-resize').on('click',function(){
            $('.resize-icon').show();
            $(this).hide();
        });
    }


    init(tsp, unused_return_values){
        tsp.loadComponentsContainer = this;
        this.tsp = tsp;
        let self = this;
        self.open_setting_flag = 0;
        this.file_factory_path = '../frontend_files/web-app/all_general_files/file_factory';
        this.active_switch = 'video-stream-switch';
        this.action_functions();
        this._maximize_icon_click_event();
//        this.buildDragAndDropEleSet();
//        this.makeResizableDiv('#pane');
        this._component_container_open_close();
        this._create_new_file_factory_form();
        this._initialize_file_chat_switches_events();
        this._create_event_listeners_for_file_factory_dragbar();
        this._initialize_youtube_stream();
        this._make_resize();
        this._open_settings();
        this._build_file_factory_options();
        var screenWidth=parseInt(screen.width);
        var screenHeight=parseInt(screen.height);

        /*first time event listener is added so flag is generated*/
        let init_deferred = $.Deferred();
        let  defStart=$.Deferred();
        /*map for storing labels of the corresponding id*/

    //	self.labelMap={
    //	        /*file_name : ['display_name']*/
    //			'drowssap':['drowssap','secrets'],
    //			'python':['python'],
    //			'ML':['ML','ai','deep learning'],
    //			'flask_swagger':['flask','swagger','rest','api'],
    //			'notes':['notes'],
    //			'git':['git commands','bitbucket commands'],
    //			'encryptor_algorithm':['algorithm'],
    //			'docker':['docker'],
    //			'postgres':['postgres sql'],
    //			'WOE_project':['azima integration(woe)'],
    //			'personal':['personal','plan'],
    //			'partner_in_crime':['partner_in_crime']
    //	};


        var initialize_Search_Results_Close_Button_Binder=function(){
            $('#search-results-close-button').on('click',function(){
//                $('#middle-section').css('width','0px');
                $('.search-container').css('display','none');
                $('#chat-file-icon-section').css('display','none');

                $('#right-side-components').attr('class','right-side-modify');

                var tempEle=$(this).clone();

                $(this).remove();
                $('.left-corner-sub-div').append($(tempEle));
                $('#compo-search-navigation').css({
                    'transform':'rotate(180deg)',
                    'width': '55px',
                    'margin-left': '30px',
                    'height': '15px'
                });

                initialize_Left_Corner_Close_Button_Binder();
            });
        };
        initialize_Search_Results_Close_Button_Binder();



        var initialize_Left_Corner_Close_Button_Binder=function(){
            $('#search-results-close-button').on('click',function(){
                var tempEle=$(this).clone();

                $(this).remove();

                $('#middle-section').append($(tempEle));
                $('#compo-search-navigation').css({
                'transform':'rotate(0deg)',
                 'width': '55px',
                 'margin-left': '30px',
                 'height': '90%'
                });

                $('#middle-section').css('width','210px');
                $('.search-container').css('display','block');
                $('#chat-file-icon-section').css('display','block');
                $('#right-side-components').removeClass('right-side-modify');

                initialize_Search_Results_Close_Button_Binder();
            });
        };

        self.initialize_save_action_for_save_button(self);

        self._get_file_factory_list().then(function(label_map){
            self.label_map = label_map;
            self.searchResults(self, label_map).then(function(backHtml){

                $('#file-middle-section').append(backHtml);
                self.initialisingEventHandlers(self);
                defStart.resolve();
                return init_deferred.resolve(tsp, self.label_map);

            });
//            return defStart.promise();
        });

        return init_deferred.promise();
};

}


