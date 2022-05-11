import Lightbox from './photoswipe_lightbox.esm.min.js'

const photoswipeActivations = document.getElementsByClassName('photoswipe-activation')

for (let activation = 0; activation < photoswipeActivations.length; activation++) {
  const thisActivation = photoswipeActivations[activation]
  const options = {
    gallery: thisActivation.getAttribute('gallery-selector'),
    children: thisActivation.getAttribute('child-selector'),
    pswpModule: () => import('/assets/js/photoswipe.esm.min.js') // eslint-disable-line import/no-absolute-path
  }

  const lightbox = new Lightbox(options)

  lightbox.on('uiRegister', function () {
    lightbox.pswp.ui.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: 'Caption Text',
      onInit: (el, pswp) => {
        lightbox.pswp.on('change', () => {
          const currentSlideElement = lightbox.pswp.currSlide.data.element
          const hiddenCaption = currentSlideElement.querySelector('.caption')
          const customCaptionElements = document.getElementsByClassName('pswp__custom-caption')
          let captionHTML = ''

          if (hiddenCaption === '' || hiddenCaption === null) {
            for (let counter = 0; counter < customCaptionElements.length; counter++) {
              customCaptionElements[counter].classList.add('invisible')
            }
          } else {
            for (let counter = 0; counter < customCaptionElements.length; counter++) {
              customCaptionElements[counter].classList.remove('invisible')
            }

            if (currentSlideElement) {
              captionHTML = hiddenCaption.innerHTML
            }
          }

          el.innerHTML = captionHTML
        })
      }
    })
  })

  lightbox.init()
}
