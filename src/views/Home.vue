<template>
	<div class="home">
		<h1>Infinite scroll</h1>
		<div class="articles__div" v-if="articles">
			<news-card
				class="news__component"
				v-for="(article, index) in articles"
				:key="index"
				:article="article"
			></news-card>
		</div>
		<div v-else class="news--empty">
			<p>Loading...</p>
		</div>
		<div ref="articlesContainer" class="news--empty">
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import NewsCard from "../components/newsCard";
	const options = {
		root: document.querySelector(".home"),
		rootMargin: "0px",
		threshold: 0.5,
	};
	// @ is an alias to /src
	export default {
		name: "home",
		components: {
			NewsCard,
		},
		data() {
			return {
				articles: [],
				page: 1,
				observer: null,
			};
		},
		mounted() {
			this.fetchArticles();
		},
		watch: {
			articles: "setObserver",
		},
		methods: {
			...mapActions(["getArticles"]),
			callback: function (entries, observer) {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0) {
						if (
							this.articles.length !== 100 &&
							this.articles.length / 20 === this.page
						) {
							this.page += 1;
							this.fetchArticles();
						}
					}
				});
			},
			setObserver() {
				this.observer = new IntersectionObserver(this.callback, options);
				this.observer.observe(this.$refs.articlesContainer);
			},
			async fetchArticles() {
				let page = this.page;
				try {
					let { data } = await this.getArticles(page);
					let articles = this.articles.slice();
					this.articles = articles.concat(data.articles);
				} catch (error) {
					console.error(error);
				}
			},
		},
	};
</script>
