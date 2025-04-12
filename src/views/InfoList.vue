<template>
    <van-pull-refresh class="refresh" v-model="loading" @refresh="onRefresh">
        <template #pulling>
            <span class="loading-text">下拉即可刷新...</span>
        </template>

        <!-- 释放提示 -->
        <template #loosing>
            <span class="loading-text">释放即可刷新...</span>
        </template>

        <!-- 加载提示 -->
        <template #loading>
            <span class="loading-text">加载中...</span>
        </template>

        <div class="container">
            <div class="data-list" v-if="columns.length === 0">
                <span class="empty-text">暂无数据~</span>
            </div>

            <template v-else>
                <van-list v-model:loading="dropLoading" v-model:finished="dropFinished" finished-text="没有更多了"
                    class="drop-list" @load="onDrop">
                    <template #default>
                        <div class="data-list">
                            <div v-for="(item, index) in evenColumns" :key="item.id" class="column">
                                <template v-if="item.type === 'customer'">
                                    <div class="card">
                                        <div class="card-title">优质用户推荐</div>
                                        <div v-for="customer in item.list" class="customer-container">
                                            <img :src="customer.avatar" class="customer-avatar">
                                            <div class="customer-info">
                                                <span class="customer-name">{{ customer.auth }}</span>
                                                <span class="customer-remark">{{ customer.notes }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <video :key="item.id" v-if="item.type === 'video'" controls>
                                        <source :src="item.url" type="video/mp4">
                                    </video>
                                    <img v-else :src="item.url" alt="post image">

                                    <h3 class="notes">{{ item.notes }}</h3>
                                    <span class="node-desc">{{ item.desc }}</span>
                                    <div class="user-info">
                                        <img :src="item.avatar" class="avatar">
                                        <span>{{ item.auth }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="data-list">
                            <div v-for="(item, index) in oddColumns" :key="item.id" class="column">
                                <template v-if="item.type === 'customer'">
                                    <div class="card">
                                        <div class="card-title">优质用户推荐</div>
                                        <div v-for="customer in item.list" class="customer-container">
                                            <img :src="customer.avatar" class="customer-avatar">
                                            <div class="customer-info">
                                                <span class="name">{{ customer.auth }}</span>
                                                <span class="remark">{{ customer.notes }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <video :key="item.id" v-if="item.type === 'video'" controls>
                                        <source :src="item.url" type="video/mp4">
                                    </video>
                                    <img v-else :src="item.url" alt="post image">

                                    <h3 class="notes">{{ item.notes }}</h3>
                                    <span class="node-desc">{{ item.desc }}</span>
                                    <div class="user-info">
                                        <img :src="item.avatar" class="avatar">
                                        <span>{{ item.auth }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>
                </van-list>
            </template>
        </div>

        <van-back-top />

    </van-pull-refresh>
</template>

<script setup>
import { ref, defineProps, computed, onMounted } from 'vue'

// Props 声明
const props = defineProps({
    part: {
        type: String,
        default: 'find'
    }
})

const loading = ref(false)
const page = ref(1)
const dropLoading = ref(false)
const dropFinished = ref(false)

const columns = ref([])
// 计算奇偶下标数组（自动响应原始数组变化）
const evenColumns = computed(() =>
    columns.value.filter((_, index) => index % 2 === 0) // 偶数下标（0,2,4...）
)
const oddColumns = computed(() =>
    columns.value.filter((_, index) => index % 2 !== 0) // 奇数下标（1,3,5...）
)

const onLoad = (curPage = page.value) => {
    setTimeout(() => {
        loading.value = false
        console.log('加载数据：', curPage, loading.value)
        dropLoading.value = false

        const curIndex = curPage * 6
        const data = [
            {
                id: curIndex + 1,
                type: 'img',
                notes: '【版本前瞻】手游新版本预告......',
                url: `/images/info_pic_${Math.floor(Math.random() * 5) + 1}.webp`,
                desc: '恐龙岛（诅咒之岛）',
                avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`,
                auth: '泡芙云'
            },
            {
                id: curIndex + 2,
                type: 'img',
                notes: '【版本前瞻】手游新版本预告......',
                url: `/images/info_pic_${Math.floor(Math.random() * 5) + 1}.webp`,
                desc: '米家小镇日常生活',
                avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`,
                auth: '小鱼酱'
            },
            {
                id: curIndex + 3,
                type: 'customer',
                list: [
                    { auth: '啊辞', avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`, notes: '不换无偿，只画自己喜欢' },
                    { auth: '青空前序', avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`, notes: '关注我，随机抽人送礼' },
                    { auth: '大局无情', avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`, notes: '摆烂选手元老，每天就是' },
                ]
            },
            {
                id: curIndex + 4,
                type: 'video',
                notes: '【版本前瞻】手游新版本预告......',
                url: `/images/info_video_${Math.floor(Math.random() * 3) + 1}.mp4`,
                desc: '迷你世界',
                avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`,
                auth: '我是你的乖乖'
            },
            {
                id: curIndex + 3,
                type: 'video',
                notes: '【版本前瞻】手游新版本预告......',
                url: `/images/info_video_${Math.floor(Math.random() * 3) + 1}.mp4`,
                desc: '三角洲行动',
                avatar: `/images/icon_${Math.floor(Math.random() * 4) + 1}.webp`,
                auth: '熊猫游戏视频'
            },
        ]

        if (curPage === 1) {
            columns.value = [...data]
        } else {
            page.value = curPage
            columns.value = [...columns.value, ...data.filter(item => item.type !== 'customer')]
        }
        dropFinished.value = curPage >= 5
    }, 1000);
}

const onDrop = () => {
    dropLoading.value = true
    console.log('drop')
    onLoad(page.value + 1)
}

const onRefresh = () => {
    console.log('refresh ')
    page.value = 1

    loading.value = true
    onLoad()
}

onMounted(() => {
    onRefresh()
})
</script>

<style scoped>
.container {
    padding: 10px;
    min-height: 100vh;
}

.empty-text {
    color: #000;
}

.loading-text {
    color: #f6b;
}

.drop-list {
    display: flex;
    gap: 10px;
}

.data-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
}

.column {
    background-color: #fff;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 200px;
    height: fit-content;
}

.card-title {
    padding: 10px;
    background: linear-gradient(to top, #ffffff, #ff6600);
    color: #000;
    border-radius: 2vw;
}

.customer-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.customer-avatar {
    height: 20vw;
    width: 20vw;
    border-radius: 90%;
}

.customer-info {
    display: flex;
    flex-direction: column;
}
.customer-name {
    color: #030405;
    font-size: 18px;
}
.customer-remark {
    color: #c1afaf;
    font-size: 10px;
}

video,
img {
    width: 100%;
    border-radius: 8px;
}

.notes {
    color: #030405;
}

.node-desc {
    color: #c1afaf;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #c1afaf;
}

.avatar {
    height: 10vw;
    width: 10vw;
    border-radius: 90%;
}
</style>