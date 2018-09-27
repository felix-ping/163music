{
  let view={
    el:'.topNavigation',
    // template:`
    // `
  }
  let model={

  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.$el=$(this.view.el)
      this.bindEventHub(this.$el)
    },
    bindEventHub(el){
      this.$el.on('click','li',(e)=>{
        let $li=$(e.currentTarget)
        let attr=$li.attr('data-tab-nav')
        $li.addClass('active').siblings().removeClass('active')
        window.eventHub.emit('tabChange',attr)
      })
    }

  }
  controller.init(view,model)
}