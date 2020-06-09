<template>
    <div
        class="header-height bg-primary d-flex"
    >
        <b-navbar-brand class="d-flex align-items-center">
            <img src="../assets/logo.png" class="h-75 my-auto ml-5">
        </b-navbar-brand>

        <div class="ml-auto text-white d-flex align-items-center mr-4">
            <font-awesome-icon class="mr-5 mt-0 shadow-lg" :icon="['far', 'user-circle']" size="3x"/>
            <h5 class="text-center mr-5">
                John Temmet
            </h5>
            <div class="d-flex flex-column">
                <h6 class="shadow-lg" to="/profile">Profile</h6>
                <h6 class="shadow-lg" to="/settings">Projects</h6>
                <h6 class="shadow-lg" to="/logout">Log Out</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
    .header-height {
        height: 8rem;
    }
</style>