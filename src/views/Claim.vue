
<template>
<div class="bloc bgc-platinum l-bloc " id="bloc-1">
	<div class="container bloc-lg">
		<div class="row">
			<div class="col-sm-12">
				<div class="row">
          <div class="col-sm-4"></div>
					<div class="col-sm-4">
						<DeviceClaim v-bind:deviceid="$route.params.deviceid"/>
					</div>
          <div class="col-sm-4"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import DeviceClaim from '@/components/DeviceClaim.vue'

export default {
  name: 'Claim',
  components: {
    DeviceClaim
  }
}
</script>
