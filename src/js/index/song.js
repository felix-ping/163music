{
  let view={
    el:'.PlaySong',
    template:`
      <div class="player">
        <audio src="{{url}}"></audio>
        <button class="play">播放</button>
        <button class="pause">暂停</button>
      </div>
    `,
    render(data={}){
      console.log(data)
      $(this.el).html(this.template.replace('{{url}}',data.url))
    },
    play(){
      let audio=$(this.el).find('audio')[0]
      audio.play()
    },
    pause(){
      let audio=$(this.el).find('audio')[0]
      audio.pause()
    }
  }
  let model={
    data:{
      id:''
    }
  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.$el=$(this.view.el)
      this.getSongId()
      this.bindEvents()
    },
    bindEvents(){
      $(this.view.el).on('click','.play',()=>{
        this.view.play()
      })
      $(this.view.el).on('click','.pause',()=>{
        this.view.pause()
      })
    },
    getSongId(){
      let search=window.location.search
      if(search.indexOf('?')===0){
        search=search.substring(1)
      }
      let array=search.split('&').filter(v=>v)
      let id=''
      for(let key of array){
        let kv=key.split('=')
        let newKey=kv[0]
        let newValue=kv[1]
        if(newKey==='id'){
          this.model.data.id=newValue
        }
      }
      this.getSong(this.model.data.id).then(()=>{
        this.view.render(this.model.data)
      })
    },
    getSong(id){
      var query = new AV.Query('Song');
      return query.get(id).then((song)=> {
        Object.assign(this.model.data,{id:song.id,...song.attributes})
        return song
      }, function (error) {
        // 异常处理
      });
    }
  }
  controller.init(view,model)
}
