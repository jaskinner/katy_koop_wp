<style>

</style>

<template>

	<transition name="slide-fade" enter-active-class="animated zoomInUp" leave-active-class="animated zoomOutDown">

		<div class="row rt-main" v-if="loaded === 'true'">

			<div class="rt-post-container">

				<div class="rt-post">

					<h1 class="post-header-title"> {{ post.title.rendered }}</h1>

					<div class="progressive">

						<img class="lazy"
							 :src="post.featured_image_src['full'][0]"
						/>
					</div>

					<div class="rt-post-content rt-content" v-html="post.content.rendered"></div>

					<div class="rt-cat-list">
						<span>Category: </span>
						<router-link v-for="x in post.cat_name" :to="{ name: 'cat', params: { name:x.slug } }"
									 :key="x.id"> {{ x.name }}
						</router-link>
					</div>

					<div class="rt-tag-list">
						<span>Tags: </span>
						<router-link v-for="x in post.tag_name" :to="{ name: 'tag', params: { name:x.slug } }"
									 :key="x.id"> {{ x.name }}
						</router-link>
					</div>
				</div>

			</div>

		</div>

	</transition>

</template>

<script>
export default {

	mounted: function() {
		this.getPost();
	},

	data() {
		return {

			base_path: rtwp.base_path,
			post: {},
			loaded: 'false',
			pageTitle: ''
		};
	},

	methods: {

		getPost: function() {

			const vm = this;

			vm.$http.get( 'wp/v2/posts', {
				params: { slug: vm.$route.params.name }
			} )
			.then( ( res ) => {

				vm.post = res.data[ 0 ];
				vm.loaded = 'true';
				vm.pageTitle = vm.post.title.rendered;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );

			} )
			.catch( ( res ) => {

				//console.log( `Something went wrong : ${res}` );

			} );

		}

	}
};
</script>
