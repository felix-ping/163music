{
    let view={
        el:'.newSong',
        template:`
        新建歌曲`,
        render(){
            $(this.el).html(this.template)
        },
        active(){
            $(this.el).addClass('active')
         
        },
        deactive(){
            $(this.el).removeClass('active')
        }
    }
    let model={data:{}}
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render()
            this.bindEvents()
            window.eventHub.on('upload',(data)=>{
                this.view.active()
            })
            window.eventHub.on('select',(data)=>{
                this.view.deactive()
            })
        },
        bindEvents(){
            $(this.view.el).on('click',(e)=>{
                this.view.active()
                window.eventHub.emit('new',{})
                // window.eventHub.emit('show',{})
            })
        }
    }
    controller.init(view,model)
}