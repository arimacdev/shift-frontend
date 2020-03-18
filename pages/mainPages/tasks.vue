<template>
   <div>
        
    </div>

</template>

<script>
    export default {
        data() {
            return {
                users: ["Naveen","Perera"]
            }
        },
        props: ['tasks']
    }
</script>

<style scoped>
.peopleWrapper{
    width: 100%;
    padding: 30px;
}
.titleDiv{
    width: 30%;
    float: left;
}
.catTitle{
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
}
.addPeopleButton{
    border-radius: 5px;
    float: left;
    margin-right: 5px;
     background-color: #0BAFFF;
    width: 20%;
    float: right;
}
.peopleListWrapper{
    margin-top: 30px;
}
.peopleList{
    background-color: #EDF0F5;
    border-radius: 5px;
    margin-top: 5px;
    height: 50px;
}
</style>