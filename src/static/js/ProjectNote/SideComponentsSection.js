

export default class SideComponentsSection{
    constructor(){
        this.event_map = {};
    }
    build_dependent_css(){
        let self = this;
        let urls=  [
             "https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap",
             "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"];
        self.tsp.HtmlTagBuilder.build_tags(urls);
    }
    build_outer_part(){
        let html = `<div class="main-menu side-components-bg-color">
                        <ul>
                            <section id="home" class="side-components-bg-color">
                                <li class="menu-item nav-bar">
                                    <i class="fa fa-bars"></i>
                                   <div class="menu-click-item">
                                        <span class="menu-content-text"></span>
                                    </div>
                                </li>
                                <li class="menu-item">
                                    <i class="fa fa-home"></i>
                                    <div class="menu-click-item">
                                        <span class="menu-content-text"> Cards </span>
                                        <i class="fa fa-plus" data-value="cards"></i>
                                    </div>
                                </li>
                                <li class="menu-item">
                                    <i class="fa fa-home"></i>
                                    <div class="menu-click-item">
                                        <span class="menu-content-text"> Property </span>
                                        <i class="fa fa-plus" data-value="properties"></i>
                                    </div>
                                </li>
                                <li class="menu-item">
                                    <i class="fa fa-home"></i>
                                    <div class="menu-click-item">
                                        <span class="menu-content-text"> Accordion </span>
                                        <i class="fa fa-plus" data-value="accordion"></i>
                                    </div>
                                </li>
                                <li class="menu-item">
                                    <i class="fa fa-home"></i>
                                    <div class="menu-click-item">
                                        <span class="menu-content-text"> Boot Dialog </span>
                                        <i class="fa fa-plus" data-value="boot_dialog"></i>
                                    </div>
                                </li>
                            </section>

                        </ul>
                    </div>`;
        $(".note-editor").before(html);
    }

    generate_UUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

    events(){
        let self = this;
        let event_map ={
            "open_close_navigation" : () => {
                $('.menu-item.nav-bar').click(()=>{
                    $('.main-menu').toggleClass('nav-bar-width-class');
                    $('.note-editor').toggleClass('note-editor-moved-left');
                });
            },

            "create_new_component": ()=>{
                $('.menu-click-item .fa-plus').click((e) => {
                    let component_name = $(e.currentTarget).attr('data-value');
                    if(component_name === "cards"){
                        let uuid = self.generate_UUID();
                        self.tsp.Slate.build_outer_part({"name": "new slate", "uuid": uuid, "component_name": "cards"});
                        }
                    else if(component_name === "properties"){
                        let uuid = self.generate_UUID();
                        self.tsp.Slate.build_outer_part({"name": "new property", "uuid": uuid, "component_name": "properties"});
                        }
                    else if(component_name === "accordion"){
                        let uuid = self.generate_UUID();
//                        self.tsp.Slate.build_outer_part({"name": "new accordion", "uuid": uuid, "component_name": "accordion"});
                        self.tsp.ComponentBuilder.build_component(component_name);
                        }
                    else if(component_name === "boot_dialog"){
                        self.tsp.Dialog.action_map.load_dialog();
                    }

                    });
            }
        }

        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in event_map) {
          event_map[key]();
        }
    }

    init(tsp, to_return_Values){
        tsp.SideComponentsSection = this;
        this.tsp = tsp;
        this.build_dependent_css();
        this.build_outer_part();
        this.events();
        return $.Deferred().resolve(tsp, to_return_Values);
    }

}
