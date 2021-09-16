

export default class Dialog{
    constructor(){
        this.action_map = {};
        this.event_map = {};
    }
    build_dependent_css(){
        let self = this;
        let css_urls=  [`https://semantic-ui.com/dist/semantic.min.css`,
                        `https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css`
        ];
        self.tsp.HtmlTagBuilder.build_tags(css_urls);
    }
    build_outer_part(){
        let self = this;
        let html = `
                <div class="ui modal">
                  <i class="close icon"></i>
                  <div class="header">
                    Profile Picture
                  </div>
                  <div class="image content">
                    <div class="ui medium image">
                      <img src="https://semantic-ui.com/images/avatar2/large/rachel.png">
                    </div>
                    <div class="description">
                      <div class="ui header">We've auto-chosen a profile image for you.</div>
                      <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
                      <p>Is it okay to use this photo?</p>
                    </div>
                  </div>
                  <div class="actions">
                    <div class="ui black deny button">
                      Nope
                    </div>
                    <div class="ui positive right labeled icon button">
                      Yep, that's me
                      <i class="checkmark icon"></i>
                    </div>
                  </div>
                </div>
        `;
        $("body").append($(html));

    }

    events(){
        let self = this;
        let event_map ={
            "init_modal_properties": ()=>{
                $(".ui.modal").modal({ closable: true });
            }
        }

        /* initializing eventlistners by calling above event_map in a loop*/
        for (let key in event_map) {
          event_map[key]();
        }
    }
    actions(){
        let self = this;
        self.action_map = {
            "load_dialog": () => {
                $('.ui.modal').modal('show');
            },
        }
    }

    init(tsp){
        tsp.Dialog = this;
        this.tsp = tsp;
        this.build_dependent_css()
        this.actions();
        this.build_outer_part();
        this.events();
        return $.Deferred().resolve(tsp);
    }

}
