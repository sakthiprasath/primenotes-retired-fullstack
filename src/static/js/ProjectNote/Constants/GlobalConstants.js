export default class GlobalConstants {
    constructor() {
        let self = this;
        self.components_data = {
            accordion: {
                "settings": {
                    "width": "500px",
                    "height": "500px"
                },
                "data_structure":{

                }
            }
        }
        self.generate_UUID = ()=> {
            return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        self.component_names ={
            accordion: "accordion"
        };
        self.settings = "settings";


    }
    init(tsp, to_return_Values) {
        tsp.GlobalConstants = this;
        this.tsp = tsp;
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}