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

            $('#chat-switch').on('click',function(){
                $('#file-middle-section').css('display','none');
                $('#chat-middle-section').css(
                        {'display' : 'block',
                        'width' : '260px'});
                $('#create-new-file').css('display','none');
                 $('#single-chat').css('display','block');
                $('#group-chat').css('display','block');
                $('#middle-section').css({'width' : '275px'})
                $("#right-side-components").css('left','310px');

            });

    }
    maximize_icon_click_action(self){
        /* maximize-icon in drag and drop container action*/

            let curr_container_width = parseInt($('.resizable').css('width'));
            let curr_container_height = parseInt($('.resizable').css('height'));
            let screenWidth = parseInt(window.innerWidth) + 1;
            let screenHeight = parseInt(window.innerHeight) + 1;

    		if(curr_container_width === screenWidth && curr_container_height === screenHeight){

    		        $('#pane').css({'width':'50%','height':'50%','top':'10px','left':'0px'});

    		}
    		else{
    			    $('#pane').css({'width':screenWidth,'height':screenHeight,'top':'0px','left':'0px'});
            }
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
                        var resultHtml="<div class='tab' onclick=buildTab('" + file_name + "');>";
                        resultHtml+= file_name;
                        resultHtml+= "</div>";
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
         let iframe_ele = "<iframe src='http://localhost:5000/api/individual-component-fetch/create_component?component_name="+compo_name + "' style='width: inherit;height: inherit;'></iframe>";
         let ele = `<div id='` + compo_name +`' class="create-component-dialog"  style='display:none;min-width:103.5% !important;min-height: 100% !important' title="` + compo_name + `">`
                        + `<div class='create-component-dialog-sub-div' style="width: 100%;height: 100%;">` + iframe_ele
                        + `</div>`
                    + `</div>`;
        return ele;
    }
    _create_file_in_backend(file_type, file_name){
    /*this funciton can also be used from indicidualComponentJS/main.js */
        let send_file_name = '';
        function save_action(file_name){
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
        else if( file_type === 'separate_project' ){
            send_file_name = 'separate_project-' + file_name;
        }
        else if( file_type === 'file_factory' ){
            send_file_name = 'file_factory-' + file_name;
        }
        save_action(send_file_name);
    }
    _create_component_open_close(event_obj, curr_ele){
            let compo_name = $(curr_ele).attr('title');
            let self = event_obj;
            /*checking if the current to-generate component is already present as active element*/
            if (self.components_list.indexOf(compo_name) <0){
                self.components_list.push(compo_name);
                let ele = this._build_new_component(compo_name);
                $('#destination-container').append($(ele));

            }
            var height = $(window).height();
            $('#'+compo_name).dialog({
                width:'50%',
                height: height*0.8,
                position: { my: "left top"},
                dialogClass: compo_name + '-class',
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
                        }

                    ],
                    create: function( event, ui ) {
                        $('.ui-dialog-buttonset').prependTo('.ui-dialog-titlebar');
                    }
            });
    }

    init(){
        this._button_clicks();
        this._get_all_videos();

    }
}

