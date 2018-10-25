export default async function({ store, route, redirect }) {
  if (!store.getters['user/isLogined']) {
    await store.dispatch('user/onAuthStateChanged').catch(() => {
      if (route.path === '/' || route.path.startsWith('/login')) {
        //
      } else {
        return redirect('/')
      }
    })
  }
}
