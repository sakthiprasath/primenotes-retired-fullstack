

export default class ComponentBuilder{
    constructor(){
        this.action_map = {};
        this.event_map = {};
    }
    build_component(uuid, component_data){
        let self = this;
        let parent_component = $('.note-editable');
        switch(component_data["type"]){
            case "accordion":{
                self.tsp.Accordion.build_component(parent_component, uuid, component_data);
                break;
            }
            case "cards":{
                self.tsp.Slate.build_component(parent_component, uuid, component_data);
                break;
            }

        }
    }
    render_all_components_in_file_json(){
        let self = this;
        //Data from firebase
        let file_component_data = {
            "uuid": {
                "type": "accordion",
                "content": {
                    "uuid_1": {
                        "level": 1,
                        "title": "First level title",
                        "content": `<h1 style="text-align: left; ">level - 1</h1>`
                    },
                    "uuid_2": {
                        "level": 2,
                        "title": "Second level title",
                        "content": `<h1 style="text-align: left; ">level - 2</h1>`
                    },
                }
            }

        };
        for(let uuid in file_component_data){
            let component_data = file_component_data[uuid]
            self.build_component(uuid, component_data);
        }
    }
    init(tsp){
        tsp.ComponentBuilder = this;
        this.tsp = tsp;
//        this.render_all_components_in_file_json();
        return $.Deferred().resolve(tsp);
    }

}
