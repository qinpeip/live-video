<template>
  <div>
    <el-container>
      <el-header style="height: 100%;margin-top:25px;">
        <el-row>
          <el-col :span="6" style="float:right;">
            <el-input size="small" style="margin-bottom:0" @keyup.enter.native="getHistoryData(1)" v-model="searchName"
                      placeholder="搜索课程">
              <el-button slot="append" icon="el-icon-search" @click="searchHistory"></el-button>
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <div style="margin-top: 20px">
            <el-tag type="success" size="medium" style="float: left;vertical-align: center;margin-right: 10px;">产品类型
            </el-tag>
            <el-radio-group @change="liveTypeChange" v-model="historyTypeChecked" size="mini">

              <el-radio-button v-if="historyType.length" v-for="item in historyType" style="margin-left:5px;border: 1px solid #dcdfe6;" :label="item.Id" :key="item.Id">{{item.Name}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-row>
        <el-row>
          <div style="margin-top: 10px">
            <el-tag type="success" size="medium"
                    style="margin:5px 0 0 0;float: left;vertical-align: center;margin-right: 10px;">程序页面
            </el-tag>
            <el-checkbox-group @change="programPageSelectedChange" v-model="programPageChecked" size="mini">
              <el-checkbox-button style="margin:5px 5px 0 0;border-radius: 5px;border: 0.5px solid #dcdfe6; "
                                  v-for="item in programingPage" :label="item.Id" :key="item.Id">{{item.Name}}
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-row>


        <hr>
      </el-header>
      <el-main>
        <el-table :data="liveHistoryList" v-loading="loading" border >
          <el-table-column type="index" width="70" label="序号" ></el-table-column>
          <el-table-column prop="Name" label="视频名称" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="LiveType" label="产品类型" width="350"></el-table-column>
          <el-table-column prop="PageName" label="程序页面" width="350"></el-table-column>
          <el-table-column prop="Url" label="视频地址" width="200">
            <template slot-scope="scope">
              <a :href="scope.row.Url" target="_blank">
                <el-button size="small" type="primary">观看</el-button>
              </a>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "LiveHistory",
    data() {
      return {
        liveHistoryList: [],
        total: 0,
        loading: false,
        searchName: "",
        historyType: [],
        historyTypeChecked: [],
        programingPage: [],
        programPageChecked: []
      }
    },
    created() {
      this.getHistoryData(1);
      this.getHistoryType();
    },
    methods: {
      pagination(val) {
          if(this.programPageChecked.length>0){
            this.queryHistoryData(val,this.programPageChecked);
          }else{
            this.getHistoryData(val);
            }

      },
      getHistoryData(currentPage) {
        var url = `/live/GetLivehistorylist?currentIndex=${currentPage}&pagesize=10` + (this.searchName.length > 0 ? `&name=${encodeURI(this.searchName)}` : "");
        this.loading = true;
        this.$ajax.get(url).then(response => {
            this.total = response.data.Total;
            this.liveHistoryList = response.data.List;
            this.loading = false;
          })
      },
      queryHistoryData(currentPage, selected) {
        if (selected.length == 0) return this.getHistoryData(1);
        var url = "/live/QueryHistoryType";
        this.loading = true;
        var body = {
          currentIndex: currentPage,
          pageSize: 10,
          selected: selected
        }
        this.$ajax.post(url, body).then(response => {
            var data = JSON.parse(response.data);
            this.total = data.Total;
            this.liveHistoryList = data.List;
            this.loading = false;
          })
      },
      searchHistory() {
        this.clearTagData();
        if (!this.searchName) return this.getHistoryData(1);
        this.getHistoryData(1)
      },
      getHistoryType() {
        var url = "/live/GetLiveHistoryType"
        this.$ajax.get(url).then(response => {
            this.historyType = response.data;
            this.programingPage = response.data.LiveHistoryProgramPage;
          })
      },
      liveTypeChange(selected) {
        this.programPageChecked = [];
        this.programingPage = this.historyType.filter(r => r.Id == selected)[0].pages
      },
      programPageSelectedChange(selected) {
        this.queryHistoryData(1, selected);
      },
      clearTagData() {
        this.historyTypeChecked = [];
        this.programingPage = [];
        this.programPageChecked = [];
      }
    }
  }
</script>
<style>
  .el-table th{
    background:#dfe7ec
  }
</style>
<style scoped>

</style>
