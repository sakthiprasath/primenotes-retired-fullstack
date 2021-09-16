

export default class ToDoComponent{
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
    build_outer_part(){
        let html = ``;
        $(".note-editable").append(html);
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
        tsp.ToDoComponent = this;
        this.tsp = tsp;
        this.event_map = {};
        this.build_dependent_css();
        this.build_outer_part();
        this.cache_elems();
        this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
