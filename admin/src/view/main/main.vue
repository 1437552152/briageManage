
<template>
	<div class="main page indexMain"  >
	    <Nav />
         <router-view />
	</div>
</template>
<script>
import Nav from "@/components/nav/index";
export default {
	name: 'Main',
	  components: { Nav }
	}
</script>
<style lang='less' scoped></style>