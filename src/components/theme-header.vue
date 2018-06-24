<template>

	<header class="site-header" role="banner">

		<router-link :to="{ name: 'home'}">
			<div class="logo-wrapper">
				<span class="logo-letter">K</span>
				<div class="logo-names-wrapper">
					<span class="logo-first-name">ATY</span>
					<span class="logo-last-name-letter">K</span>
					<span class="logo-last-name-remaining">OOP</span>
				</div>
			</div>
		</router-link>

	</header>

</template>

<script>
export default {

	mounted: function() {
	},
	data() {
	    return {}
	},
	methods: {
	}
};
</script>

<style>


</style>
