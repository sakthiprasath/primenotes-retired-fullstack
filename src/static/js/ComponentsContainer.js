import DomEvents from './DomEvents.js';


export default class loadComponentsContainer {
    file_factory_path = "";

    split_and_full_screen_UI(){
        let self = this;
         let classList = $("#right-side-components").attr('class');

                if (classList.indexOf('right-side-components-full-screen') >= 0) {
                    $("#right-side-components").removeClass('right-side-components-full-screen');
                    $("#right-side-components").addClass('right-side-components-split-screen');
                    $('.file-factory-split-bar').css('left', '350px');
                    $('#left-and-middle-section').css('width', '350px');
                    $('#left-and-middle-section').show();
                }
                else {
                    $("#right-side-components").removeClass('right-side-components-split-screen');
                    $("#right-side-components").addClass('right-side-components-full-screen');
                    $('.file-factory-split-bar').css('left', '20px');
                    $('#left-and-middle-section').hide();
                }
    }

    _initialize_file_chat_switches_events() { //component container left-corner
        let self = this;
        $('#chat-middle-section').css('display', 'none');
        $('#single-chat').css('display', 'none');
        $('#group-chat').css('display', 'none');
        $("#right-side-components").css('left', '250px');

        $('.file-switch, #sidenav-button-id1, .file-name').on('click', function() {

            if (self.tsp.GlobalConstants.current_window === 3) {
                if(this.id == "sidenav-button-id1")
                    self.split_and_full_screen_UI();
                return;
            }
            $('.quick-notes-top-section').show();
            self.active_switch = "file-switch";


            //             $('#components-search-container').css({'top':'0',
            //                                                    'height':'100%'
            //                                                  });
            $('#component-factory-title').hide();
            $('#right-side-section').hide();
            let component_factory_icon_elems = $('.component-factory-left-icons');
            let len = component_factory_icon_elems.length;
            for (let i = 0; i < len; i++) {
                let class_list = $(component_factory_icon_elems[i]).attr('class').split(' ');
            }

            $('#middle-section').show();
            let file_editor = $('#quick-notes-in-file-factory').clone();
            $('#quick-notes-in-file-factory').remove();
            $('#video-stream-in-file-factory').hide();

            let file_editor_obj = $(file_editor).removeClass('text-editor-in-middle-section').addClass('text-editor-in-right-side-components');
            $('#right-side-components-container').append(file_editor_obj);
            $("#right-side-components").css('left', '350px');
            $('#file-factory-split-bar').css('left', '348px');
            self._build_file_factory_options();
            self._open_settings();








            if (self.tsp.GlobalConstants.previous_window != 1){
                self.tsp.GlobalConstants.previous_window = 1;
            }else{
                self.split_and_full_screen_UI();
            }
        });





        $('.video-stream-switch').on('click', function() {

            if (self.tsp.GlobalConstants.previous_window != 3){
                self.tsp.GlobalConstants.previous_window = 3;
            }else{
                self.split_and_full_screen_UI();
            }
            $('.quick-notes-top-section').hide();
            //                $('#components-search-container').css({'top':'35px',
            //                                                    'height':' calc( 100% - 36px)'
            //                                                  });
            $('#component-factory-title').show();

            $('#pane').css({ 'display': 'block' });
            $('#right-side-section').show();
            let component_factory_icon_elems = $('.component-factory-left-icons');
            let len = component_factory_icon_elems.length;
            for (let i = 0; i < len; i++) {
                let class_list = $(component_factory_icon_elems[i]).attr('class').split(' ');
                if (class_list.indexOf('active') >= 0) {
                    $(component_factory_icon_elems[i]).removeClass('active');
                    break;
                }
            }

            self.active_switch = "video-stream-switch";

            let file_editor = $('#quick-notes-in-file-factory').clone();
            $('#quick-notes-in-file-factory').remove();
            $('#middle-section').show();
            let file_editor_obj = $(file_editor).removeClass('text-editor-in-right-side-components').addClass('text-editor-in-middle-section').hide();
            $('#left-and-middle-section').append($(file_editor_obj));
            $('#video-stream-in-file-factory').css('display', 'block');
            //                $('.file-name').off('click');

            //                self.fillRightSideComponents(self, $('.file-name').text().trim() + '.txt');
            self.events_map['individual-search']();
            self._build_file_factory_options();
            self._open_settings();




        });
    }

    searchResults(self, labelMap, searchContent) {
        var searchResultTop = 10;
        var html = '';

        let def = $.Deferred();
        for (let key in labelMap) {
            if (searchContent === undefined || labelMap[key].content.includes(searchContent.toLowerCase().trim()) || labelMap[key].name.includes(searchContent.toLowerCase().trim())) {
                //                html +=`<div class='individual-search' id='${key}'>`;
                //                html +=`<span class='search-result-item' >${labelMap[key].name}</span></div>`;
                self.update_starred_files_with_icon(key);
            }
        }
        def.resolve(html);
        return def.promise();
    };

    _get_file_factory_list() {
        let file_type = 'file_factory';
        let temp_map = {};
        let self = this;
        var defObj = $.Deferred();
        var promise =
            $.ajax({
                url: self.tsp.PrimenotesCache.data.url_prefix + "/api/individual-component-fetch/get-all-file-factory-contents",
                type: "GET",
                contentType: 'application/x-www-form-urlencoded',
                success: function(response) {
                    let files = {};
                    let ret_json = {};
                    ret_json = response;
                    //                        self.file_factory_path = ret_json['file_path'];

                    //                        for(let i in files_map){
                    //                            let file = files[i];
                    //                            temp_map [file] = [file];
                    //                        }

                    for (let i in ret_json) {
                        //                            console.log(ret_json[i].name);
                        temp_map[ret_json[i].uuid_file_name] = {
                            'name': ret_json[i].name,
                            'content': ret_json[i].content,
                            'date_created': ret_json[i].date_created,
                            'last_updated': ret_json[i].last_updated,
                            'starred': ret_json[i].starred
                        };
                    }
                    return defObj.resolve(temp_map);
                }
            });
        return defObj.promise();
    }
    initialize_save_action_for_save_button(self) {
        //        let iframe_obj = document.getElementById('quick-file-editor');
        $('#quick-file-editor').off('blur');
        $('#quick-file-editor').on('blur', function() {
            var file_key = $('.file-name').attr('file-key')
            let file_data = $('#quick-file-editor').val(); //document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML;
            var savable_data = {
                'file_key': file_key,
                'name': self.label_map[file_key].name,
                'content': file_data
            }

            var defObj = $.Deferred();
            var promise =
                $.ajax({
                    url: self.tsp.PrimenotesCache.data.url_prefix + "/api/individual-component-fetch/save-file-factory",
                    data: JSON.stringify(savable_data),
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    success: function(response) {
                        self.label_map[file_key].content = file_data;
                        self.tsp.NotificationBar.launch_notification('file saved');
                        return defObj.resolve(response);
                    }
                });
            return defObj.promise();
        });
    }
    callSearchResults(searchContent) {
        let self = this;
        $('#file-middle-section').empty();
        var defSecond = $.Deferred();
        $.Deferred().resolve().then(function() {
            self.searchResults(self, self.label_map, searchContent).then(function(backHtml) {
                $('#file-middle-section').append(backHtml);
                self.events_map['individual-search']();
                defSecond.resolve();
            });
            return defSecond.promise();
        });
    }

    events() {
        let self = this;
        self.events_map = {
            "search-box": function() {
                $('#search-box').off('keyup');
                $('#search-box').on('keyup', function() {
                    self.callSearchResults($(this).val());
                });

            },
            "video-notes-help": () => {
                // $('.video-notes-help').off('click');
                $('.video-notes-help').on('click', function() {
                    self.tsp.Dialog.launch_dialog('video-notes-help-dialog');
                });
            },
            "individual-search": () => {
                /*after buliding the search results in middle section
                 * create event listeners for search results*/
                $('.individual-search').off('click');
                $('.individual-search').on('click', function() {
                    
                    $('#quick-notes-in-file-factory').show();
                    $('.individual-search').removeClass('individual-search-background');
                    $(this).addClass('individual-search-background');
                    $('#right-side-components').css('display', 'block');
                    $('#right-side-components-container').css('display', 'block');
                    //            $('.file-name').text(this.textContent.trim())
                    let file_key = $(this).attr('id');


                    let component_factory_icon = $('.active').prop('id');
                    if (self.active_switch == "video-stream-switch") {
                        $('#middle-section').hide();
                        $('#quick-notes-in-file-factory').show();

                        let file_editor = $('#quick-notes-in-file-factory').clone();
                        $('#quick-notes-in-file-factory').remove();

                        let file_editor_obj = $(file_editor).removeClass('text-editor-in-right-side-components').addClass('text-editor-in-middle-section');
                        $('#left-and-middle-section').append(file_editor_obj);


                        let screenWidth = screen.width;
                        let pane_width = parseInt($('#pane').css('width'));
                        let pane_left = parseInt($('#pane').css('left'));
                        let pane_right = parseInt($('#pane').css('right'));
                        $('#right-side-components').removeClass('right-side-components-split-screen');
                        $('#left-and-middle-section').css('width', pane_width / 2);
                        $('.file-factory-split-bar').css('left', (pane_width / 2));
                        $('#right-side-components').css('left', (pane_width / 2));
                        $('#right-side-components').css('width', (pane_width / 2) + 45);

                    } else if (self.active_switch == "file-switch") {
                        $('#video-stream-in-file-factory').hide();
                        $('#quick-notes-in-file-factory').show();
                        $('#middle-section').show();

                    }
                    self.fillRightSideComponents(self, file_key);
                });
            }
        }

        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in self.events_map) {
            //          console.log(events_map[key]);
            self.events_map[key]();
        }


    };

    fillRightSideComponents(self, file_key) {
        if (file_key === undefined || file_key === '')
            return;
        //console.log(currId);
        $('.file-name').text(self.label_map[file_key].name);
        $('.file-name').attr('file-key', file_key)
            //            document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML = '';
        $('#quick-file-editor').val('');
        var html = '';
        var componentClassName = '';
        $.Deferred().resolve().then(function() {
            $.when(self.get_file_from_server(file_key)).done(function(res) {
                self._appendHtmlAndEventListner(file_key, res);
            });
        });
        self.initialize_save_action_for_save_button(self);
        self.tsp.DetailsPanel.launch_quick_file_details_data(file_key);
    }

    _appendHtmlAndEventListner(mainClass, general_text_data) {
        //        document.getElementById('quick-file-editor').contentWindow.document.designMode = "On";
        //        document.getElementById('quick-file-editor').contentWindow.document.body.innerHTML = general_text_data;
        $('#quick-file-editor').val(general_text_data);
        //        function transform(option, argument) {
        //          editor.document.execCommand(option, false, argument);
        //        }

    };


    get_file_from_server(file_key) {
        //        file_name = this.file_factory_path + '/' + file_name;
        var defObj = $.Deferred();
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

    action_functions() {
        let self = this;
        this.action_function_map = {};
        this.action_function_map = {
            create_new_file: function() {
                self.tsp.Dialog.launch_dialog('create-new-quick-file-form')
                $('#create-file-text-box').focus();
            },
            create_new_file_submit_btn: function() {
                let file_name = $('#create-file-text-box').val();
                if (file_name == '' || self.label_map[file_name + '.txt'] != undefined) {
                    alert('File exists with the same name ');
                    return;
                }
                let temp_map = {
                    'folder_id': '',
                    'folder_path': '../frontend_files/web-app/all_general_files/file_factory',
                    'file_name': file_name,
                    'file_type': 'file_factory',
                    'create_type': 'File'
                }
                self.tsp.DomActions._create_file_in_backend_duplicate(temp_map).then(function(ret_json) {

                    //                    console.log(ret_json);
                    //                    let file_name_id =  //file_name.replaceAll('  ',' ').replaceAll(' ','-') ;
                    let html = `<div class='individual-search' id="${ret_json.uuid_file_name}" > <span class='search-result-item' >${ret_json.name}</span></div>`;
                    $('#file-middle-section').prepend($(html));
                    self.events_map['individual-search']();
                    $('.file-name').text(ret_json.name);
                    $('.file-name').attr('file-key', ret_json.uuid_file_name);
                    self.label_map[ret_json.uuid_file_name] = {
                        'name': ret_json.name,
                        'content': ret_json.content,
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
    _create_new_file_factory_form() {
        /*create new file */
        let self = this;
        $('#create-new-file').on('click', function() {
            //                $('#create-new-file-form').css('display','block');
            self.action_function_map.create_new_file();
        });
        //            $('#create-new-file-submit-btn').on('click',function(){
        //                self.action_function_map.create_new_file_submit_btn();
        //            });

        $('#close-create-file-form').on('click', function() {
            $('#create-new-file-form').css('display', 'none');
        });
    }

    _create_event_listeners_for_file_factory_dragbar() {
        const bar = $('.file-factory-split-bar');
        const left_part = $('#left-and-middle-section');
        const right_part = $('#right-side-components');
        let self = this;
        self.file_factory_mouse_is_down = false;

        bar.on('mousedown', function(e) {
            if(parseInt( $(this).css('left') ) == 20)
                return;
            self.file_factory_mouse_is_down = true;
            $('#quick-notes-backdrop').show();
        });

        bar.on('mouseup', function(e) {
            $('#quick-notes-backdrop').hide();
        });
        $(document).on('mousemove', (e) => {
            if (!self.file_factory_mouse_is_down) return;
            let screenWidth = screen.width;
            $('#right-side-components').removeClass('right-side-components-split-screen'); //.css({'left':'250px', 'width':'1090px'});
            let pane_width = parseInt($('#pane').css('width'));
            let screenLeft = parseInt($('#pane').css('left'));
            let screenRight = parseInt($('#pane').css('right'));

            let q1 = pane_width - parseInt(`${e.clientX}px`) + screenLeft; //130 is the
            let q2 = parseInt(`${e.clientX}px`);
            if (q2 < screenLeft || q2 > screenLeft + pane_width)
                return;
            left_part.css('width', q2 - screenLeft);
            right_part.css('width', q1 + 40);
            right_part.css('left', q2 - screenLeft + 3);
            bar.css('left', q2 - screenLeft);
        });

        document.addEventListener('mouseup', () => {
            self.file_factory_mouse_is_down = false;

        });
    }

    __display_youtube_streaming_dialog() {
        //        $(this.dialog_component).css('display', 'block');
        //        $(this.dialog_component).css({'width': '40%','height': '55%','top':'32%','left':'40%'});
        $('#pane').show();
    }

    _initialize_youtube_stream() {
        let self = this;
        $('#stream-youtube-video').on('click', function() {
            let youtube_link = $('#youtube-video-link').val();
            self.__display_youtube_streaming_dialog();
            //             $(self.dialog_component).css('display', 'block');
            self.tsp.DomActions._create_component_open_close('youtube', youtube_link);
        });

        $('#open-youtube-frame').on('click', function() {
            self.__display_youtube_streaming_dialog();
        });
    }

    __internal_rename(self, rename_field, file_key) {
        let new_file_name = $(rename_field).val();
        self.label_map[file_key].name = new_file_name;
        let send_data = {
            'file_key': file_key,
            'name': new_file_name
        }
        self.tsp.DomActions._rename_file_factory_files('file_factory', send_data).then(function() {
            let new_span = `<span class="search-result-item">${new_file_name}</span>`
            let parent_ele = $(rename_field).parent();
            parent_ele.attr('id', file_key).empty();
            if( self.label_map[file_key].starred.toString().toLowerCase() == "true")
                new_span = new_span +  `<i class='icon star' ></i>`;
            parent_ele.append($(new_span));
            $('.file-name').text(new_file_name)
            self.tsp.NotificationBar.launch_notification('File Renamed');
        });
    }
    _onfocusout_rename_field(file_key) {
        let self = this;
        $('#quick-file-rename-field').on('blur', function() {
            self.__internal_rename(self, this, file_key);
        });
    }
    _build_rename_field_and_call_backend() {
        let self = this;
        let file_key = $('.file-name').attr('file-key');
        let file_name = self.label_map[file_key].name;
        let input = $(`<input type='text' id='quick-file-rename-field' value='${file_name}' />`);
        let curr_file_ele = $('#' + file_key)
        curr_file_ele.empty();
        curr_file_ele.append(input);
        let input_text = input.val();
        input.val('');
        input.val(input_text).focus();
        $('#quick-file-rename-field').keypress(function(e) { if (e.which == 13) $(this).blur(); });

        //        input.focus();
        self._onfocusout_rename_field(file_key);
    }
    _delete_file_in_the_backend() {
        let self = this;
        let file_key = $('.file-name').attr('file-key');

        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
            self.tsp.DomActions._delete_file(file_key).then(function() {
                let curr_file_ele = $('#' + file_key);
                $(curr_file_ele).remove();
                delete self.label_map[file_key];
                self.fillRightSideComponents(self, Object.keys(self.label_map)[0]);

                self.tsp.NotificationBar.launch_notification('File Deleted');
            }).fail(function() {
                alert('cant delete the file');
            });

        }
    }
    update_starred_files_with_icon(file_uuid) {
        let self = this;
        let star_icon_html = `<i class='icon star'></i>`;
        //        let star_icon_html_outline = `<i class='star outline icon quick-file-fav' file_uuid='${file_uuid}'></i>`;
        let cloned;

        let ele = $(`.individual-search[id='${file_uuid}']`);
        if (ele.length == 0) {
            let html = `<div class='individual-search' id='${file_uuid}'>`;
            html = html + `<span class='search-result-item' >${self.label_map[file_uuid].name}</span>`;


            if (self.label_map[file_uuid].starred == "true") {
                html = html + star_icon_html;
                html = html + `</div>`;
                $('#file-middle-section').prepend($(html));
            }
            else{
                html = html + `</div>`;
                $('#file-middle-section').append($(html));
            }
        } else {
            if (self.label_map[file_uuid].starred == "false") {
                $(ele).find('.icon.star').remove();
                cloned = $(ele).clone();
                $(ele).remove();
                $('#file-middle-section').append($(cloned));
            } else {
                $(ele).append($(star_icon_html));
                cloned = $(ele).clone();
                $(ele).remove();
                $('#file-middle-section').prepend($(cloned));
            }
        }
    }
    starr_in_UI(file_key) {
        let self = this;
        if (self.label_map[file_key].starred == "true") {
            self.tsp.NotificationBar.launch_notification('File Starred ');
        } else {
            self.tsp.NotificationBar.launch_notification('File UnStarred ');
        }
    }
    _mark_favourite_in_the_backend(file_key) {
        let self = this;
        //            let file_key = $('.file-name').attr('file-key');
        self.tsp.DomActions._make_quick_file_favourite(file_key).then(function(res) {
            self.label_map[file_key] = res;
            self.starr_in_UI(file_key);
            self.update_starred_files_with_icon(file_key);
            self.events_map['individual-search']();
        });
    }
    _build_file_factory_options() {
        let self = this;
        //        $('.quick-file-rename').off('click');
        $('.quick-file-rename').on('click', function() {
            self._build_rename_field_and_call_backend();
        });
        $('.quick-file-delete').off('click');
        $('.quick-file-delete').on('click', function() {
            self._delete_file_in_the_backend();

        });

        $('.quick-file-fav').on('click', function() {
            self._mark_favourite_in_the_backend($('.file-name').attr('file-key'));
        });

        $('.quick-file-detail').off('click')
        $('.quick-file-detail').on('click', function() {
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
    _open_settings() {
        let self = this;
        $('#quick-notes-setting').off('click');
        $('#quick-notes-setting').on('click', function() {
            if (self.open_setting_flag === 0) {
                $('.options').css({ 'display': 'flex' });
                $('.file-factory-options').css('visibility', 'visible');
                //                $('#quick-file-editor').css('left','55px');
                self.open_setting_flag = 1;
            } else {
                $('.options').css({ 'display': 'none' });
                $('.file-factory-options').css('visibility', 'hidden');
                //                $('#quick-file-editor').css('left','15px');
                self.open_setting_flag = 0;
            }
        });

    }
    _make_resize() {
        $('#make-resize').on('click', function() {
            $('.resize-icon').show();
            $(this).hide();
        });
    }


    init(tsp, unused_return_values) {
        tsp.loadComponentsContainer = this;
        this.tsp = tsp;
        let self = this;
        self.open_setting_flag = 0;
        this.file_factory_path = '../frontend_files/web-app/all_general_files/file_factory';
        this.active_switch = 'video-stream-switch';
        this.action_functions();
        this._create_new_file_factory_form();
        this._initialize_file_chat_switches_events();
        this._create_event_listeners_for_file_factory_dragbar();
        this._initialize_youtube_stream();
        this._make_resize();
        this._open_settings();
        this._build_file_factory_options();
        this.events();
        var screenWidth = parseInt(screen.width);
        var screenHeight = parseInt(screen.height);

        /*first time event listener is added so flag is generated*/
        let init_deferred = $.Deferred();
        let defStart = $.Deferred();
        /*map for storing labels of the corresponding id
        	self.labelMap={
        	    file_name : ['display_name']
                'drowssap': ['drowssap', 'secrets'],
        }; */


        var initialize_Search_Results_Close_Button_Binder = function() {
            $('#search-results-close-button').on('click', function() {
                //                $('#middle-section').css('width','0px');
                $('.search-container').css('display', 'none');
                $('#chat-file-icon-section').css('display', 'none');

                $('#right-side-components').attr('class', 'right-side-modify');

                var tempEle = $(this).clone();

                $(this).remove();
                $('.left-corner-sub-div').append($(tempEle));
                $('#compo-search-navigation').css({
                    'transform': 'rotate(180deg)',
                    'width': '55px',
                    'margin-left': '30px',
                    'height': '15px'
                });

                initialize_Left_Corner_Close_Button_Binder();
            });
        };
        initialize_Search_Results_Close_Button_Binder();



        var initialize_Left_Corner_Close_Button_Binder = function() {
            $('#search-results-close-button').on('click', function() {
                var tempEle = $(this).clone();

                $(this).remove();

                $('#middle-section').append($(tempEle));
                $('#compo-search-navigation').css({
                    'transform': 'rotate(0deg)',
                    'width': '55px',
                    'margin-left': '30px',
                    'height': '90%'
                });

                $('#middle-section').css('width', '210px');
                $('.search-container').css('display', 'block');
                $('#chat-file-icon-section').css('display', 'block');
                $('#right-side-components').removeClass('right-side-modify');

                initialize_Search_Results_Close_Button_Binder();
            });
        };

        self.initialize_save_action_for_save_button(self);

        self._get_file_factory_list().then(function(label_map) {
            self.label_map = label_map;
            self.searchResults(self, label_map).then(function(backHtml) {

                $('#file-middle-section').append(backHtml);
                self.events_map['individual-search']();
                defStart.resolve();
                return init_deferred.resolve(tsp, self.label_map);

            });
            //            return defStart.promise();
        });

        return init_deferred.promise();
    };

}