<template>
	<a-config-provider :locale="zhCN">
		<f-screen />
	</a-config-provider>
	<watermark mark="DSEXPRESS" />
</template>
<script>
	import zhCN from "ant-design-vue/es/locale/zh_CN";
	import "./app.less";

	import Watermark from "../components/watermark.vue";
	export default {
		components: {
			Watermark,
		},
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
			return {
				zhCN,
			};
		},
	};
</script>