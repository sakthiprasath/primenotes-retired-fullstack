

export default class Accordion{
    constructor(){
        this.event_map = {};
        this.action_map = {};
    }

    cache_elems(){
        let self = this;
        self.component_elems_map = {};
    }
    build_dependent_css(){
        let self = this;
        let urls=  [
             "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
             "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"];
        self.tsp.HtmlTagBuilder.build_tags(urls);
    }

    build_outer_part(uuid, component_data){
        let self = this;
        let content_data = component_data['content'];
        let inner_html = "";
        self.build_accordion_header_part = (uuid, title)=>{
            return   `  <dt>
                            <a href="#accordion1" aria-expanded="false" aria-controls="accordion1"
                                class="accordion-title accordionTitle js-accordionTrigger">${title} </a>
                        </dt>`;
         }
        self.build_accordion_content_part = (uuid, content)=>{
            return `
                     <dd class="accordion-content accordionItem is-collapsed" id=${uuid} aria-hidden="true">
                        <div class="input-width common-min-height">
                            <a class="ui teal label edit-content-button" data-value='${uuid}'>
                                <i class="edit icon"></i>
                                ${self.tsp.GlobalConstants.edit_content_text}
                            </a>
                            <div class="current-edit-area">
                                ${content}
                            </div>
                        </div>
                     </dd>
                    `
        }
        for(let uuid in content_data){
            inner_html += `
                                ${self.build_accordion_header_part(uuid, content_data[uuid].title)}
                                ${self.build_accordion_content_part(uuid, content_data[uuid].content)}
                             `;
        }
        let html = `<div class="outer-resize drag remove-transform-rotation" id="${uuid}">
                        <div class="setting">
                            <i class="icon setting component common-icon" data-value="${uuid}" component-name="${component_data['type']}"></i>
                        </div>
                        <div class="accordion parent-dependent-maker">
                            <dl>
                                ${inner_html}
                                    <!--div class="accordion-add-button" data-value="${uuid}"> ${self.tsp.GlobalConstants.plus_button_text} </div -->
                            </dl>
                            <!-- end description list -->
                        </div>
                    </div>`;
        return $(html);
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
                    <a class="item setting-miny-width">
                      Mini
                    </a>
                    <a class="item setting-medium-width">
                      Small
                    </a>
                    <a class="item setting-max-width" >
                      Max Width
                    </a>
                    `;
        return html;
    }

    settings_events(){
        let self = this;
        self.settings_event_map = {
            "miny_width" : () => {
                    $('.setting-miny-width').click(()=>{
                        $('#'+ self.id).css('width', '30%');
                    });
            },
            "medium_width" : () => {
                    $('.setting-medium-width').click(()=>{
                        $('#'+ self.id).css('width', '60%');
                    });
            },
            "max_width" : () => {
                    $('.setting-max-width').click(()=>{
                        $('#'+ self.id).css('width', '80%');
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
    events(){
        let self = this;
        self.event_map ={
                "init_accordion_events": () => {
                     var d = document,
                        accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
                        setAria,
                        setAccordionAria,
                        switchAccordion,
                        touchSupported = ('ontouchstart' in window),
                        pointerSupported = ('pointerdown' in window);

                      var skipClickDelay = function(e) {
                        e.preventDefault();
                        e.target.click();
                      }

                      var setAriaAttr = function(el, ariaType, newProperty) {
                        el.setAttribute(ariaType, newProperty);
                      };
                      setAccordionAria = function(el1, el2, expanded) {
                        switch (expanded) {
                          case "true":
                            setAriaAttr(el1, 'aria-expanded', 'true');
                            setAriaAttr(el2, 'aria-hidden', 'false');
                            break;
                          case "false":
                            setAriaAttr(el1, 'aria-expanded', 'false');
                            setAriaAttr(el2, 'aria-hidden', 'true');
                            break;
                          default:
                            break;
                        }
                      };
                      //function
                      switchAccordion = function(e) {
                        e.preventDefault();
                        var thisAnswer = e.target.parentNode.nextElementSibling;
                        var thisQuestion = e.target;
                        if (thisAnswer.classList.contains('is-collapsed')) {
                          setAccordionAria(thisQuestion, thisAnswer, 'true');
                        } else {
                          setAccordionAria(thisQuestion, thisAnswer, 'false');
                        }
                        thisQuestion.classList.toggle('is-collapsed');
                        thisQuestion.classList.toggle('is-expanded');
                        thisAnswer.classList.toggle('is-collapsed');
                        thisAnswer.classList.toggle('is-expanded');

                        thisAnswer.classList.toggle('animateIn');
                      };
                      for (var i = 0, len = accordionToggles.length; i < len; i++) {
            if (touchSupported) {
              accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
            }
            if (pointerSupported) {
              accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
              accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
            }
            accordionToggles[i].addEventListener('click', switchAccordion, false);
          }
                },
                "settings_bar_open": () => {
                    $('.setting.component').click(()=>{
                        let settings_html = self.get_settings_html();
                        self.tsp.SettingsSideBar.load_settings(settings_html);
                        self.settings_events();
                    });
                },
                "init_edit_content_event": () => {
                     $('.teal.label').click((e)=>{
                            let id = e.target.getAttribute('data-value');
                            let edit_area_ele = $('#' + id).find('.current-edit-area');
                            let editor_html   = $(edit_area_ele).html();
                            self.tsp.Dialog.launch_dialog('component-text-editor', "Header Text", id, editor_html);
                      });
                },
                "add_new_accordion_level": ()=> {
                    $('.accordion-add-button').click((e)=>{
                        let accordion_id = e.target.getAttribute('data-value');
                        let selector = '#'+accordion_id + " " + ".parent-dependent-maker dl .accordion-add-button";
                        let uuid = self.tsp.GlobalConstants.generate_UUID();
                        self.component_data['content'][uuid] = {
                             "level": 3,
                             "title": "new level title",
                             "content": `<h1 style="text-align: left; ">level - new</h1>`
                        }
                        let new_accordion_level_html = self.build_accordion_header_part(uuid, "Title") ;
                        new_accordion_level_html += self.build_accordion_content_part(uuid,  self.component_data['content'][uuid].content);

                        $(selector).before($(new_accordion_level_html));
                        self.event_map['init_accordion_events']();
                        self.event_map['init_edit_content_event']();
                    });
                }
            }
        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in self.event_map) {
          self.event_map[key]();
        }
    }
    actions(){
        let self = this;
        self.action_map = {
            "on_component_text_edit_dialog_ok": (id, modified_html)=>{
                    alert("worked");

                    /*updating view*/
                    let content_html_area = $('#' + id).find('.current-edit-area')
                    $(content_html_area).html(modified_html);

                    /*Updating model*/
                    self.component_data['content'][id].content = modified_html; //after db is setup call backend

                }
        }

         //custom event




    }

    build_component(parent_component_ele, uuid, component_data){
        let self = this;
        self.id = uuid;
        self.component_data = component_data;
        let accordion_ele = self.build_outer_part(uuid, component_data);
        parent_component_ele.append(accordion_ele);
        self.actions();
        self.events();
        self.tsp.Slate.actions(); //this is for drag and drop
    }
    init(tsp){
        tsp.Accordion = this;
        this.tsp = tsp;
//        this.build_outer_part(); //load on demand
//        this.events(); // load on demand

        return $.Deferred().resolve(tsp);
    }

}
