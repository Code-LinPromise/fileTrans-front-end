export const prefetch = (src:string) => {
    return new Promise((resolve, reject) => {
      const picture = new Image()
      picture.onload = () => {
        resolve(picture)
      }
      picture.onerror = (error) => {
        reject(error)
      }
      picture.src = src
    })
  }