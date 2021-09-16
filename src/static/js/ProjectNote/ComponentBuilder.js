

export default class ComponentBuilder{
    constructor(){
        this.action_map = {};
        this.event_map = {};
    }
    build_component(component_name){
        let self = this;
        let parent_component = $('.note-editable');
        switch(component_name){
            case "accordion":{
                self.tsp.Accordion.build_component(parent_component);
                break;
            }
        }
    }
    init(tsp){
        tsp.ComponentBuilder = this;
        this.tsp = tsp;
        return $.Deferred().resolve(tsp);
    }

}
