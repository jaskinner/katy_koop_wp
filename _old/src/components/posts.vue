<style>

</style>

<template>

    <transition name="slide-fade" enter-active-class="animated zoomInUp" leave-active-class="animated zoomOutDown">

        <div class="rt-post-container" v-if="loaded === 'true'">

            <div class="rt-post-wrapper" v-for="post in posts" :key="post.slug">

                <div class="rt-post">

                    <h2 class="rt-post-title">
                        <router-link :to="{ name: 'post', params: { name:post.slug }}"><p> {{ post.title.rendered
                            }} </p></router-link>
                    </h2>
                    <div class="rt-meta">
						<span class="posted-on">
							&#8226;
							<span class="date" v-text="formatDate( post )">
							</span>
						</span>
                    </div>

                    <div class="progressive full" v-if="post.featured_image_src['full'][0]">

                        <img class="lazy" v-progressive="post.featured_image_src['full'][0]"
                             :data-srcset="post.featured_image_src['srcset']"/>

                    </div>

                    <div class="rt-post-excerpt rt-content" v-html="post.excerpt.rendered"></div>

                </div>

            </div>

            <div class="pagination" v-if="totalPages > 1">
                <a href="" v-if="showPrev" v-on:click.prevent="rtShowPrev()"> <i class="fas fa-angle-double-left"></i> </a>
                <a> {{ currentPage }} / {{ totalPages }} </a>
                <a href="" v-if="showNext" v-on:click.prevent="rtShowNext()"> <i class="fas fa-angle-double-right"></i> </a>
            </div>

        </div>

    </transition>

</template>

<script>
export default {

	mounted: function() {

		const vm = this;

		if ( vm.$route.params.page ) {

			vm.getPosts( vm.$route.params.page );

		} else {

			vm.getPosts();
		}

	},
	data() {

		return {

			posts: {},
			currentPage: '',
			prevPage: '',
			nextPage: '',
			showNext: 'true',
			showPrev: 'true',
			postCollection: '',
			postPerPage: '10',
			totalPages: '',
			loaded: 'false',
			pageTitle: ''

		};

	},

	methods: {

		getPosts: function( pageNumber = 1 ) {

			const vm = this;
			vm.loaded = 'false';
			vm.$http.get( 'wp/v2/posts', {
				params: { per_page: vm.postPerPage, page: pageNumber }
			} )
			.then( ( res ) => {
				vm.posts = res.data;
				vm.totalPages = res.headers[ 'x-wp-totalpages' ];

				if ( pageNumber <= parseInt( vm.totalPages ) ) {

					vm.currentPage = parseInt( pageNumber );

				} else {

					vm.$router.push( { 'name': 'home' } );
					vm.currentPage = 1;

				}

				vm.loaded = 'true';
				vm.pageTitle = 'Blog';
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );

			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );

		},
		rtShowNext: function( event ) {

			const vm = this;

			if ( vm.currentPage < vm.totalPages ) {

				vm.currentPage = vm.currentPage + 1;

				vm.$router.push( { 'name': 'home', params: { 'page': vm.currentPage } } );
			}
		},
		rtShowPrev: function( event ) {

			const vm = this;
			if ( vm.currentPage != 1 ) {

				vm.currentPage = vm.currentPage - 1;

				vm.$router.push( { 'name': 'home', params: { 'page': vm.currentPage } } );

			}
		},
		formatDate: function( value ) {

			value = value.date;
			if ( value ) {
				const date = new Date( value );
				const monthNames = [ "January", "February", "March",
					"April", "May", "June", "July",
					"August", "September", "October",
					"November", "December" ];

				const day = date.getDate();
				const monthIndex = date.getMonth();
				const year = date.getFullYear();

				return monthNames[ monthIndex ] + ',' + day + ' ' + year;
			}

		}

	},
	watch: {

		'$route'( to, from ) {
			this.getPosts( this.$route.params.page );
		}

	}
};
</script>
