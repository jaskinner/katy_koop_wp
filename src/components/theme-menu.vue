<template>

    <div class="menu-wrapper" v-bind:class="{'toggled-menu': isActive}">
        <div class="site-menu-toggle" v-on:click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="social-links">
            <a href=""><i class="fab fa-facebook"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
            <a href=""><i class="fab fa-twitter"></i></a>
        </div>
        <div class="site-menu"></div>
        <nav class="site-menu-nav">
            <span class="site-menu-nav-item" v-for="item in menus">
                <router-link v-if="item.type != 'custom'" :to="{ name: 'page', params: { name: getUrlName( item.url ) }}"> {{ item.title }}
                </router-link>
                <router-link v-if="item.type == 'custom'" :to="{ name: 'home'}">{{ item.title }}</router-link>
            </span>
        </nav>
    </div>

</template>

<script>

    export default {

        mounted: function () {

            //console.log( wp.api.collections );
            this.getMenu();
        },
        data() {
            return {

                menus: [],
                site_name: rtwp.site_name,
                isActive: false

            };
        },
        methods: {

            getMenu: function() {
                const vm = this;
                vm.$http.get( 'wp-api-menus/v2/menu-locations/primary-menu' )
                    .then( ( res ) => {
                    vm.menus = res.data;
            } )
            .catch( ( res ) => {
                    //console.log( `Something went wrong : ${ res }` );
                } );
            },

            getUrlName: function (url) {

                const array = url.split('/');
                return array[array.length - 2];
            },
            toggleMenu: function () {
                this.isActive = !this.isActive;
            }

        }
    };
</script>

<style>


</style>
