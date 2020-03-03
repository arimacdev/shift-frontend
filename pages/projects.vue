<template>
    <div class="row no-gutters user-profile">
        <div class="col-md-3 col-12">
            <sidebar/>
        </div>
        <div class="col-md-9 col-12 body request-therapist">
            <p class="my-4 up-topic">I want to request a Therapist</p>
            <div class="inner-body-wrap request-therapist">
                <div class="row no-gutters welcome-msg align-items-center">
                    <span class="mr-3"><img src="" alt="smile-pic"></span><span
                        class="word-single mr-1">WELCOME!</span>We have selected the most suitable therapist for you.
                </div>

                <div class="row no-gutters mt-4">
                    <div class="col-md-6 col-12 position-relative">
                        <input type="text" class="main-input" placeholder="Search a Therapist">
                        <span class="search"><img src="" alt="search-icon"></span>
                    </div>
                </div>

                <div class="row doctors">
                    <div class="col-md-6">
                        <div class="row no-gutters doc-single">
                            <div class="img-wrap">
                                <img src="" alt="doc-img">
                            </div>
                            <div class="details">
                                <div class="name">Dr. Mohammed bin Sulayem</div>
                                <div class="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                    diam nonumy eirmod.
                                </div>
                                <nuxt-link class="req-btn" to="">REQUEST</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row no-gutters doc-single">
                            <div class="img-wrap">
                                <img src="" alt="doc-img">
                            </div>
                            <div class="details">
                                <div class="name">Dr. Mohammed bin Sulayem</div>
                                <div class="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                    diam nonumy eirmod.
                                </div>
                                <nuxt-link class="req-btn" to="">REQUEST</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row no-gutters doc-single">
                            <div class="img-wrap">
                                <img src="" alt="doc-img">
                            </div>
                            <div class="details">
                                <div class="name">Dr. Mohammed bin Sulayem</div>
                                <div class="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                    diam nonumy eirmod.
                                </div>
                                <nuxt-link class="req-btn" to="">REQUEST</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row no-gutters doc-single">
                            <div class="img-wrap">
                                <img src="" alt="doc-img">
                            </div>
                            <div class="details">
                                <div class="name">Dr. Mohammed bin Sulayem</div>
                                <div class="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                    diam nonumy eirmod.
                                </div>
                                <nuxt-link class="req-btn" to="">REQUEST</nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'projects',
    components: {}
  }
</script>

<style scoped>

</style>