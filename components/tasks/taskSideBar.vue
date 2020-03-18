<template>
  <div class="taskTitleDiv">
      <div class="taskName-sideBar">

        <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div>
        {{ this.task.taskName }}
      </div>

    </div>
</template>

<script>

  export default {
      props: ['task'],
    data() {
      return {
        drawer: null,
        items: [
          
        ],
      }
    },
    components: {
     
    },
  }
</script>

