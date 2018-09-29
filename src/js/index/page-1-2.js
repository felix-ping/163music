{
  let view={
    el:'.newSongs',
    template:`
      <a href="./song.html?id={{id}}">
        <li class="songItem">
          <div class="wrapper">
            <div class="songWrapper">
              <div class="songName">{{name}}</div>
              <div class="songMsg"><i></i> {{singer}}</div>
            </div>
            <div class="songPlay"><span>x</span></div>
          </div>
        </li>
      </a>
    `,
    render(data = {}) {
      let songs = data
      songs.map(song => {
        let $li = $(this.template.replace('{{name}}', song.name)
        .replace('{{singer}}', song.singer).replace('{{id}}', song.id))
        $(this.el).append($li)
      })
    }
  }
  let model={
    data:{
      songs:[],
    },
    find() {   
      var query = new AV.Query('Song');
      return query.find().then(
          (songs) => {         
              this.data.songs=songs.map((song) => {
                  return { id: song.id, ...song.attributes }
              })    
              return songs           
          }
          
      ).then( (todos)=> {
          // 更新成功
      }, (error)=> {
          // 异常处理
      });
  },
  }
  let controller={
    init(view,model){
      this.view=view
      this.model=model
      this.$el=$(this.view.el)
      this.getSongLists()
    },
    getSongLists(){
      this.model.find().then(()=>{
        this.view.render(this.model.data.songs)
      })
    }
  }
  controller.init(view,model)
}