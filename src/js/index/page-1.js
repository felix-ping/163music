{
  let view={
    el:'.tab-1',
    template:`
    
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
        if(data==='tabNav-1'){
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