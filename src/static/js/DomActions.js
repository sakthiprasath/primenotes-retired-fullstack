//import get_editor_file from './SourceCodeSection.js'

export default class DomActions{

    _button_clicks(){


        /*initial clicks for file */
            ($('.file-click')[0]).click()
            setTimeout( function(){
                ($('.file-get-section')[0]).click()
            },3000);

        /*password validate for drowssap*/
            $('#password-validate-dialog').dialog({
                autoOpen: false,
                width:'90%',
                height:'700'
            });
        /*close File container*/
//        $('#close-component-results-container').click();
    }
    _initialize_file_chat_switches_actions(){
        /* file and chat  switches actions*/
            $('#chat-middle-section').css('display','none');
            $('#single-chat').css('display','none');
            $('#group-chat').css('display','none');
            $("#right-side-components").css('left','245px');

            $('#file-switch').on('click',function(){
                $('#chat-middle-section').css('display','none');
                $('#file-middle-section').css(
                        {'display' : 'block',
                        'width' : '210px'});
                $('#create-new-file').css('display','block');
                $('#single-chat').css('display','none');
                $('#group-chat').css('display','none');
                $('#middle-section').css({'width' : '210px'});
                $("#right-side-components").css('left','245px');
            });

//            $('#chat-switch').on('click',function(){
//                $('#file-middle-section').css('display','none');
//                $('#chat-middle-section').css(
//                        {'display' : 'block',
//                        'width' : '260px'});
//                $('#create-new-file').css('display','none');
//                 $('#single-chat').css('display','block');
//                $('#group-chat').css('display','block');
//                $('#middle-section').css({'width' : '275px'})
//                $("#right-side-components").css('left','310px');
//
//            });
            $('#video-stream-switch').on('click',function(){
                let component_factory_icon_elems = $('.component-factory-left-icons');
                let len = component_factory_icon_elems.length;
                for(let i=0;i < len; i++){
                    let class_list = $(component_factory_icon_elems[i]).attr('class').split(' ');
                    if( class_list.indexOf('active') >=0 ){
                        $(component_factory_icon_elems[i]).removeClass('active');
                        break;
                    }
                }

                $(this).addClass('active');

                let classList =  $("#right-side-components").attr('class');
                if(classList.indexOf('right-side-components-split-screen') >=0 ){
                    $("#right-side-components").removeClass('right-side-components-split-screen');
                    $("#right-side-components").addClass('right-side-components-full-screen');
                    $('.file-factory-split-bar').css('left','0px');
                }
                else{
                    $("#right-side-components").removeClass('right-side-components-full-screen');
                    $("#right-side-components").addClass('right-side-components-split-screen');
                    $('.file-factory-split-bar').css('left','250px');
                    $('#left-and-middle-section').css('width','255px');
                }


            });
    }
    maximize_icon_click_action(self){
        /* maximize-icon in drag and drop container action*/

            let curr_container_width = parseInt($('.resizable').css('width'));
            let curr_container_height = parseInt($('.resizable').css('height'));
            let screenWidth = parseInt(window.innerWidth) + 1;
            let screenHeight = parseInt(window.innerHeight) + 1;

//    			if(curr_container_width === screenWidth && curr_container_height === screenHeight){
                if($('#pane').hasClass('pane-full-screen')){

//    		        $('#pane').css({'width':'50%','height':'50%','top':'10px','left':'0px'});
                    $('#pane').addClass('pane-centered');
                    $('#pane').removeClass('pane-full-screen');

                }
                else{
    //    			    $('#pane').css({'width':screenWidth,'height':screenHeight});
                        $('#pane').removeClass('pane-centered');
                        $('#pane').addClass('pane-full-screen');
                }
                $('#right-side-components').addClass('right-side-components-split-screen');
                $('.file-factory-split-bar').css('left','250px');
                $('#left-and-middle-section').css('width','255px');

    }
    _get_all_videos(){
         var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/get-all-videos",
                    type : "GET",
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        let files = {};
                        files = response;
                        $('#video-section').empty();
                        for(let i in files){
                            let file = files[i];
                            let video_div_html = "<div class='single-video-section'> <div class='video-content'><video width='400px' controls> <source src='http://localhost:5000/static/videos/" + file + "'  type='video/mp4'></video></div>   <div class='video-name'>" + file + "</div> </div>";
                            $('#video-section').append($(video_div_html))
                        }


                        return defObj.resolve(response);
                        alert('success');
                    }
                });
            return defObj.promise();
    }

    download_video_click_action(){
            let link = $('#video-link').val();
            let name = $('#video-name').val();
            let json_body = {}
            json_body = {'link' : link, 'name' : name }
            self = this;
            var defObj=$.Deferred();
            var promise =
                $.ajax
                ({
                    url:"http://localhost:5000/api/individual-component-fetch/download-youtube-video",
                    type : "POST",
                    data: JSON.stringify(json_body),
                    contentType:'application/x-www-form-urlencoded',
                    success : function(response){
                        self._get_all_videos();
                        return defObj.resolve(response);
                    },
                    error: function (jqXHR, textStatus, errorThrown) { alert(JSON.stringify(json_body) + "cant be downloaded due to format issue") }
                });
            return defObj.promise();
    }

    _tabs_drop_down_click(self){
         if(self.tabs_dropdown_click_flag == 0){
                self.tabs_dropdown_click_flag = 1;
                document.getElementById("myDropdown").classList.toggle("show");
             var tabArr=$('.file-get-section');
                    let len=tabArr.length;
                    for(let i=0;i<len;i++){
                        let file_name = $(tabArr[i]).text().trim();
                        let type = $(tabArr[i]).attr('type');
                        let on_click_func = `buildTab('${file_name}','${type}')`;
                        var resultHtml=`<div class='tab' onclick=${on_click_func}; >`;
                        resultHtml+= file_name;
                        resultHtml+= `</div>`;
                        $('#myDropdown').append($(resultHtml));
                        }
                    }
                else{
                    self.tabs_dropdown_click_flag=0;
                    $('#myDropdown').empty();
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    for (let i = 0; i < dropdowns.length; i++) {
                      var openDropdown = dropdowns[i];
                      if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                            }
                        }
                    }
    }
    _build_new_component(compo_name){
        let def = $.Deferred();
        let ele = `<div id='pro1000-component-dialog' class="create-component-dialog"  style='display:none;min-width:103.5% !important;min-height: 100% !important' title="` + compo_name + `">`
                        + `<div id='create-component-dialog-sub-div' style="width: 100%;height: 100%;">`
                        + `</div>`
                    + `</div>`;

        $('#destination-container').append($(ele));
        def.resolve();
        return def.promise();
    }
    _create_file_in_backend(file_type, file_name){
    /*this funciton can also be used from indicidualComponentJS/main.js */
        let send_file_name = '';
        function create_action(file_name){
            var savable_data = '';
            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/save-file/'+file_name,
                        data: JSON.stringify(savable_data),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
        }
        if(file_type === 'html_components')
            send_file_name = 'html_components-' + file_name;
        else if( file_type === 'document' ){
            send_file_name = 'separate_project-' + file_name;
        }
        else if( file_type === 'file_factory' ){
            send_file_name = 'file_factory-' + file_name;
        }
        create_action(send_file_name);
    }
     _create_file_in_backend_duplicate(data_map){
    /*this funciton can also be used from indicidualComponentJS/main.js */
        let send_file_name = '';
        function create_action(data_map){

            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/create-file/',
                        data: JSON.stringify(data_map),
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
        }

        return create_action(data_map);
    }
    _rename_file_factory_files(file_type,old_file_name, new_file_name){
        let send_file_name = '';
        function rename_action(file_type, file_name){
            var savable_data = '';
            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/rename-file/'+ file_type + '/' + old_file_name + '/' + new_file_name,
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
        }
        return rename_action(file_type, send_file_name);
    }

    _delete_file(file_type, file_name){
        function delete_action(file_type, file_name){
            var savable_data = '';
            var defObj=$.Deferred();
                var promise =
                    $.ajax
                    ({
                        url: 'http://localhost:5000/api/individual-component-fetch/delete-file/'+ file_type + '/' + file_name,
                        type : "POST",
                        contentType: 'application/json;charset=UTF-8',
                        success : function(response){
                            return defObj.resolve(response);
                        }
                    });
                return defObj.promise();
        }
        return delete_action(file_type, file_name);
    }

    _create_component_submit_execution(event_obj){

            let new_component_name = $('#create-component-text-box').val()
            if(new_component_name == ''){
                return;
            }
            let component_list = event_obj._get_components_list();
            if(component_list.indexOf(new_component_name.toLowerCase()) < 0){
                this._create_file_in_backend('html_components', new_component_name);

                /*create a new component button, building the same in current DOM and also in the backend;*/

                //building the DOM Button
                let new_component_button = `<button class='create-component create-component button tab-options-button' title='`+
                                        new_component_name + `' class="button tab-options-button">` +
			                            new_component_name + `</button>`;
                $('#component-tabs').append($(new_component_button));

                //building the component in DOM

                 $('.create-component').on('click',function(){
                    $(event_obj.dialog_component).css('display', 'block');
                    event_obj.action_obj._create_component_open_close(event_obj,this);
                });
            }
            else{
                 alert('Component Exists with the same name : '+ new_component_name);
            }


    }
    _build_component_dialog(){
            let compo_name = 'pro1000-component-dialog';
            var height = $(window).height();
            return $('#'+compo_name).dialog({
                width:'50%',
                height: height*0.8,
                position: { my: "left top"},
                dialogClass: 'no-close success-dialog',
                 buttons: [
                        {
                            text: "L",
                            icon: "ui-icon-minimize",
                            title: compo_name,
                            click: function( e ) {
                                let dialog_ele = $(this).parent();
                                dialog_ele.css('left','0px');
                                dialog_ele.css('height','100%');
                                dialog_ele.css('width','50%');
                                dialog_ele.css('top','0px');
                            }
                        },
                        {
                            text: "R",
                            icon: "ui-icon-maximize",
                            class: compo_name + 'right-orientation',
                            click: function( e ) {
                                let dialog_ele = $(this).parent();
                                dialog_ele.css('left','50%');
                                dialog_ele.css('height','100%');
                                dialog_ele.css('width','50%');
                                dialog_ele.css('top','0px');
                            }
                        },
                        {
                            text: "[]",
                            icon: "ui-icon-maximize",
                            class: compo_name + 'right-orientation',
                            click: function( e ) {
                                 let dialog_ele = $(this).parent();
                                 let left = '0px';
                                 let top = '0px';
                                 let width = '100%';
                                 let height = '100%';
                                 let curr_wid = parseInt($(this).parent().css('width'))
                                 let curr_hei = parseInt($(this).parent().css('height'));
                                 let screen_width = window.innerWidth;
                                 let screen_height = window.innerHeight;
                                 if(curr_wid == screen_width && curr_hei == screen_height){
                                    top = '200px';
                                    left ='200px';
                                    width = '50%';
                                    height = "70%";
                                 }
                                dialog_ele.css('top', top);
                                dialog_ele.css('left', left);
                                dialog_ele.css('height', height);
                                dialog_ele.css('width', width);
                            }
                        },
                         {
                            text: "X",
                            icon: "ui-icon-maximize",
                            click: function( e ) {
                                let dialog_ele = $(this).parent();
                                $($('#create-component-dialog-sub-div').children()[0]).attr('src','');
                                dialog_ele.css('display', 'none');
                            }
                        }

                    ],
                    create: function( event, ui ) {
                        $('.ui-dialog-buttonset').prependTo('.ui-dialog-titlebar');
                    }
            });

    }
    _get_iframe_ele(compo_name, youtube_link){
        let iframe_ele = "";
        iframe_ele = "<iframe src='http://localhost:5000/api/individual-component-fetch/create_component?component_name="+compo_name + "' style='width: inherit;height: inherit;'></iframe>";
        return $(iframe_ele).css({'width':'100%','height':'95%'});
    }



    __get_youtube_embed_iframe(link){
//        let link = 'https://youtu.be/fAlTcjFXlic';
        if (link.indexOf('youtu.be') > -1){

            let q1 = link.split('youtu.be');
            let iframe_ele = document.createElement('iframe');
            iframe_ele.src = "https://www.youtube.com/embed" + q1[1];
//            return $(iframe_ele).css({'width':'100%','height':'100%'});
            return $(iframe_ele).attr('width','100%').attr('height','100%');

        }
        else if(link.indexOf('<iframe') > -1){
//               return $(link).css({'width':'100%','height':'100%'});
               return $(link).attr('width','100%').attr('height','100%');

        }
        else{
                if(link.indexOf('&') > -1){
                    let link_contents = link.split('&');
                    let watch_splits = link_contents[0].split('watch');
                    let actual_link = watch_splits[1].split('=')[1];
                     let iframe_ele = document.createElement('iframe');
                    iframe_ele.src = "https://www.youtube.com/embed/" + actual_link ;
                    return $(iframe_ele).attr('width','100%').attr('height','100%');

                }
            }

    }
    _create_component_open_close(event_obj, curr_ele){

            if (event_obj =='youtube'){
                  $('#create-component-dialog-sub-div').empty();
                  let iframe_ele = this.__get_youtube_embed_iframe(curr_ele);
//                $('#create-component-dialog-sub-div').append(iframe_ele);
//                $('#ui-id-1').text('Youtube');
                  $('.right-side-components-in-file-factory').hide();
                  $('#right-side-components').css({'left':'35px','width':'calc(100% - 35px)','height':'100%','display':'block'})
                  $('#right-side-components-container').css({'width':'100%','height':'100%','display':'block'})
                  $('#video-stream-in-file-factory').css({'left':'0','width':'100%','height':'100%','display':'block'});
                  $('#video-stream-in-file-factory').empty();
                  $('#video-stream-in-file-factory').append($(iframe_ele));

            }
            else{
                let compo_name = $(curr_ele).attr('title');
                let self = event_obj;
                /*checking if the current to-generate component is already present as active element*/
                if (self.active_component_dialog_element !== compo_name ){
    //                let ele = this._build_new_component(compo_name);
    //                $('#destination-container').append($(ele));
                      $('#create-component-dialog-sub-div').empty();
                      let iframe_ele = this._get_iframe_ele(compo_name);
                      $('#create-component-dialog-sub-div').append(iframe_ele);
                      $('#ui-id-2').text(compo_name);
                      self.active_component_dialog_element = compo_name;
                    }
            }
    }
    _header_orientation_actions(){

    }
    _notification_dialog(content_str){
        let content_html  = `<span><p>${content_str}</p></span>`;
        $('#notification').css('opacity',1).empty().append($(content_html).clone());
        setTimeout(function(){
            $('#notification').css('opacity',0);
        }, 2500);
    }
    init(){
//        this._button_clicks();
        this._get_all_videos();




    }
}

