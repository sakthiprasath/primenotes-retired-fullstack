

export default class Accordion{
    constructor(){
        this.event_map = {};
        this.action_map = {};
    }
    cache_elems(){
        let self = this;
    }
    build_dependent_css(){
        let self = this;
        let urls=  [
             "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
             "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"];
        self.tsp.HtmlTagBuilder.build_tags(urls);
    }
    build_outer_part(args){
        let html = `<div class="outer-resize drag remove-transform-rotation" id="${args['uuid']}">
                <div class="setting">
                    <i class="icon setting component" data-value="${args['uuid']}" component-name="${args['component_name']}"></i>
                </div>
                <div class="accordion parent-dependent-maker">
                    <dl>
                      <!-- description list -->

                      <dt>
                          <!-- accordion tab 1 - Delivery and Pickup Options -->
                          <a href="#accordion1" aria-expanded="false" aria-controls="accordion1" class="accordion-title accordionTitle js-accordionTrigger">Delivery and Pickup Options</a>
                        </dt>
                      <dd class="accordion-content accordionItem is-collapsed" id="accordion1" aria-hidden="true">
                        <p>One can insert a div here and add the product image and the description of the product. Quantity, Cost.</p>
                      </dd>
                      <!--end accordion tab 1 -->

                      <dt>
                          <!-- accordion tab 2 - Shipping Info -->
                          <a href="#accordion2" aria-expanded="false" aria-controls="accordion2" class="accordion-title accordionTitle js-accordionTrigger">Shipping Information</a>
                        </dt>
                      <dd class="accordion-content accordionItem is-collapsed" id="accordion2" aria-hidden="true">
                           <div class="input-width common-min-height level-2">
                             <button class="ui positive right labeled icon button"> Add Content</button>
                           </div>
                      </dd>
                      <!-- end accordion tab 2 -->

                      <dt>
                          <!-- accordion tab 3 - Payment Info -->
                          <a href="#accordion3" aria-expanded="false" aria-controls="accordion3" class="accordion-title accordionTitle js-accordionTrigger">Payment Information</a>
                        </dt>
                      <dd class="accordion-content accordionItem is-collapsed" id="accordion3" aria-hidden="true">
                         <div class="input-width common-min-height">
                            <div class="align-top"> Add Content</div>
                         </div>
                      </dd>
                      <!-- end accordion tab 3 -->

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
                    <a class="item">
                      ${self.tsp.GlobalConstants.component_names.accordion}
                    </a>
                    <a class="item setting-miny-width">
                      3
                    </a>
                    <a class="item setting-medium-width">
                      3
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
                "settings_bar_open": () => {
                    $('.setting.component').click(()=>{
                        let settings_html = self.get_settings_html();
                        self.tsp.SettingsSideBar.load_settings(settings_html);
                        self.settings_events();
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
        self.accordion_data = `index, such as the Standard & Poor's 500 Index (S&P 500). An index mutual fund is said to provide broad market exposure, low operating expenses, and low portfolio turnover. These funds follow their benchmark index regardless of the state of the markets. `;

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

         //custom event
          $('.positive.button').click((e)=>{
//                 let q1 = $(e.currentTarget).parent();
//                 let html = $(q1).html();
//                 console.log(html);
                 self.tsp.Dialog.action_map.load_dialog();
                 $('.content > .description').summernote('code',  self.accordion_data['level-2']);
          });


        $('.icon-setting.component').click(()=>{
            let uuid = $(this).attr('data-value');
            let component_name = $(this).attr('component-name');
            let component_settings = self.fixed_component_data[component_name]["settings"];

        });

    }

    build_component(parent_component_ele, component_name){
        let self = this;
        self.id = self.tsp.GlobalConstants.generate_UUID();
        let accordion_ele = self.build_outer_part({
            "uuid": self.id,
            "component_name": self.tsp.GlobalConstants.component_names.accordion
        });
        parent_component_ele.append(accordion_ele);
        self.actions();
        self.events();
        self.tsp.Slate.actions();
    }
    init(tsp){
        tsp.Accordion = this;
        this.tsp = tsp;
//        this.build_outer_part(); //load on demand
//        this.events(); // load on demand

        return $.Deferred().resolve(tsp);
    }

}
