 set_html_map(){
        let self = this;
        self.html_map = {};
        self.html_map = {
            "cards"     : (component_data) =>{
                return `
                    <div class="outer-resize drag remove-transform-rotation" id="${component_data['uuid']}">
                        <div class="setting">
                            <i class="icon setting component common-icon" data-value="${component_data['uuid']}" component-name="${component_data['type']}"></i>
                        </div>
                     <div class="card drag blue" id="${component_data['uuid']}">${component_data["content"]}</div>
                    </div>
                   `;
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
            }
        }
    }


    build_outer_part(args){
        let self = this;
        let html = ``;
        html += self.html_map['cards'](args);
//        if (args !== undefined){
//            switch(args["component_name"]){
//                case "cards":{
//
//                    break;
//                }
//                case "properties":{
//                    html += self.html_map['properties'](args);
//                    break;
//                }
//            }
//        }
//        else{
//            html +=` <div class="card drag blue">blue</div>
//                            <div class="card drag purple">purple</div>
//                            <div class="card drag orange">orange</div>
//                          `;
//        }

        $(".note-editable").append(html);

        self.actions();
    }