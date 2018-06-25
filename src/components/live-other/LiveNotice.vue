<template>
  <div style="overflow: hidden">
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
</template>

<script>
  export default {
    name: 'LiveNotice',
    data() {
      return {
        liveNoticeList: [],
        total:0
      }
    },
    created() {
      this.getNoticeList(1);
    },
    methods:{
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
        let href = window.location.href
        var iTop = window.screen.height; //获得窗口的垂直位置;
        var iLeft = window.screen.width; //获得窗口的水平位置;
        window.open(href.replace('#/live-notice','#/live-video'), '_blank', 'width='+iLeft+', height='+iTop+', toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no')

      }
    }
  }

</script>
<style>
  .el-table th{
    /*background:#dfe7ec*/
  }
  .el-table--enable-row-transition .el-table__body td,.el-table td, .el-table th.is-leaf{
    background: #f1f1f1;
  }
</style>

<style scoped>

  .page {
    margin-top: 20px;
  }
</style>

