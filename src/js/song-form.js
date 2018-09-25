{
    let view={
        el:'.editWrapper',
        template:`
            <form class="edit">
                <label>歌曲
                        <input type="text" id="name" name="name" value="__name__" />
                </label>
                <label>歌手
                    <input type="text" id="singer" name="singer"  value="__singer__"/>
                </label>
                <label>链接
                    <input type="text" id="url" name="url" value="__url__" />
                </label>
                <button class="save" id="save" type='submit'>保存</button>
            </form>
        `,
        render(data={}){
            let placeholder=['name','url','singer','id']
            let html=this.template
            placeholder.map((string)=>{html=html.replace(`__${string}__`,data[string]||'')})
            $(this.el).html(html)
        },
        reset(){
            this.render({})
        }
    }
    let model={
        data:{name:'',url:'',singer:'',id:''},
        create(data){
            let Song = AV.Object.extend('Song');
            let song = new Song();
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('url',data.url);
            return song.save().then( (newSong) =>{
                let {id,attributes}=newSong
                Object.assign(this.data,{id,...attributes})
            },  (error)=> {
              console.error(error);
            });
        },
        updateData(data){
            let song = AV.Object.createWithoutData('Song', data.id);
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('url',data.url);
            return song.save().then( (response) =>{
                Object.assign(this.data,data)
                return response
            },  (error)=> {
              console.error(error);
            });
        }
    }
    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload',(data)=>{
                this.view.render(data)
            })
            window.eventHub.on('select',(songsData)=>{
                this.model.data=songsData
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
                if(this.model.data.id){
                    this.model.data={name:'',url:'',singer:'',id:''}
                }else{
                    Object.assign(this.model.data,data)
                }
            })
            window.eventHub.on('uploadDisabled',()=>{
                let el=document.getElementById('save')
                el.disabled='disabled'
            })

        },
        bindEvents(){
            $(this.view.el).on('submit','form',(e)=>{
                e.preventDefault() 
                if(this.model.data.id){
                    console.log("有")
                    this.update()
                    window.alert('保存成功!')
                }else{
                    console.log('无')
                    this.save()
                    window.alert('上传成功!')
                }   
                 
            })
              
        },
        save(){
            let needs = 'name singer url'.split(' ')
            let data ={}
            needs.map((string) => { data[string] = $(this.view.el).find(`[name="${string}"]`).val() })
            this.model.create(data).then(() => {
                this.view.reset()
                let obj = JSON.parse(JSON.stringify(this.model.data))
                window.eventHub.emit('create', obj)
            }).then(()=>{
                this.model.data.id=null
                window.eventHub.emit('uploadDisabled',{}) 
               

            })
            //这里submit应该不可用
        },
        update(){
            let needs='name singer url'.split(' ')
            let data={}
            needs.map((string)=>{
                data[string]=$(this.view.el).find(`[name="${string}"]`).val()
            })
            data.id=this.model.data.id
            this.model.updateData(data).then(()=>{
                window.eventHub.emit('update',data)
            }).then(()=>{
                this.view.reset()
                this.model.data.id=null
                window.eventHub.emit('uploadDisabled',{})  
            })
            
        }
    }
    controller.init(view,model)
}