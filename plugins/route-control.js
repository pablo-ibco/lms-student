export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    if(!app.$auth.$storage.state.loggedIn && !to.path.includes("/student/login")) {
      next("/student/login");
    }
    else {
      next();
    }
  })
}
