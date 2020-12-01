<template>
	<f-screen />
</template>
<script>
	export default {
		components: {},
		computed: {
			core() {
				return this.$core;
			},
			registry() {
				return this.$registry;
			},
			variable() {
				return this.$variable;
			},
			process() {
				return this.$process;
			},
			module() {
				return this.$module;
			},
			session() {
				return this.$session;
			},
		},
		data() {
			return {};
		},
	};
</script>