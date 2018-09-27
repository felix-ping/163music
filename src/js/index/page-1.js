{
  let view={
    el:'.tab-1',
    template:`
    <h2>推荐歌单</h2> 
    <ul class="recommendLists">
      <li>
        <a href="">
          <div class="cover">
            <img alt="封面"
             src="./img/1.jpg" 
            >
            <span>62.8万</span>
          </div>
          <p>两行文字两行文字两行文字两行文字两行</p>
        </a>
      </li>
      <li>
          <a href="">
            <div class="cover">
              <img alt="封面"
               src="./img/2.jpg" 
              >
              <span>162.8万</span>
            </div>
            <p>两行文字两行文字两行文字两行文字两行</p>
          </a>
        </li>
        <li>
            <a href="">
              <div class="cover">
                <img alt="封面"
                 src="./img/3.jpg" 
                >
                <span>626.8万</span>
              </div>
              <p>两行文字两行文字两行文字两行文字两行</p>
            </a>
          </li>
          <li>
              <a href="">
                <div class="cover">
                  <img alt="封面"
                   src="./img/4.jpg" 
                  >
                  <span>5.8万</span>
                </div>
                <p>两行文字两行文字两行文字两行文字两行</p>
              </a>
            </li>
            <li>
                <a href="">
                  <div class="cover">
                    <img alt="封面"
                     src="./img/5.jpg" 
                    >
                    <span>77.6万</span>
                  </div>
                  <p>两行文字两行文字两行文字两行文字两行</p>
                </a>
              </li>
              <li>
                  <a href="">
                    <div class="cover">
                      <img alt="封面"
                       src="./img/6.jpg" 
                      >
                      <span>32.9万</span>
                    </div>
                    <p>两行文字两行文字两行文字两行文字两行</p>
                  </a>
                </li>
           
    </ul>
    <h2>最新音乐</h2> 
    <ul class="newSongs">
       
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
          <p>xxx</p>
    </ul>
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
      this.active()
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