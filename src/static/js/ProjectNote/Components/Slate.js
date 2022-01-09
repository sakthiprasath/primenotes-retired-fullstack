

export default class Slate{
    constructor(){
        this.CONTAINER = document.querySelector('.note-editable') //@TODO: make note-editable (stack) draggie
        this.highestIndex = 1
        this.draggies = []
        this.dropElem = null
        this.isDragging = false
        this.set_html_map();
        this.current_Card_id = null;
        this.event_map = {};
        this.action_map = {};
    }
    build_dependent_css(){
        let self = this;
        let urls=  [];
        self.tsp.HtmlTagBuilder.build_tags(urls);
    }
    build_slate_menu_html(){
        let self = this;
        let plus_icon_onclick_menu_HTML = `<div class="ui dropdown item card-menu">
                            <div class="menu for-plus-icon-of-card">
                              <a class="item"><i class="edit icon"></i> Edit Content</a>
                              <a class="item add-image"><i class="image icon"></i> Add Image </a>
                              <a class="item make-it-banner"><i class="settings icon"></i>Make it as Banner</a>
                              <a class="item"><i class="copy icon"></i>Duplicate</a>
                            </div>
                          </div>`;
        $(self.tsp.GlobalConstants.parent_ele_selector).append($(plus_icon_onclick_menu_HTML));
    }

    get_settings_html(){
        let self = this;
        let setting_str = self.tsp.GlobalConstants.component_names.accordion + " " + self.tsp.GlobalConstants.settings;
        let html = `
                    <div class="item ">
                        ${setting_str}
                        <i class="close icon">
                        </i>
                    </div>
                    <input class="item setting-stepper" placehoplder="stepper" />
                    <a class="item setting-increase-width">
                      Increase Width
                    </a>
                    <a class="item setting-decrease-width">
                      Decrease Width
                    </a>
                    <a class="item setting-max-width" >
                      Max Width
                    </a>
                    <a class="item setting-increase-height" >
                      Increase height
                    </a>
                    <a class="item setting-decrease-height">
                      Decrease height
                    </a>
                    <a class="item setting-move-up" >
                      Move Up
                    </a>
                    <a class="item setting-move-down" >
                      Move Down
                    </a>
                    <a class="item setting-move-left" >
                      Move left
                    </a>
                    <a class="item setting-move-right" >
                      Move Right
                    </a>

                    `;
        return html;
    }

    settings_events(){
        let self = this;
        let moves = 3;
        let sizes = 5;
        self.settings_event_map = {
            "increase_width" : () => {
                    $('.setting-increase-width').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('width', parseInt(ele.css('width')) + stepper);
                    });
            },
            "decrease_width" : () => {
                    $('.setting-decrease-width').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('width', parseInt(ele.css('width')) - stepper);
                    });
            },
            "max_width" : () => {
                    $('.setting-max-width').click(()=>{
                        let stepper = parseInt($('.setting-stepper').val());
                        $('#'+ self.id).css('width', '500px');
                    });
            },
            "increase_height" : () => {
                    $('.setting-increase-height').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('height', parseInt(ele.css('height')) + stepper);
                    });
            },
             "decrease_height" : () => {
                    $('.setting-decrease-height').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('height', parseInt(ele.css('height')) - stepper);
                    });
            },
             "move_left" : () => {
                    $('.setting-move-left').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('left', parseInt(ele.css('left')) - stepper );
                    });
            },
             "move_right" : () => {
                    $('.setting-move-right').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('left', parseInt(ele.css('left')) + stepper);
                    });
            },
             "move_up" : () => {
                    $('.setting-move-up').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('top', parseInt(ele.css('top')) - stepper);
                    });
            },
             "move_down" : () => {
                    $('.setting-move-down').click(()=>{
                        let ele = $('#'+ self.id);
                        let stepper = parseInt($('.setting-stepper').val());
                        ele.css('top', parseInt(ele.css('top')) + stepper);
                    });
            },
            "close_icon": () =>{
                    $('.ui.sidebar .close.icon').click(()=>{
                        self.tsp.SettingsSideBar.side_bar.sidebar('toggle');
                    });
            }
        }
        for (let key in self.settings_event_map) {
          self.settings_event_map[key]();
        }
    }

    add_menu_list_events(){
        let self = this;
        let moves = 3;
        let sizes = 5;
        self.add_event_map = {
            "image" : () => {
                    $('.ui.dropdown.card-menu  .add-image').click(()=>{
                        let ele = $(self.current_card_id);
                        self.tsp.Dialog.launch_dialog('add-image-for-card', 'Add image', self.current_card_id)
                    });
            },
            'make_it_banner': () => {
                    $('.ui.dropdown.card-menu  .make-it-banner').click(()=>{
                        let ele = $("#"+ self.current_card_id);
                        ele.css({
                            "left": "0px",
                            "top": "0px",
                            "z-index": "5",
                            "width": "100%",
                            "height": "300px",
                            "overflow": "scroll",
                        });
                        $(ele.find('img')[0]).css({
                            "height": "auto",
                            "position": "absolute",
                            "top": "0px"
                        });
                    });

            }

        }
        for (let key in self.add_event_map) {
          self.add_event_map[key]();
        }
    }
    set_html_map(){
        let self = this;
        self.html_map = {};
        self.html_map = {
            "cards"     : (component_data) =>{
                return `
                    <div class="card-resize drag remove-transform-rotation" id="${component_data['uuid']}">
                        <div class="setting">
                            <i class="icon setting component common-icon" data-value="${component_data['uuid']}" component-name="${component_data['type']}"></i>
                            <i class="icon plus component common-icon" data-value="${component_data['uuid']}" component-name="${component_data['type']}"></i>
                        </div>
                     <div class="card  "></div>
                    </div>
                   `;
            },
        }
    }
    build_outer_part(uuid, component_data){
        let self = this;
        let html = ``;
        html += self.html_map['cards'](component_data);
        return $(html);
    }
    calculate_card_position(dragElem){
        let style = window.getComputedStyle(dragElem);
        console.log(style.getPropertyValue('top'));
        console.log(style.getPropertyValue('bottom'));
        console.log($(dragElem).attr('id'));

    }
    actions(DRAG_ELEMENTS){
        let self = this;
        self.action_map = {
            "on_add_image_with_url_dialog_ok": (url, curr_card_id)=>{

                let selector = "#" + curr_card_id +  "> .card";
                if (self.cropper !== undefined ){
                    var imgurl =  self.cropper.getCroppedCanvas().toDataURL();
                    if(imgurl !== null)
                        url = imgurl;
                }
                let img_html = `<img src='${url}' style="width: inherit;height: inherit">`;
                $(selector).append($(img_html));
                $('#upload-image-for-card-input').val("");
                 self.cropper('destroy');
            },
            "read_URL": (input) =>{
                  if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      $('#blah').attr('src', e.target.result)
                      if(self.cropper !== undefined){
                        self.cropper.destroy();
                      }
                      setTimeout(self.action_map["init_cropper"](), 5000);
                    };
                    reader.readAsDataURL(input.files[0]);

                  }
                },
            "init_cropper": () => {
                  console.log("Came here")
                  var image = document.getElementById('blah');
//                  $('#crop').cropper('destroy');
                  self.cropper = new Cropper(image, {

                    crop: function(e) {
                      console.log(e.detail.x);
                      console.log(e.detail.y);
                    }
                  });

                  // On crop button clicked
                 self.event_map['cropping_event']();
                },
        };
        self.DRAG_ELEMENTS = document.querySelectorAll('.drag');
        self.DRAG_ELEMENTS.forEach(dragElem => {
          self.DRAGGIE = new Draggabilly(dragElem, {
            containment: self.CONTAINER
          })

          /* note here: all the below events shoud be implemented for a newly build card;
            this is the reason this function is written in actions*/
          self.draggies.push(self.DRAGGIE);

          self.DRAGGIE.on('dragStart', event => {
            dragElem.style.zIndex = self.highestIndex
            dragElem.classList.add('dragging')
            self.CONTAINER.classList.add('dragging')
            self.isDragging = true
            self.highestIndex ++
          })

          self.DRAGGIE.on('dragEnd', event => {
            dragElem.classList.remove('dragging')
            self.CONTAINER.classList.remove('dragging')
            self.isDragging = false

            self.calculate_card_position(dragElem);

            // If images are overlapping, stack them
//            if(self.dropElem) {
//              self.randomAngle = -10 + (Math.random() * 20);
//              Object.assign(dragElem.style, {
//                left: `${self.dropElem.offsetLeft}px`,
//                top: `${self.dropElem.offsetTop}px`,
//                transform: `rotate(${self.randomAngle}deg)`
//              })
//
//              dragElem.classList.add('dropped');
//            } else {
              dragElem.classList.remove('dropped');
//            }
          })

          dragElem.addEventListener('mouseover', event => {
            if(self.isDragging){
              self.dropElem = dragElem
            }
          })

          dragElem.addEventListener('mouseout', event => {
            if(self.isDragging){
              self.dropElem = null
            }
          })
        });
    }
    events(){
        let self = this;
        self.event_map ={
            "settings_bar_open": () => {
                    $('.setting.component').click((e)=>{
                        self.id = e.target.getAttribute('data-value');
                        let settings_html = self.get_settings_html();
                        self.tsp.SettingsSideBar.load_settings(settings_html);
                        self.settings_events();
                    });
                },
            "cropping_event": () => {
//                    document.getElementById('crop_button').addEventListener('click', function(){
//                        var imgurl =  self.cropper.getCroppedCanvas().toDataURL();
//                        var img = document.createElement("img");
//                        img.src = imgurl;
//                        document.getElementById("cropped_result").innerHTML(img);
//                    });
                },
            "on_image_upload": () => {
                    $('#upload-image-for-card-input').on('input', (e)=>{
                        self.action_map['read_URL'](e.target);
                    });
                },

            "plus_icon_onclick_event": ()=>{
                    $('.plus.component').click((e) => {
                        let target_style = window.getComputedStyle(e.target);
                        self.current_card_id = $(e.target).attr('data-value');
                        console.log(target_style.top);
                        console.log(e.clientX);
                        console.log(e.clientY);

                        let menu_left = e.clientX;
                        let menu_top = e.clientY;
                        $('.ui.dropdown.card-menu').css({
                            'left': menu_left,
                            'top': menu_top,
                            'display': "block"
                        });

                    });
                    $(document).click(function(e) {
                        let target_class_list = $(e.target).attr('class').split(' ');
                        if ( target_class_list.includes('plus') || target_class_list.includes('item') )
                            return;
                        else{
                            $(".ui.dropdown.card-menu").css('display', 'none');
                        }
                    });

            }
        }
        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in self.event_map) {
          self.event_map[key]();
        }
    }
    build_component(parent_component_ele, uuid, component_data){
        let self = this;
        self.id = uuid;
        self.component_data = component_data;
        let card_ele = self.build_outer_part(uuid, component_data);
        parent_component_ele.append(card_ele);
        self.actions();
        self.events();
    }
    init(tsp, to_return_Values){
        tsp.Slate = this;
        this.tsp = tsp;
        this.build_slate_menu_html();
        this.add_menu_list_events();
        //this.event_map = {};
        //this.build_dependent_css();
//        this.build_outer_part();
        //this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
