{
  let view={
    el:'.tab-3',
    template:`
    333333
    <div class="searchInput"></div>
    <ul class="searchCommand"></ul>
    `,
    render(data={}){
      $(this.el).html(data)
    }
  }
  let model={}
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.$el=$(this.view.el)
      this.bindEvents()
    },
    bindEvents(){
      window.eventHub.on('tabChange',(data)=>{
        if(data==='tabNav-3'){
          this.active()
        }else{
          this.deactive()
        }
      })
    },
    active(){
      this.view.render(this.view.template)
    },
    deactive(){
      this.view.render({})
    }
  }
  controller.init(view,model)
}