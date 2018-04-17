<template>
    <header :class="$style.mainHeader">
        <h1>TodoAPP</h1>
    </header>
</template>
<!--<script>
    export default {
        computed: {
            $style() {
                return {
                    mainHeader: {}
                }
            }
        }
    }
</script>-->
<style lang="stylus" module scoped>
    .main-header {
        text-align center
        h1 {
            font-size 100px
            color rgba(175, 47, 47, 0.4)
            margin 20px
        }

    }


</style>