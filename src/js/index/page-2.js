{
  let view={
    el:'.tab-2',
    template:`
    tab-2
    <div class="hotImg"></div>
        <ul class="hotLists"></ul>
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
        if(data==='tabNav-2'){
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