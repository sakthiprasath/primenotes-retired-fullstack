//import get_editor_file from './SourceCodeSection.js'

export default class DomActions{

    _button_clicks(){
        /*initial clicks for file */
            ($('.file-click')[0]).click()
            setTimeout( function(){
                ($('.file-get-section')[0]).click()
            },1000);

        /*password validate for drowssap*/
            $('#password-validate-dialog').dialog({
                autoOpen: false,
                width:'90%',
                height:'700'
            });
        /*close File container*/
        $('#close-component-results-container').click();
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
    			    $('.resizable').css({'width':'100%','height':'100%','top':'0px','left':'0px'});

    		}
    		else{
    			    $('#pane').css({'width':screenWidth,'height':screenHeight,'top':'0px','left':'0px'});
    			    $('.resizable').css({'width':screenWidth,'height':screenHeight,'top':'0px','left':'0px'});
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
                            let video_div_html = "<div class='single-video-section'> <div class='video-content'><video width='400' controls> <source src='http://localhost:5000/static/videos/" + file + "'  type='video/mp4'></video></div>   <div class='video-name'>" + file + "</div> </div>";
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
                        resultHtml+= "<div class='close-tab' onclick='removeCurrentTab(this)'> </div></div>";
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
         let iframe_ele = "<iframe src='http://localhost:5000/api/individual-component-fetch/create_component?component_name="+compo_name + "' style='width: inherit;height: inherit;'></iframe>"
         let ele = `<div id='`+compo_name+`' class="create-component-dialog"  style='display:none;min-width:100% !important;min-height: 100% !important' title="drop-down">
                <div id='create-component-dialog-sub-div' style="width: 100%;height: 100%;">`
                + iframe_ele +		    `</div> </div>`;
        return ele;
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
            $('#'+compo_name).dialog();
    }

    init(){
        this._button_clicks();
        this._get_all_videos();
    }
}

