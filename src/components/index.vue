<template>
  <div class="customerInfo">
      <div class="title"></div>

      <div class="modes">
        <div class="mode" :class="{modeSelected:tabId===index}" v-for="(item,index) in modeList" :key="item.text" @click="chooseMode(index)">
          <div class="modeBg"></div>
          <i class="icon" :class="item.iconClass"></i>
          <p>{{item.text}}</p>
        </div>
        <div class="arrow" :class="item.arrowClass" v-show="tabId===index" v-for="(item,index) in arrowList" :key="index"></div>
      </div>

      <div class="selectBox">
        <el-select
          v-model="sheng"
          @change="choseProvince"
          placeholder="省级地区">
          <el-option
            v-for="(item,index) in province"
            :key="index"
            :label="item.country_name_ch"
            :value="item.country_id">
          </el-option>       
        </el-select>

        <el-select
          v-model="shi"
          @change="choseCity"
          placeholder="市级地区">
          <el-option
            v-for="(item,index) in city"
            :key="index"
            :label="item.name_cn"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select
          v-model="operator"
          @change="choseOperator"
          placeholder="运营商">
          <el-option
            v-for="(item,index) in operatorList"
            :key="index"
            :label="item.operator_name_ch"
            :value="item.operator_id">
          </el-option>
        </el-select>
      </div>
      <el-button class="submitBtn" :plain="true" @click="query">确定</el-button>
      
  </div>
</template>

<script>
import cityJson from '../assets/js/city.js'
export default {
  name: 'index',
  data () {
    return {
      modeList:[
        {
          modeClass:'mode_summit',
          iconClass:'icon_summit',
          text:'高层峰会'
        },
        {
          modeClass:'mode_nc',
          iconClass:'icon_nc',
          text:'网络规划'
        }
      ],
      arrowList:[
        {
          arrowClass:'arrow_summit',
        },
        {
          arrowClass:'arrow_nc',
        }
      ],
      tabId:0,
      projectSubmitType:'SUBMIT',  //模式  SUBMIT、NC_PROJECT  
      province:[],
      sheng:null,
      city:[],
      shi:null,
      cityId:'',
      operatorList:[],
      operator:null,
      operatorId:'',
      homeUrl:''
    }
  },
  created(){
    this.province = cityJson.RECORDS
  },
  mounted(){
    var that = this;
    window.unb_homeurl_callback = function(result){
      console.log(result)
      // if(result.success == true){
        // this.homeUrl = result.data.homeUrl  
        that.homeUrl = 'https://www.baidu.com' 
        console.log(that.homeUrl,'66666666666')
        that.query()
      // }
    }
  },
  methods:{
    // 选省
    choseProvince(e){
      for(var i in this.province){
        if(e === this.province[i].country_id){
          this.sheng = this.province[i].country_name_ch
          this.city = this.province[i].dic_sys_city
          this.operatorList = this.province[i].dic_sys_operator
          this.shi = null
          this.operator = null
        }
      }
    },
    // 选市
    choseCity(e){
      for(var j in this.city){
        if(e === this.city[j].id){
          this.shi = this.city[j].name_cn
          this.cityId = this.city[j].id
        }
      }
    },
    // 选运营商
    choseOperator(e){
      for(var k in this.operatorList){
        if(e===this.operatorList[k].operator_id){
          this.operator = this.operatorList[k].operator_name_ch
          this.operatorId = this.operatorList[k].operator_id
        }
      }
    },
    // 选模式
    chooseMode(index){
      this.tabId = index
      if(index === 0){
        this.projectSubmitType = 'SUBMIT'
      }else if(index === 1){
        this.projectSubmitType = 'NC_PROJECT'
      }
    },
    //点击确定按钮跳转
    query(){
      this.setCookie('Language','zh_CN',30);

      sessionStorage.setItem('projectSubmitType',this.projectSubmitType)
      sessionStorage.setItem('shi',this.shi)
      sessionStorage.setItem('operator',this.operator)
      sessionStorage.setItem('homeUrl',this.homeUrl) 
      if(this.projectSubmitType == null || this.shi == null){
        this.$message({
          message:'请选择省市',
          type: 'warning',
          center:true
        })
        return false
      }
      if(this.operator == null){
        this.$message({
          message:'请选择运营商',
          type: 'warning',
          center:true
        })
        return false
      }
      if(this.projectSubmitType && this.shi && this.operator){
        this.$router.push('/cont')
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://66.huawei.com/CPProjectWebsite/three-cloud/submit/getProjectHomeUrl.action?cityId=${this.cityId}&operatorId=${this.operatorId}&sceneId=10100000&solutionId=90000139&projectSubmitType=${this.projectSubmitType}`
        document.getElementsByTagName('head')[0].appendChild(script)
        console.log(document.getElementsByTagName('head')[0])

        // this.$axios.get('http://66.huawei.com/CPProjectWebsite/three-cloud/submit/getProjectHomeUrl.action',
        // {
        //   params:{
        //     cityId:this.cityId,
        //     operatorId:this.operatorId,
        //     sceneId:10100000,
        //     solutionId:90000139,
        //     projectSubmitType:this.projectSubmitType
        //   },
        //   headers:{
        //     'Access-Control-Allow-Origin':'*'
        //   }
        // }).then((res)=>{
        //   console.log(res)
        //   if(res.success == true){
        //     let homeUrl = res.data.homeUrl
        //     sessionStorage.setItem('homeUrl',homeUrl)          
        //     this.$router.push({name:'cont',params:{projectSubmitType:this.projectSubmitType,shi:this.shi,operator:this.operator,homeUrl:homeUrl}})
        //   }
        // }).catch((err)=>{
        //   console.log(err)
        // })

        // let url = 'http://66.huawei.com/CPProjectWebsite/three-cloud/submit/getProjectHomeUrl.action'
        // let params = {
        //       cityId:this.cityId,
        //       operatorId:this.operatorId,
        //       sceneId:10100000,
        //       solutionId:90000139,
        //       projectSubmitType:this.projectSubmitType
        //     }
        // this.$jsonp(url,params).then(res => {
        //   console.log(res)
        //   if(res.success == true){
        //     let homeUrl = res.data.homeUrl
        //     sessionStorage.setItem('homeUrl',homeUrl)          
        //     this.$router.push('/cont')
        //   }
        // }).catch(err => {
        //   console.log(err)
        // })
      }
    },
    
    //设置Cookie
    setCookie(key,value,day){
      var date = new Date();
      date.setDate(date.getDate()+day);
      document.cookie = key + "=" + escape(value) + ";expires=" + date + ";path=/;domain=.huawei.com";
    },
  }

}
</script>

<style lang='less'>
  .customerInfo{
    width: 100%;
    height: 100%;
    background: url('../assets/img/bg.png') no-repeat;
    background-size: cover;
    overflow: hidden;
    position: absolute;
    .title{
      width: 99.32%;
      height: 10.37%;
      margin: 3.33% auto 0;
      background: url('../assets/img/title.png') no-repeat;
      background-size: cover;
    }
    .modes{
      width: 62.76%;
      height: 50.93%;
      margin: 2.96% auto 1.39%;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      .mode{
        width: 43.32%;
        height: 91.64%;
        position: relative;
        .modeBg{
          width: 100%;
          height: 100%;
          background: url('../assets/img/modeBg.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        i.icon{
         display: inline-block;
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         right: 0;
         margin: auto;
        }
        p{
          width: 54.02%;
          height: 12.70%;
          text-align: center;
          line-height: 1.8;
          font-size: 3.0vh;
          background: url('../assets/img/modeTextBg.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -27.01%;
        }
      }
      .mode:nth-child(1){
        float: left;
        i.icon_summit{
          width: 28.74%;
          height: 25.99%;
          background: url('../assets/img/icon-summit.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .mode:nth-child(2){
        float: right;
        i.icon_nc{
          width: 29.19%;
          height: 24.40%;
          background: url('../assets/img/icon-nc.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .modeSelected p{
        font-size: 3.6vh;
        color: #00ffff;
        line-height: 1.5;
      }
      .arrow{
        width: 111.03%;
        height: 3.09%;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -55.515%;
      }
      .arrow_summit{
        background: url('../assets/img/select_left.png') no-repeat;
        background-size: 100% 100%;
      }
      .arrow_nc{
        background: url('../assets/img/select_right.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .selectBox{
      width: 54.95%;
      height: 6.48%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .el-select{
        width: 21.99%;
        height: 100%;
        .el-input{
          height: 100%;
          position: relative;
          .el-input__inner{
            height: 100%;
            background: url('../assets/img/button_1.png') no-repeat;
            background-size: 100% 100%;
            border: none;
            color: #fff;
            font-size: 2.0vh;
            text-align: center;
            padding: 0;
            position: absolute;
            top: 0;
            left: 0;
          }
          .el-input__prefix, .el-input__suffix{
            right: 8.62%;
            width: 12.08%;
            .el-input__suffix-inner{
              width: 100%;
              height: 100%;
              display: block;
              i.el-select__caret{
                width: 100%;
                font-size: 1.4vh;
                height: 100%;
                display: block;
                line-height: 100%;
              }
            }
          }
        }
      }
    }
    .submitBtn{
      position: absolute;
      bottom: 5.96%;
      right: 3.90%;
      width: 9.0%;
      height: 5.28%;
      text-align: center;
      font-size: 3.0vh;
      background: url('../assets/img/button_2.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .el-button{
      border:none;
      padding: 0;
    }
    .el-button.is-plain:focus, 
    .el-button.is-plain:hover{
      background: url('../assets/img/button_2.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .el-select-dropdown{
    border: none !important;
    background-color: transparent !important;
    background: url('../assets/img/optionBg.png') no-repeat;
    background-size: 100% 100%;
    .el-select-dropdown__list{
      height: 19.91%;
      .el-select-dropdown__item{
        height: 19.07%;
        span{
          font-size: 1.4vh;
        }
      }
      .el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background: url('../assets/img/selectedBg.png') no-repeat;
        background-size: 100% 100%;
      }
    } 
    .popper__arrow{
      display: none !important;
    }
  }

</style>
