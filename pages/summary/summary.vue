<template>
    <div class="top-nav">
<navigation-drawer :user=user />
    </div>
</template>
<script>
import NavigationDrawer from '~/components/navigationDrawer'

export default {
  components: {
    NavigationDrawer
  },
}
</script>