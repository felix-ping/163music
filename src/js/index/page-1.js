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
      // this.active()
      this.bindEvents()
      this.importModual()
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
    },
    importModual(){
      let script1 = document.createElement('script')
      script1.src = './js/index/page-1-1.js'
      document.body.appendChild(script1)
      let script2 = document.createElement('script')
      script2.src = './js/index/page-1-2.js'
      document.body.appendChild(script2)
    }
  }
  controller.init(view,model)
}

