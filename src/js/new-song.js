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
            this.view.active()
            this.bindEvents()
            window.eventHub.on('upload',(data)=>{
                this.view.active()
            })
            window.eventHub.on('select',(data)=>{
                this.view.deactive()
            })
            window.eventHub.on('new',()=>{
                let el =document.getElementById('save')
                el.disabled=false
            })
        },
        bindEvents(){
            $(this.view.el).on('click',(e)=>{
                this.view.active()
                window.eventHub.emit('new',{})
                window.eventHub.emit('show','upload')
            })
        }
    }
    controller.init(view,model)
}