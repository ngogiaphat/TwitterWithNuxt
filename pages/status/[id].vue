<template>
	<div>
		<MainSection title = "Tweet">
			<Head>
				<Title></Title>
			</Head>
			<TweetDetails :user = "user" :tweet = "tweet"/>
		</MainSection>
	</div>
</template>
<script setup>
	const loading = ref(false);
	const tweet = ref(null);
	const {getTweetById} = useTweets();
	const {useAuthUser} = useAuth();
	const {user} = useAuthUser();
	watch(() => useRoute().fullPath, () => getTweet());
	function getTweetIdFromRoute(){
		return useRoute().params.id
	};
	async function getTweet(){
		loading.value = true
		try {
			const respone = await getTweetById(getTweetIdFromRoute())
			tweet.value = respone.tweet
		}
		catch(error){
			console.log(error);
		}
		finally {
			loading.vue = false
		};
	};
	onBeforeMount(() => {
		getTweet();
	});
</script>