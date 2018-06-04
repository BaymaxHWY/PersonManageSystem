<template>
    <div class="home">
        <Layout :style="{padding: '0 24px 24px', width:'100%'}">
            <Breadcrumb :style="{margin: '24px 0'}">
                <BreadcrumbItem>首页</BreadcrumbItem>
                <!-- <BreadcrumbItem>Components</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff', margin:'10px'}">
                首页
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
    data () {
            return {
                
            }
        }
}
</script>

<style lang="less" scoped>
.home{
    width: 100%;
}
</style>
