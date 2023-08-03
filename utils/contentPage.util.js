
export const changeUrlWithoutPageReload = (title, route) => {
  const subTitle = title.substring(2, title.length).toLowerCase().trim().replace(' ', '-').trim().replace(' ', '-');
  const newUrl = `${route}/${subTitle}`
  window.history.push({}, '', newUrl)
}



export const getSubRouteText = (title) => {
  return title.toLowerCase().trim().replace(' ', '-').trim().replace(' ', '-');
}