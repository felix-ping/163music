{
    let view={
        el:'.songListWrapper',
        template:`
        <ul class="songsList">
            <li class='active'>后来</li>
            <li>遇见</li>
        </ul>
        `,
        render(data){
            $(this.el).html(this.template)
            let {songs}=data
            let liList=songs.map((song)=>{
                return $('<li></li>').text(song.name).attr('song-id',song.id)
            })
            let $el=$(this.el)
            $el.find('ul').empty()
            liList.map((domLi)=>{
                $el.find('ul').append(domLi)
            })
        },
        activeItem(li){
            $(li).addClass('active').siblings('.active').removeClass('active')
        },
        removeActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: { songs: [] },
        find() {
            var query = new AV.Query('Song');
            return query.find().then(
                (songs) => {
                    this.data.songs=songs.map((song) => {
                        return { id: song.id, ...song.attributes }
                    })
                    return songs
                }
            ).then(function (todos) {
                // 更新成功
            }, function (error) {
                // 异常处理
            });
        },
   
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
            this.bindEvents()
            window.eventHub.on('upload',()=>{
                this.view.removeActive()
            })
            window.eventHub.on('new',()=>{
                this.view.removeActive()
            })
            window.eventHub.on('create',(songData)=>{
                this.model.data.songs.push(songData)   
                this.view.render(this.model.data)
            })
            // window.eventHub.on('show',()=>{
            //    // xxx.show//////////////////////
            // })
            window.eventHub.on('update',(data)=>{
                let equal=this.model.data.songs
                for(let i=0; i<equal.length;i++){
                    if(  equal[i].id===data.id){
                        Object.assign(equal[i],data)
                    }
                }
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)
                let songId=e.currentTarget.getAttribute('song-id')
                let songs=this.model.data.songs
                let data
                for (let i=0;i<songs.length;i++){
                    if(songs[i].id===songId){
                        data=songs[i]
                        break
                    }
                }
                let songsData=JSON.parse(JSON.stringify(data))
                window.eventHub.emit('select',songsData)
            })
        }

    }
    controller.init(view,model)
}