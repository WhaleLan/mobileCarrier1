<template>
  <div class="contInfo">
      <div class="cont">
        <!-- 首页传递的homeUrl-->
        <iframe :src="homeUrl" frameborder="0" width="100%" height="100%" v-if="homeUrl"></iframe>
        
        <!-- NC -->
        <!--2.3.1 业务流量智能仿真 -->
        <iframe src="http://uat-expcloud.huawei.com/exp/NCE_BPSimulation/#/NetworkloadPage" frameborder="0" width="100%" height="100%" v-if="projectSubmitType=='NC_PROJECT'&&serialNum=='2.3.1'"></iframe>
        <!--2.3.2 E2E业务自动发放 -->
        <iframe src="http://uat-expcloud.huawei.com/exp/NCE_E2EProvision/#/ProvisionPage" frameborder="0" width="100%" height="100%" v-if="projectSubmitType=='NC_PROJECT'&&serialNum=='2.3.2'"></iframe>
        <!--2.3.3 智能化网络健康分析 -->
        <iframe src="http://uat-expcloud.huawei.com/exp/NCE_NetHealthInsight/#/BaseinsightPage" frameborder="0" width="100%" height="100%" v-if="projectSubmitType=='NC_PROJECT'&&serialNum=='2.3.3'"></iframe>
        <!--2.3.4 智能化网络利用率优化 -->
        <iframe src="http://uat-expcloud.huawei.com/exp/NCE_BBUtilization/#/UtilizationbeforePage" frameborder="0" width="100%" height="100%" v-if="projectSubmitType=='NC_PROJECT'&&serialNum=='2.3.4'"></iframe>
        <!--2.3.5 4G/5G 融合共管 -->
        <iframe src="http://expcloud.huawei.com/exp/expLayout/#/modules/layout/viewLayout?itemId=3499&layoutId=c9b7bbd8-a977-298c-e043-6e8f130aae0d&templateId=0&hasHeader=0" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='NC_PROJECT'&&serialNum=='2.3.5'"></iframe>

        <iframe src="https://www.baidu.com" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='NC_PROJECT'&&serialNum=='2.3'"></iframe>




        <!-- Summit -->
        <!--4.1 业务流量智能仿真 -->
        <iframe src="http://expcloud.huawei.com/exp/expLayout/#/modules/layout/viewLayout?itemId=3563&layoutId=7c5b8f6e-f18b-3d39-5a08-86a8104b16ea&templateId=0&hasHeader=0" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='SUBMIT'&&serialNum=='4.1'"></iframe>
        <!--4.2 E2E业务自动发放 -->
        <iframe src="http://expcloud.huawei.com/exp/expLayout/#/modules/layout/viewLayout?itemId=3565&layoutId=5378ebc1-9253-132b-885f-547ab666828d&templateId=0&hasHeader=0" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='SUBMIT'&&serialNum=='4.2'"></iframe>
        <!--4.3 智能化网络健康分析 -->
        <iframe src="http://expcloud.huawei.com/exp/expLayout/#/modules/layout/viewLayout?itemId=3567&layoutId=f1601e4d-e984-2f57-c79f-81bf6e21ae3a&templateId=0&hasHeader=0" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='SUBMIT'&&serialNum=='4.3'"></iframe>
        <!--4.4 智能化网络利用率优化 -->
        <iframe src="http://expcloud.huawei.com/exp/expLayout/#/modules/layout/viewLayout?itemId=3569&layoutId=1cceea79-eb84-6b2e-02c7-c07eaa9fc101&templateId=0&hasHeader=0" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='SUBMIT'&&serialNum=='4.4'"></iframe>
        <!--4.5 4G/5G 融合共管 -->
        <iframe src="http://expcloud.huawei.com/exp/expLayout/#/modules/layout/viewLayout?itemId=3499&layoutId=c9b7bbd8-a977-298c-e043-6e8f130aae0d&templateId=0&hasHeader=0" frameborder="0" width="100%" height="970" v-if="projectSubmitType=='SUBMIT'&&serialNum=='4.5'"></iframe>
        
        
        
        
        <div class="list_wrap" ref="list_wrap">
          <div class="list">

            <div class="listHead"><span>{{shi}}{{operator}}</span></div>
            
            <div class="tree" v-if="modeShow">
              <div class="item" v-for="(item,index) in itemList_NC" :key="index" @click="itemListClick(itemList_NC,item)">
                <div class="itemTitle">
                  <b class="serialNum">{{item.num}}</b>
                  <span class="title">{{item.title}}</span>
                  <i class="treeHide" v-if="item.treeShow"></i>
                  <i class="treeShow" v-else></i>
                </div>
                <el-tree 
                  :data="item.ncData" 
                  :props="defaultProps" 
                  :accordion="true"
                  @node-click="handleNodeClick" 
                  class="elTree"
                  v-show="item.treeShow">
                </el-tree>
              </div>
            </div>

            <div class="tree" v-else>
              <div class="item" v-for="(item,index) in itemList_Summit" :key="index" @click="itemListClick(itemList_Summit,item)">
                <div class="itemTitle">
                  <b class="serialNum">{{item.num}}</b>
                  <span class="title">{{item.title}}</span>
                  <i class="treeHide" v-if="item.treeShow"></i>
                  <i class="treeShow" v-else></i>
                </div>
                <el-tree 
                  :data="item.summitData" 
                  :props="defaultProps"
                  :accordion="true"
                  @node-click="handleNodeClick" 
                  class="elTree"
                  v-show="item.treeShow">
                </el-tree>
              </div>
            </div>
            <router-link to="/" class="home">
              <i class="icon_home"></i>
              <span>首页</span>
            </router-link>
          </div>

          <div class="expand" @click="listExpand" v-if="listStatus"></div>
          <div class="indent" @click="listIndent" v-else></div>
        </div>
        
      </div>

  </div>
</template> 

<script>
export default {
  name: 'cont',
  data () {
    return {
      homeUrl:'',  //首页传递的链接地址
      projectSubmitType:'',  //模式
      shi:'',    //城市
      operator:'',  //运营商
      listStatus:true,    //列表状态  true 显示》》  false 隐藏《《
      modeShow:true,  //true--NC模式   false--Summit模式
      defaultProps:{
        label:'label',
        children:'children'
      },

      itemList_NC:[  //tree-----NC
        {
          num:1,
          title:'4G承载体验领先',
          ncData:[
            {
              label:'1.1 4G业务体验洞察'
            },
            {
              label:'1.2 承载网现网洞察',
              children:[
                {
                  label:'1.2.1 网络KPI'
                },
                {
                  label:'1.2.2 网络KQI'
                }
              ]
            },
            {
              label:'1.3 流量叠加预测'
            },
            {
              label:'1.4 网络规则',
              children:[
                {
                  label:'1.4.1 拓扑规则'
                },
                {
                  label:'1.4.2 容量规划'
                },
                {
                  label:'1.4.3 目标匹配度仿真'
                }
              ]
            }
          ],
          treeShow:false
        },
        {
          num:2,
          title:'5G承载随需建网',
          ncData:[
            {
              label:'2.1 5G承载精准规划',
              children:[
                {
                  label:'2.1.1 看5G目标网需求'
                },
                {
                  label:'2.1.2 看承载网现网',
                  children:[
                    {
                      label:'2.1.2.1 看无线规则'
                    },
                    {
                      label:'2.1.2.2 看基础资源匹配度'
                    },
                    {
                      label:'2.1.2.3 看承载网匹配度'
                    }
                  ]
                },
                {
                  label:'2.1.3 现网演进方案'
                },
                {
                  label:'2.1.4 新建网方案'
                },
                {
                  label:'2.1.5 目标方案对比',
                  children:[
                    {
                      label:'2.1.5.1 业务满足度'
                    },
                    {
                      label:'2.1.5.2 设备安装工程量'
                    },
                    {
                      label:'2.1.5.3 成本（TCO）'
                    }
                  ]
                },
              ]
            },
            {
              label:'2.2 5G承载按需建设',
              children:[
                {
                  label:'2.2.1 网络架构'
                },
                {
                  label:'2.2.2 容量规划'
                },
                {
                  label:'2.2.3 看目标网匹配度'
                },
                {
                  label:'2.2.4 多场景覆盖',
                  children:[
                    {
                      label:'2.2.4.1 宏站场景'
                    },
                    {
                      label:'2.2.4.2 杆微站场景'
                    },
                    {
                      label:'2.2.4.3 室分场景'
                    },
                    {
                      label:'2.2.4.4 前传场景'
                    }
                  ]
                },
                {
                  label:'2.2.5 站点演进升级过程'
                },
                {
                  label:'2.2.6 设备类型及能力介绍'
                },
                {
                  label:'2.2.7 华为领先'
                }
              ]
            },
            {
              label:'2.3 5G承载智能维护',
              children:[
                {
                  label:'2.3.1 业务流量智能仿真'
                },
                {
                  label:'2.3.2 E2E业务自动发放'
                },
                {
                  label:'2.3.3 智能化网络健康分析'
                },
                {
                  label:'2.3.4 智能化网络利用率优化'
                },
                {
                  label:'2.3.5 4G/5G 融合共管'
                }
              ]
            }
          ],
          treeShow:false
        }
      ],

      itemList_Summit:[ //tree-----Summit
        {
          num:1,
          title:'业务发展洞察',
          summitData:[
            {
              label:'1.1 4G业务体验洞察'
            },
            {
              label:'1.2 5G业务洞察'
            },
            {
              label:'1.3 5G目标网'
            }
          ],
          treeShow:false
        },
        {
          num:2,
          title:'5G承载精准规划',
          summitData:[
            {
              label:'2.1 5G匹配度评估'
            },
            {
              label:'2.2 建网方案总览',
              children:[
                {
                  label:'2.2.1 演进'
                },
                {
                  label:'2.2.2 新建'
                }
              ]
            },
            {
              label:'2.3 TCO分析'
            }
          ],
          treeShow:false
        },
        {
          num:3,
          title:'5G承载随需建设',
          summitData:[
            {
              label:'3.1 扩容落地方案'
            },
            {
              label:'3.2 新建落地方案'
            },
            {
              label:'3.3 多场景覆盖'
            },
            {
              label:'3.4 站点演进升级扩容'
            },
            {
              label:'3.5 设备类型及能力介绍'
            },
            {
              label:'3.6 华为领先'
            }
          ],
          treeShow:false
        },
        {
          num:4,
          title:'5G承载智能维护',
          summitData:[
            {
              label:'4.1 业务流量智能仿真'
            },
            {
              label:'4.2 E2E业务自动发放'
            },
            {
              label:'4.3 智能化网络健康分析'
            },
            {
              label:'4.4 智能化网络利用率优化'
            },
            {
              label:'4.5 4G/5G 融合共管'
            }
          ],
          treeShow:false
        },
      ],
      serialNum:''    //label 列表序列号
    }
  },
  created(){
    this.homeUrl = sessionStorage.getItem('homeUrl')
    this.projectSubmitType = sessionStorage.getItem('projectSubmitType')
    this.shi = sessionStorage.getItem('shi')
    this.operator = sessionStorage.getItem('operator').substr(2,2)
    console.log(this.homeUrl)
    console.log(this.projectSubmitType)
    console.log(this.shi)
    console.log(this.operator)

    if(this.projectSubmitType === 'NC_PROJECT'){
      this.modeShow = true
    }else if(this.projectSubmitType === 'SUBMIT'){
      this.modeShow = false
    }
  },
  mounted() {

  },
  methods:{
    //获取元素样式兼容 
    getStyleAttr(obj,attr){
      if(obj.currentStyle){
        return obj.currentStyle[attr];
      }else{
        return window.getComputedStyle(obj)[attr];
      }
    },
    //列表显示/隐藏
    listAnimate(obj,attr,endValue,time){
      var that = this;
      clearInterval(obj.timer);
      obj.timer = setInterval(function(){
        var speed = (endValue - parseInt(that.getStyleAttr(obj,attr))) / time;
        speed = speed > 0 ? Math.floor(speed) : Math.ceil(speed);
        if(speed == 0){
          clearInterval(obj.timer);
          obj.style[attr] = endValue + "%";
          return false;
        }
        obj.style[attr] = parseInt(that.getStyleAttr(obj, attr)) + speed + "px";
      },100)
    },
    //列表展开》》》
    listExpand(){
      this.listAnimate(this.$refs.list_wrap,'left',0,4)
      setTimeout(() => {
        this.listStatus = false;
      }, 2500);
    },
    //列表隐藏《《《
    listIndent(){
      this.listAnimate(this.$refs.list_wrap,'left',-18.07,4)
      setTimeout(() => {
        this.listStatus = true;
      }, 900);
    },
    //tree label点击事件
    handleNodeClick(data){
      this.serialNum = data.label.split(' ')[0]; 
    },
    //点击list的item，其他item关闭
    itemListClick(arr,item){
      // for(let i=0;i<arr.length;i++){
      //   arr[i].treeShow = false;
      // }
      // item.treeShow = true;
      item.treeShow = !item.treeShow
    },
  }
}
</script>

<style lang='less'>
  .contInfo{
    width: 100%;
    height: 100%;
    background: url('../assets/img/bg.png') no-repeat;
    background-size: cover;
    overflow: hidden;
    position: absolute;
    .cont{
      width: 100%;
      height: 100%;
      position: relative;
      .list_wrap{
        position: absolute;
        top: 7.035%;
        left: -18.07%;
        width: 18.07%;
        height: 85.93%;
        .list{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('../assets/img/listBg.png') no-repeat;
          background-size: 100% 100%;
          .listHead{
            width: 100%;
            height: 8.62%;
            line-height: 2;
            background: url('../assets/img/listHeadBg.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 3.0vh;
            box-shadow: 0 2px 10px #060606;
            overflow: hidden;
            span{
              position: relative;
              display: block;
              white-space: nowrap;
            }
            span::before,
            span::after{
              content: '';
              width: 26.51%;
              height: 3px;
              position: absolute;
              top: 50%;
              margin-top: -1.5px;
            }
            span::before{
              left: -4.32%;
              background: url('../assets/img/line_before.png') no-repeat;
              background-size: 100% 100%;
            }
            span::after{
              background: url('../assets/img/line_after.png') no-repeat;
              background-size: 100% 100%;
              right: -4.32%;
            }
          }
          .tree{
            width: 100%;
            height: 86.64%;
            padding-top: 7.09%;
            overflow-y: auto;
            .item{
              width: 87.61%;
              margin: 0 auto 5.84%;
              .itemTitle{
                width: 100%;
                height: 7.34%;
                line-height: 3;
                background: url('../assets/img/listItemTitleBg.png') no-repeat;
                background-size: 100% 100%;
                padding-left: 23.03%;
                position: relative;
                font-size: 2.0vh;
                cursor: pointer;
                b{
                  position: absolute;
                  top: 17.755%;
                  left: 6.58%;
                  width: 13.49%;
                  height: 69.49%;
                  line-height: 2;
                  text-align: center;
                  background: url('../assets/img/serialNumBg.png') no-repeat;
                  background-size: 100% 100%;
                }
                span.title{
                  display: block;
                  width: 82.50%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                i{
                  position: absolute;
                  top: 36.44%;
                  right: 7.89%;
                  width: 9.21%;
                  height: 27.12%;
                }
                i.treeHide{
                  background: url('../assets/img/triangle_top.png') no-repeat;
                  background-size: 100% 100%;
                }
                i.treeShow{
                  background: url('../assets/img/triangle_bottom.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
              .elTree{
                width: 100%;
                height: auto;
                background: none;
                .el-tree-node__content{
                  background: none;
                  span.el-tree-node__label{
                    font-size: 1.4vh;
                  }
                }
                .el-tree-node__content:hover{
                  span.el-tree-node__label{
                    color: #00ffff;
                  } 
                }
              }
            }
          }
          /*滚动条样式*/
          .tree::-webkit-scrollbar {/*滚动条整体样式*/ 
              width: 6.92%;     /*高宽分别对应横竖滚动条的尺寸*/
          }
          .tree::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              background: url('../assets/img/scrollBar.png') repeat-y;
          }
          .tree::-webkit-scrollbar-track {/*滚动条里面轨道*/
              background: url('../assets/img/scrollBarBg.png') no-repeat;
          }
          .home{
            display: block;
            width: 100%;
            height: 4.74%;
            line-height: 1.6;
            background: url('../assets/img/homeBg.png') no-repeat; 
            background-size: 100% 100%;
            text-align: center;
            font-size: 0;
            box-shadow: 0 -2px 10px #060606;
            i.icon_home{
              display: inline-block;
              vertical-align: middle;
              width: 6.92%;
              height: 24px;
              height: 54.55%;
              background: url('../assets/img/icon_home.png') no-repeat;
              background-size: 100% 100%;
              margin-right: 2.88%;
            }
            span{
              font-size: 2.4vh;
              vertical-align: middle;
            }
          }
        }
        .expand,.indent{
          width: 14.70%;
          height: 38.90%;
          position: absolute;
          top: 30.55%;
          right: -14.70%;
          cursor: pointer;
        }
        .expand{
          background: url('../assets/img/btn_expand.png') no-repeat;
          background-size: 100% 100%;
        }
        .indent{
          background: url('../assets/img/btn_indent.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      iframe{
        position:absolute;
        top:0;
        left:0;
      }
    }
  }

</style>
