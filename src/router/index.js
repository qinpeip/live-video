import Vue from 'vue'
import Router from 'vue-router'
import video from '@/components/live-video/video'
import liveHistory from '@/components/live-other/LiveHistory'
import LiveNotice from '@/components/live-other/LiveNotice'
import app from '../App'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/live-notice',
      component: app,
      children: [
        {
          path: '/live-history',
          name: 'liveHistory',
          component: liveHistory
        },
      {
        path: '/live-notice',
        name: 'LiveNotice',
        component: LiveNotice
      }
      ]
    },
    {
      path: '/live-video',
      name: 'video',
      component: video
    },
  ]
})
