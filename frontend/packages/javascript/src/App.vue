<template>
	<div id="app">
		<el-container style="height: 100%;">
			<el-header id="header">
				<div class="left"><el-icon><ColdDrink /></el-icon> Careful</div>
				<div class="right"></div>
			</el-header>
			<el-container style="height: 100%;">
				<el-aside width="200px">
					<el-menu style="height: 100%;" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" :default-openeds="['/', '/settings', '3', '4']"
					 text-color="#fff" @open="handleOpen" @close="handleClose" default-active="1" router>
					 <el-menu-item index="/">
					 	<el-icon><Box /></el-icon>
					 	<span>服务管理</span>
					 </el-menu-item>
						<el-sub-menu index="/settings">
							<template #title>
								<el-icon>
									<setting />
								</el-icon>
								<span>系统设置</span>
							</template>
								<el-menu-item index="/settings/node">网络节点</el-menu-item>
						</el-sub-menu>
					</el-menu>
				</el-aside>
				<el-main>
					<div class="view">
						<router-view />
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import {
		useI18n
	} from "vue-i18n";

	export default {
		setup() {
			const {
				t,
				availableLocales,
				locale
			} = useI18n();

			// List of supported languages
			// 支持的语言列表
			const languages = availableLocales;

			// Click to switch language
			// 点击切换语言
			const onclickLanguageHandle = (item) => {
				item !== locale.value ? (locale.value = item) : false;
			};

			const onclickMinimise = () => {
				window.runtime.WindowMinimise();
			};
			const onclickQuit = () => {
				window.runtime.Quit();
			};

			return {
				t,
				languages,
				locale,
				onclickLanguageHandle,
				onclickMinimise,
				onclickQuit,
			};
		},
		methods: {
			handleOpen (key, keyPath) {
				console.log(key, keyPath)
			},
			handleClose (key, keyPath) {
				console.log(key, keyPath)
			}
		}
	};
</script>

<style lang="scss">
	@import url("./assets/css/reset.css");
	@import url("./assets/css/font.css");

	html {
		width: 100%;
		height: 100%;
	}

	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-family: "JetBrainsMono";
		background-color: transparent;
	}
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		#header {
			padding: 0;
			.left {
				background-color: #545c64;
				border: 1px solid rgb(67, 74, 80);
				color: #fff;
				font-weight: 600;
				font-size: 18px;
				float: left;
				text-align: center;
				width: 199px;
				height: 60px;
				line-height: 60px;
				i {
					font-weight: 600;
					font-size: 18px;
				}
			}
			
			.right {
				height: 60px;
				border: 1px solid rgb(67, 74, 80);
			}
		}
	}
</style>
