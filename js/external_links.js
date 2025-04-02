/*
To open an EXTERNAL link in the CURRENT tab, write your link like this:
  <a href="https://github.com" target="_self">GitHub</a>

To open an INTERNAL link in a NEW tab, write your link like this:
  <a href="https://emmasax.com" target="_blank">My website</a>
*/
const links = document.getElementsByTagName('a')
const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.rar']

for (let counter = 0; counter < links.length; counter++) {
  const link = links[counter]
  const href = link.getAttribute('href')

  if (href && !link.hasAttribute('target')) {
    // Create a full URL object to properly check hostname
    const url = new URL(href, window.location.origin)
    const isExternal = url.hostname !== window.location.hostname
    const isFile = fileExtensions.some(ext =>
      href.toLowerCase().endsWith(ext)
    )

    if (isExternal || isFile) {
      link.target = '_blank'
      link.rel = 'noopener'
    }
  }
};
