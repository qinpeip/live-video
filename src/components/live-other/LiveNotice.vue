﻿<template>
  <div style="overflow: hidden;height: 100%;">
    <div v-if="showLiveVideo">
      <el-row style="text-align:center;color:#324357;margin-top:5px;height:4%;">
        <h1>在线直播培训</h1>
      </el-row>
      <hr>
      <el-row style="height:95%">
        <el-col :span="8">
          <el-row>
            <div style="padding: 0px 10px 10px 10px;">
              <img src="../../assets/wlkc.jpg" width="100%"  alt="">
            </div>
          </el-row>
        </el-col>
        <el-col :span="16" style="padding-right:15px">
          <el-table :data="liveNoticeList"
                    style="width: 100%;"  v-loading="loading"  >

            <el-table-column prop="LiveTime" label="" width="300" >
              <template slot-scope="scope">
                <span v-if="scope.row.LiveStatus==40" style="color:rgba(35, 183, 254, 1)"><img src="../../assets/linux-live.gif" style="padding-right:30px;top:3px;position:relative;left:10px;" />直播中</span>
                <span v-else><img src="../../assets/stp.png" style="padding-right:30px;top:3px;position:relative"/>{{scope.row.LiveTime}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="Content" label="直播内容" :show-overflow-tooltip="true" >
            </el-table-column>
            <el-table-column prop="IsEnd" width="180">
              <template slot-scope="scope">
                <el-button type="success" v-if="scope.row.LiveStatus==40" round size="mini"
                           @click="jumpLiveVideo">进入直播间
                </el-button>
                <el-button @click="subscribe(scope.row.CurrentMember == scope.row.MaxMember)" type="primary"
                           v-if="scope.row.LiveStatus == 10 && scope.row.IsSubscribe" size="mini" round
                            :disabled="scope.row.CurrentMember == scope.row.MaxMember">
                    {{scope.row.CurrentMember == scope.row.MaxMember ? "预约已满" : "预约"}}
                </el-button>
                <!--<el-tag v-if="!scope.row.IsEnd"  type="success" style="cursor: pointer;margin-left:40px">进入直播间</el-tag>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="10"
              @current-change="pagination">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else style="height: 100%;">
      <liveVideo @togglePage="togglePage"></liveVideo>
    </div>
    <div id="promDiv" style="background:rgba(0,0,0,.8);width:100%;height:100%;position:absolute;top:0;right:0;left:0;bottom:0;margin:auto;z-index:9999;display:none">

          <p style="width:40%;height:90%;margin:auto;margin-top:2%">
          <img src="../../assets/prompt.png" style="height:100%;width:100%;margin-top:20px;margin-bottom:20px;margin:0 auto">
          </p>

    </div>
  </div>
</template>

<script>
  import liveVideo from '@/components/live-video/video.vue'
  export default {
    name: 'LiveNotice',
    data() {
      return {
        liveNoticeList: [],
        total:0,
        showLiveVideo: true,
        loading:false
      }
    },
    created() {
      this.$ajax.post("/live/login").then(res => {
        this.getNoticeList(1);
      })
    },
    methods:{
      togglePage () {
        this.showLiveVideo = true
      },
      getNoticeList(currentPage) {
        this.loading = true;
        this.$ajax
          .get(`/live/GetLiveNoticeList?currentIndex=${currentPage}&pagesize=10`)
          .then(response => {
            this.liveNoticeList=response.data.List;
            this.total=response.data.Total;
            this.loading = false;
          })
      },
      pagination(currentPage){
        this.getNoticeList(currentPage);
      },
      jumpLiveVideo() {
        this.$ajax.post("/live/IsReservationUser").then(res => {
         if(res.data.data){
           this.showLiveVideo = false

           let href = window.location.href
           var iTop = window.screen.height; //获得窗口的垂直位置;
           var iLeft = window.screen.width; //获得窗口的水平位置;
         }
         else{
           this.$message.error('抱歉，该直播需要提前预约才可参与！');
         }
        })
        /*this.showLiveVideo = false

        let href = window.location.href
        var iTop = window.screen.height; //获得窗口的垂直位置;
        var iLeft = window.screen.width; //获得窗口的水平位置;*/
//        this.$router.push({path: '/live-video'})
//        window.open(href.replace('#/live-notice','#/live-video?r='+Math.random()), '_href', 'width='+iLeft+', height='+iTop+', toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no,left=0,top=0', false)

      },
      subscribe(isFull){
        if(isFull) return false;
        this.$ajax.post("/live/SubscribeUser").then(res=>{
          if(res.data.errorCode == 0){
            this.$message({
              message:"恭喜您预约成功！",
              type:"success"
            });
          }
          else if(!res.data.success){
            this.$message.error(res.data.message);
          }
        });
      }
    },
    components: {
      liveVideo
    }
  }

</script>
<style>
  .el-table th{
    /*background:#dfe7ec*/
  }
  .el-table--enable-row-transition .el-table__body td,.el-table td, .el-table th.is-leaf{
    background-color: #f1f1f1;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    color: #409eff;
  }
  .el-table--enable-row-hover .el-table__body:hover{
    border-left:2px solid #409eff;
  }
</style>

<style scoped>

  .page {
    margin-top: 20px;
  }
</style>

