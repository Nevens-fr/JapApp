import { Workbox } from 'workbox-window'

export function registerSW() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', {
      scope: '/',
    })

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        console.log('Nouvelle version disponible!')
      }
    })

    wb.register()
  }
}
