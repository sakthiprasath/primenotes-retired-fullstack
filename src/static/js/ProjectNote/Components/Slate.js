

export default class Slate{
    constructor(){
        this.CONTAINER = document.querySelector('.note-editable') //@TODO: make note-editable (stack) draggie
        this.highestIndex = 1
        this.draggies = []
        this.dropElem = null
        this.isDragging = false
        this.set_html_map();
    }
    build_dependent_css(){
        let self = this;
        let urls=  [];
        self.tsp.HtmlTagBuilder.build_tags(urls);
    }
    set_html_map(){
        let self = this;
        self.html_map = {};
        self.html_map = {
            "cards"     : (args) =>{
                return `<div class="card drag blue" id="${args['uuid']}">${args["name"]}</div>`
            },
            "properties": (args) =>{
                return  `<div class="drag remove-transform-rotation" role="button" tabindex="0" style="user-select: none; transition: background 20ms ease-in 0s; cursor: grab; display: flex; align-items: center; justify-content: center; width: 18px; height: 24px; border-radius: 3px; fill: rgba(55, 53, 47, 0.3);">
                                        <svg viewBox="0 0 10 10" class="dragHandle" style="width: 14px; height: 14px; display: block; fill: inherit; flex-shrink: 0; backface-visibility: hidden;">
                                            <path
                                                d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z">
                                            </path>
                                        </svg>
                                        <div class="properties">
                                            <input class="form-control input-width" type="text">
                                            <span class="properties-divider"></span>
                                            <input class="form-control input-width" type="text">
                                        </div>
                            </div>`
            },
            "multitext" : (args)=> {
                return `<div class="outer-resize drag remove-transform-rotation" data-value="${args['uuid']}">
                <div>
                    <i class="icon setting" data-value="${args['uuid']}" component-name="${args['component_name']}"></i>
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
                 </div>`
            }
        }
    }
    accordion_action(){
        let self = this;
        self.accordion_data = `index, such as the Standard & Poor's 500 Index (S&P 500). An index mutual fund is said to provide broad market exposure, low operating expenses, and low portfolio turnover. These funds follow their benchmark index regardless of the state of the markets. `;

        $('.input-width common-min-height .level-2').append($(self.accordion_data['level-2']));

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

        })




    }
    build_outer_part(args){
        let self = this;
        let html = ``;
        if (args !== undefined){
            switch(args["component_name"]){
                case "cards":{
                    html += self.html_map['cards'](args);
                    break;
                }
                case "properties":{
                    html += self.html_map['properties'](args);
                    break;
                }
            }
            //self.DRAG_ELEMENTS = [$(html)];
        }
        else{
            html +=` <div class="card drag blue">blue</div>
                            <div class="card drag purple">purple</div>
                            <div class="card drag orange">orange</div>
                          `;
        }

        $(".note-editable").append(html);

        self.actions();
    }
    calculate_card_position(dragElem){
        let style = window.getComputedStyle(dragElem);
        console.log(style.getPropertyValue('top'));
        console.log(style.getPropertyValue('bottom'));
        console.log($(dragElem).attr('id'));

    }
    actions(DRAG_ELEMENTS){
        let self = this;
        let action_map = {};
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
            if(self.dropElem) {
              self.randomAngle = -10 + (Math.random() * 20);
              Object.assign(dragElem.style, {
                left: `${self.dropElem.offsetLeft}px`,
                top: `${self.dropElem.offsetTop}px`,
                transform: `rotate(${self.randomAngle}deg)`
              })

              dragElem.classList.add('dropped');
            } else {
              dragElem.classList.remove('dropped');
            }
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
        let event_map ={
            "close_notification_dialog" : function(){

            }
        }
        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in event_map) {
          event_map[key]();
        }
    }
    init(tsp, to_return_Values){
        tsp.Slate = this;
        this.tsp = tsp;

        //this.event_map = {};
        //this.build_dependent_css();
//        this.build_outer_part();
        //this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
