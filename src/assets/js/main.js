document.addEventListener('DOMContentLoaded', function () {

  /* -- SEARCH  -- */
  const searchBoxArray = document.querySelectorAll('.search__container');
  if (searchBoxArray && searchBoxArray.length > 0) {
    searchBoxArray.forEach(searchBox => {
      const search = searchBox.querySelector('.search');
      const searchBtn = searchBox.querySelector('.search__button');
      const input = search.querySelector('input');

      input.addEventListener('focus', () => {
        search.classList.add('open');
      })

      input.addEventListener('blur', () => {
        search.classList.remove('open');
        search.classList.remove('active');
      })

      if (searchBtn) {
        searchBtn.addEventListener('click', () => {
          search.classList.add('active');
        })
      }
    })
  }
  /* -- END SEARCH  -- */


  /* -- AUTOMATIC CONTENT -- */
  const autocontentSection = document.querySelector('.autocontent');
  const textAreas = document.querySelectorAll('.text-section');
  if (textAreas && textAreas.length > 0) {
    let numb = 0;
    textAreas.forEach(text => {
      numb++;
      const jsScrollBlockList = text.querySelectorAll('h2, h3, h4');
      if (jsScrollBlockList.length > 0 && autocontentSection) {
        const autocontentList = autocontentSection.querySelector('.autocontent__list');

        const elementString =
          `<li class="autocontent__item hide-item">
            <div class="autocontent__item-title hide-item__title"></div>
            <div class="hide-item__height">
              <div class="hide-item__content">
                <div class="autocontent__item-content">

                </div>
              </div>
            </div>
          </li>`;

        const parser = new DOMParser();
        const element = parser.parseFromString(elementString, 'text/html');
        const elementItem = element.body.firstChild;

        var articleNavigationItem = elementItem.cloneNode(true);
        var firstElementCheck = 0;

        for (let i = 0; i < jsScrollBlockList.length; i += 1) {
          const jsScrollBlock = jsScrollBlockList[i];
          const titleBlock = jsScrollBlock.textContent;
          const articleNavigationLink = document.createElement('a');

          if (jsScrollBlock.tagName == 'H2') {
            if (firstElementCheck != 0) {
              autocontentList.append(articleNavigationItem);
              articleNavigationItem = elementItem.cloneNode(true);
            }
            navTitle = articleNavigationItem.querySelector('.autocontent__item-title');

            articleNavigationLink.classList.add('title-h2');
            jsScrollBlock.setAttribute('id', i + "_" + numb)
            articleNavigationLink.setAttribute('href', '#' + i + "_" + numb);
            articleNavigationLink.textContent = ' ' + titleBlock;
            navTitle.append(articleNavigationLink);
            firstElementCheck++;
          } else {
            navList = articleNavigationItem.querySelector('.autocontent__item-content');

            if (jsScrollBlock.tagName == 'H3') {
              articleNavigationLink.classList.add('title-h3');
            }
            if (jsScrollBlock.tagName == 'H4') {
              articleNavigationLink.classList.add('title-h4');
            }

            jsScrollBlock.setAttribute('id', i + "_" + numb)
            articleNavigationLink.setAttribute('href', '#' + i + "_" + numb);
            articleNavigationLink.textContent = ' ' + titleBlock;
            navList.append(articleNavigationLink);
          }
        }
        autocontentList.append(articleNavigationItem);
        text.querySelectorAll('a[href^="#"').forEach(link => {

          link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = 380;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
              top: offsetPosition,
              behavior: 'smooth'
            });
          });
        });
      }
    })
  }
  /* -- END AUTOMATIC CONTENT   -- */


  /* -- MENU MOBILE  -- */
  const burgerMenuArr = document.querySelectorAll('.menu_btn');
  if (burgerMenuArr && burgerMenuArr.length > 0) {
    const header = document.querySelector('.header');
    const headerMobile = header.querySelector('.header__row:last-child');

    if (header && headerMobile) {
      burgerMenuArr.forEach(burgerMenu => {
        burgerMenu.addEventListener("click", () => {
          if (header.classList.contains('active')) {
            headerMobile.classList.remove("active");
            header.classList.remove("active");
          } else {
            headerMobile.classList.add("active");
            header.classList.add("active");
            let height = header.offsetHeight;
            headerMobile.style.top = height + 'px';
            //headerMobile.style.height = 'calc(100vh - ' + height + 'px)';
          }
          // header.querySelector('.ham').classList.toggle("active");
          document.querySelector('html').classList.toggle('burger-lock');
        });
      })
    }
  }

  const hideItems = document.querySelectorAll('.hide-items');
  if (hideItems.length > 0) {
    hideItems.forEach((elem) => {
      const hideItem = elem.querySelectorAll('.hide-item');
      const hideTitles = elem.querySelectorAll('.hide-item__title');
      const hideContents = elem.querySelectorAll('.hide-item__height');
      hideItem.forEach((item) => {
        let title = item.querySelector('.hide-item__title');
        let content = item.querySelector('.hide-item__height');
        title.addEventListener('click', (evt) => {
          evt.stopPropagation();
          if (title.classList.contains('active')) {
            let height = content.querySelector('.hide-item__content').offsetHeight;
            content.style.height = height + 'px';
            title.classList.remove('active');
            content.classList.remove('active');
            setTimeout(() => {
              content.removeAttribute('style');
            }, 1);
          }
          else {
            hideTitles.forEach((element) => {
              element.classList.remove('active');
            })
            hideContents.forEach((element) => {
              element.classList.remove('active');
              element.removeAttribute("style");
            })
            let height = content.querySelector('.hide-item__content').offsetHeight;
            title.classList.add('active');
            content.classList.add('active');
            content.style.height = height + 'px';
            setTimeout(() => {
              if (content.classList.contains('active')) {
                content.setAttribute('style', 'height: auto');
              }
            }, 301);
          }
        })
      })
    })
  }

  //Second level menu
  const hideItems2 = document.querySelectorAll('.hide-items--2');
  if (hideItems.length > 0) {
    hideItems.forEach((elem) => {
      const hideItem = elem.querySelectorAll('.hide-item--2');
      const hideTitles = elem.querySelectorAll('.hide-item__title--2');
      const hideContents = elem.querySelectorAll('.hide-item__height--2');
      hideItem.forEach((item) => {
        let title = item.querySelector('.hide-item__title--2');
        let content = item.querySelector('.hide-item__height--2');
        title.addEventListener('click', (evt) => {
          evt.stopPropagation();
          if (title.classList.contains('active')) {
            title.classList.remove('active');
            content.classList.remove('active');
            content.removeAttribute('style');
          }
          else {
            hideTitles.forEach((element) => {
              element.classList.remove('active');
            })
            hideContents.forEach((element) => {
              element.classList.remove('active');
              element.removeAttribute("style");
            })
            let height = content.querySelector('.hide-item__content--2').offsetHeight;
            title.classList.add('active');
            content.classList.add('active');
            content.style.height = height + 'px';
          }
        })
      })
    })
  }
  /* -- END MENU MOBILE  -- */


  /* -- PAGINATION  -- */
  function hiddenItems(tabContent) {
    elements = Array.from(tabContent.children);
    hiddenElements = elements.filter(element => {
      return element.classList.contains("hide");
    })
    return hiddenElements;
  }

  function HiddenElementsInit(tabContent, paginationNumber, btnMore) {
    elements = tabContent.children;
    if (elements.length > paginationNumber) {
      for (let i = elements.length - 1; i >= paginationNumber; i--) {
        elements[i].classList.add("hide");
      }
      btnMore.classList.add("active");
    }
  }

  function tabsShowMore(paginationNumber, btnMore) {
    tabContent = document.querySelector(".pag-list.pag-active");
    hiddenElements = hiddenItems(tabContent);
    for (let i = 0; i < hiddenElements.length; i++) {
      hiddenElements[i].classList.remove("hide");
    }
    btnMore.classList.remove("active");
  }

  const showMoreBtn = document.querySelector(".btn_more");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", (evt) => {
      tabsShowMore(8, showMoreBtn);
    })
  }
  const tabContents = document.querySelectorAll(".pag-list");
  if (tabContents && tabContents.length > 0) {
    tabContents.forEach(content => {
      HiddenElementsInit(content, 8, showMoreBtn);
    })
  }
  /* -- END PAGINATION  -- */


  /* -- CATEGORIES  -- */
  function categoriesSwitch(mainContainer = document, categoriesArray, categoriesContentArray, itemSelectorActive, contentSelectorActive, pagination = false) {
    if (categoriesArray.length > 0 && categoriesContentArray.length > 0) {
      categoriesArray[0].classList.add("active");
      categoriesContentArray[0].classList.add("active");
      if (pagination) {
        let pagList = categoriesContentArray[0].querySelector('.pag-list');
        if (pagList) {
          pagList.classList.add('pag-active');
        } else if (categoriesContentArray[0].classList.contains('pag-list')) {
          categoriesContentArray[0].classList.add('pag-active');
        }
      };
      if (window.innerWidth <= 800) {
        categoriesContentArray[0].style.maxHeight = categoriesContentArray[0].scrollHeight + 40 + "px";
      }
      for (let i = 0; i < categoriesContentArray.length; i++) {
        categoriesContentArray[i].style.order = i * 2 + 1;
        categoriesArray[i].style.order = i * 2;
        if (i > 0) categoriesContentArray[i].style.display = "none";
        categoriesArray[i].addEventListener('click', () => {
          mainContainer.querySelectorAll(itemSelectorActive).forEach(activeBtn => {
            activeBtn.classList.remove('active');
          })
          mainContainer.querySelectorAll(contentSelectorActive).forEach(activeContent => {
            activeContent.classList.remove('active');
            setTimeout(() => { activeContent.style.display = "none"; }, 10);
            if (pagination) {
              let pagList = activeContent.querySelector('.pag-list');
              if (pagList) {
                pagList.classList.remove('pag-active');
              } else if (activeContent.classList.contains('pag-list')) {
                activeContent.classList.remove('pag-active');
              }
            }
          })
          categoriesArray[i].classList.add("active");
          if (pagination) {
            let pagList = categoriesContentArray[i].querySelector('.pag-list');
            if (pagList) {
              pagList.classList.add('pag-active');
            } else if (categoriesContentArray[i].classList.contains('pag-list')) {
              categoriesContentArray[i].classList.add('pag-active');
            }
          }
          categoriesContentArray[i].style.display = null;
          setTimeout(() => { categoriesContentArray[i].classList.add("active"); }, 10);

          if (pagination) {
            let pagList = categoriesContentArray[i].querySelector('.pag-list');
            if (pagList) {
              pagList.classList.add('pag-active');
            } else if (categoriesContentArray[i].classList.contains('.pag-list')) {
              categoriesContentArray[i].classList.add('pag-active');
            }

            tabContents.forEach(content => {
              HiddenElementsInit(content, 8, showMoreBtn);
            })
          }
        })
      }
    }
  }
  /* -- END CATEGORIES  -- */


  /* -- GRAB LIST  -- */
  function grabListListeners(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.1;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchend', () => {
      isDown = false;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  }
  /* -- END GRAB LIST  -- */


  /* -- TABS  -- */
  function tabs(containerItemSelector, titleArray, contentArray) {
    for (let i = 0; i < titleArray.length; i++) {
      titleArray[i].addEventListener("click", () => {
        const item = titleArray[i].closest(containerItemSelector);
        if (item) item.classList.toggle("active");
        titleArray[i].classList.toggle("active");
        if (contentArray[i].style.maxHeight) {
          contentArray[i].removeAttribute("style");
        } else {
          contentArray[i].style.maxHeight = "1500px";
        }
      })
    };
  }
  /* -- END TABS  -- */


  /* -- SERVICES  -- */
  const service = document.querySelector('.services');
  if (service) {

  }
  /* -- END SERVICES  -- */


  /* -- ALLOCATOR PAGE -- */
  const allocator = document.querySelector('.allocator');
  if (allocator) {

  }
  /* -- END ALLOCATOR PAGE -- */


  /* -- PRICE  -- */
  //Price tabs
  const price = document.querySelector('.price');
  if (price) {
    const priceTabsList = price.querySelector('.price__tabs');
    const priceCategories = price.querySelectorAll('.price__tab');
    const priceContent = price.querySelectorAll('.price__tabs-content');

    grabListListeners(priceTabsList);
    categoriesSwitch(price, priceCategories, priceContent, ".price__tab.active", ".price__tabs-content.active");
  }
  /* -- END PRICE  -- */


  /* -- NARKOLOG-TEST -- */
  const test = document.querySelector('.narkolog-test');
  if (test) {
    const forms = test.querySelectorAll('.narkolog-test__form');
    const resultBlock = test.querySelector('.narkolog-test__result');
    const allInputs = test.querySelectorAll('.narkolog-test__form input[type="radio"]');


    function formsFilled() {
      return Array.from(forms).every(form => {
        const inputs = form.querySelectorAll('input[type="radio"]');
        return Array.from(inputs).some(input => input.checked);
      });
    }

    allInputs.forEach(input => {
      input.addEventListener('change', function () {
        if (formsFilled()) {
          allInputs.forEach(input => {
            input.disabled = true;
          });

          setTimeout(() => {
            resultBlock.classList.add('active');
          }, 600);
        }
      });
    });
  }
  /* -- END NARKOLOG-TEST -- */


  /* -- ARTICLES -- */
  const articles = document.querySelector('.articles');
  if (articles) {
    const articlesTabsList = articles.querySelector('.articles__tabs');
    const articlesCategories = articles.querySelectorAll('.articles__tab');
    const articlesContent = articles.querySelectorAll('.articles__tab-content');

    grabListListeners(articlesTabsList);
    categoriesSwitch(articles, articlesCategories, articlesContent, ".articles__tab.active", ".articles__tab-content.active", 1);
  }
  /* -- END ARTICLES -- */


  /* -- AUTOCONTENT RESIZE  -- */
  const autocontentArray = document.querySelectorAll('.autocontent');
  if (autocontentArray && autocontentArray.length > 0) {
    autocontentArray.forEach(autocontent => {
      const titleArray = autocontent.querySelectorAll('.autocontent__subtitle__wrapper');
      const contentArray = autocontent.querySelectorAll('.autocontent__bottom-container');

      if (titleArray && contentArray) {
        if (window.innerWidth <= 975) {
          tabs('.autocontent', titleArray, contentArray);
        }
      }
    })
  }
  /* -- END AUTOCONTENT RESIZE  -- */


  /* -- SLIDERS  -- */
  //Sliders 700 --> mobile 1
  sliders700Array = document.querySelectorAll(".slider-700");
  if (sliders700Array) {
    sliders700Array.forEach(slider700 => {
      const sliders700List = slider700.querySelector('.slider-700__content');
      const sliders700ItemArray = sliders700List.querySelectorAll('.slider-700__item');
      slider700Check = false;
      ['resize', 'load'].forEach((event) => {
        window.addEventListener(event, function () {
          if (window.innerWidth <= 700 && !slider700Check) {
            sliders700List.classList.add('swiper-wrapper');
            if (sliders700ItemArray && sliders700ItemArray.length > 0) {
              sliders700ItemArray.forEach(item => {
                item.classList.add('swiper-slide');
              })
            }
            slider700Check = new Swiper(slider700.querySelector('.slider-700__swiper'), {
              direction: 'horizontal',
              slidesPerView: 1.1,
              grabCursor: true,
              spaceBetween: 8
            });
          }
          if (window.innerWidth > 700 && slider700Check) {
            sliders700List.classList.remove('swiper-wrapper');
            const sliders700ItemArray = sliders700List.querySelectorAll('.swiper-slide');
            if (sliders700ItemArray && sliders700ItemArray.length > 0) {
              sliders700ItemArray.forEach(item => {
                item.classList.remove('swiper-slide');
              })
            }
            slider700Check.destroy(true, true);
            slider700Check = false
          }
        })
      })
    })
  }

  //Sliders horizontal (3 desktop -> 1 mobile)
  slidersHl3Array = document.querySelectorAll(".slider-hl-3");
  if (slidersHl3Array) {
    slidersHl3Array.forEach(slider => {
      sliderCheck = new Swiper(slider.querySelector('.slider-hl-3__swiper'), {
        direction: 'horizontal',
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          600: {
            direction: 'horizontal',
            slidesPerView: 2.2,
            spaceBetween: 15
          },
          1100: {
            direction: 'horizontal',
            slidesPerView: 3.2,
            spaceBetween: 20
          }
        }
      });
    })
  }

  //Sliders horizontal (2 desktop -> 1 mobile)
  slidersHl2Array = document.querySelectorAll(".slider-hl-2");
  if (slidersHl2Array) {
    slidersHl2Array.forEach(slider => {
      sliderCheck = new Swiper(slider.querySelector('.slider-hl-2__swiper'), {
        direction: 'horizontal',
        slidesPerView: 1.1,
        grabCursor: true,
        spaceBetween: 10,
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          600: {
            direction: 'horizontal',
            slidesPerView: 2.2,
            spaceBetween: 15
          },
          1100: {
            direction: 'horizontal',
            slidesPerView: 3.2,
            spaceBetween: 20
          }
        }
      });
    })
  }

  //Sliders horizontal (1 desktop -> 1 mobile)
  slidersHl1Array = document.querySelectorAll(".slider-hl-1");
  if (slidersHl1Array) {
    slidersHl1Array.forEach(slider => {
      sliderCheck = new Swiper(slider.querySelector('.slider-hl-1__swiper'), {
        direction: 'horizontal',
        slidesPerView: 1,
        grabCursor: true,
        spaceBetween: 10,
        pagination: {
          el: '.slider-hl-1__count',
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return '<span class="page-number ' + currentClass + '"></span>' + ' / ' + '<span class="' + totalClass + '"></span>';
          }
        },
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev'),
        }
      });
    })
  }

  //Silder how-help Чем мы можем вам помочь?
  const twister = document.querySelector('.how-help');
  if (twister) {
    twisterSwiperCheck = new Swiper(twister.querySelector('.twister__swiper'), {
      direction: 'horizontal',
      slidesPerView: 1.2,
      grabCursor: true,
      initialSlide: 1,
      pagination: {
        el: '.how-help__count',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="page-number ' + currentClass + '"></span>' + ' / ' + '<span class="' + totalClass + '"></span>';
        }
      },
      spaceBetween: 30,
      breakpoints: {
        600: {
          direction: 'horizontal',
          slidesPerView: 2,
        },
        850: {
          direction: 'vertical',
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: true,
          centeredSlidesBounds: true,
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  /* -- END SLIDERS  -- */


  /* -- POPUPS  -- */
  function popupClose(popupActive) {
    popupActive.classList.remove('open');
    setTimeout(() => {
      popupActive.classList.contains("open") || popupActive.classList.remove("active");
    }, 400);
    document.body.classList.remove('lock');
    document.querySelector('html').style.paddingRight = 0;
    document.querySelector('html').classList.remove('lock');
    document.querySelector('header').removeAttribute('style');
  }
  const popupOpenBtns = document.querySelectorAll('.popup-btn');
  const popups = document.querySelectorAll('.popup');
  const closePopupBtns = document.querySelectorAll('.close-popup');
  closePopupBtns.forEach(function (el) {
    el.addEventListener('click', function (e) {
      popupClose(e.target.closest('.popup'));
    });
  });
  if (popups.length > 0) {
    popups.forEach(function (popup) {
      popupClose(popup);
      popup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {

          popupClose(e.target.closest('.popup'));
        }
      });
    });
  }
  popupOpenBtns.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const path = e.currentTarget.dataset.path;
      const currentPopup = document.querySelector(`[data-target="${path}"]`);
      if (currentPopup) {
        currentPopup.classList.add('active');
        setTimeout(() => {
          currentPopup.classList.add("open");
        }, 10);
        if (currentPopup.getAttribute("data-target") == 'popup-change') {
          let currentItem = el.closest('.change-item');
          let originalTop = currentPopup.querySelector('.original-title');
          let title = currentItem.querySelector('.change-title');
          let subtitle = currentItem.querySelector('.change-subtitle');
          if (title && subtitle) {
            var newTitle = title.innerHTML + ' ' + subtitle.innerHTML;
          } else if (title) {
            var newTitle = title.innerHTML;
          } else {
            var newTitle = subtitle.innerHTML;
          }
          if (el.classList.contains('change-doctor')) {
            newTitle = 'Записаться на приём к врачу: ' + newTitle;
          }
          originalTop.innerHTML = newTitle;
        };
        // scrollWidthFunc();
        document.querySelector('html').classList.add('lock');
      }
    });
  });
  /* -- END POPUPS  -- */


  /* -- TOTOP -- */
  const btnTop = document.querySelector('#toTop');
  if (btnTop) {
    document.addEventListener('scroll', evt => {
      if (window.scrollY > window.innerHeight) {
        if (!btnTop.classList.contains('active')) {
          btnTop.classList.add('active');
          setTimeout(() => {
            btnTop.style.opacity = 1;
          }, 0)
        }
      } else {
        if (btnTop.classList.contains('active')) {
          btnTop.style.opacity = 0;
          setTimeout(() => {
            btnTop.classList.remove('active');
          }, 0)
        }
      }
    })
    btnTop.addEventListener('click', evt => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }
  /* -- END TOTOP -- */


  /* -- OBSERVER -- */
  const observer = new IntersectionObserver((entries) => {
    let animationDelay = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("animation-group")) {
          animationDelay = animationDelay + 100
        } else {
          animationDelay = 0;
        }
        setTimeout(() => {
          entry.target.classList.add("animated")
        }, animationDelay);
        observer.unobserve(entry.target)
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '50px',
  });

  const animatedItems = document.querySelectorAll(".to_animate")

  if (animatedItems.length > 0) {
    animatedItems.forEach(item => {
      observer.observe(item)
    })
  }
  /* -- END OBSERVER -- */


  //view photos fancybox
  Fancybox.bind("[data-fancybox]");


  /*POPUP CALCULATOR*/
  const popupCalculator = document.querySelector('.calculator');
  if (popupCalculator) {
    //range value
    const inputRangeAge = popupCalculator.querySelector('#age');
    const outputAge = popupCalculator.querySelector('#valueAge');
    if (inputRangeAge && outputAge) {
      inputRangeAge.addEventListener('input', evt => {
        outputAge.textContent = evt.target.value;
      })
    }

    const inputRangeExp = popupCalculator.querySelector('#exp');
    const outputExp = popupCalculator.querySelector('#valueExp');
    if (inputRangeExp && outputExp) {
      inputRangeExp.addEventListener('input', evt => {
        outputExp.textContent = evt.target.value;
      })
    }

    //Slide pages
    const form = popupCalculator.querySelector('.calculator__wrapper');
    const pages = popupCalculator.querySelectorAll('.calculator__page');

    const prevButton = popupCalculator.querySelector('.point-mark_arrow:not(.point-mark_arrow_right)');
    const nextButton = popupCalculator.querySelector('.point-mark_arrow_right');

    const pageNumber = popupCalculator.querySelector('.page-number');
    const totalPages = popupCalculator.querySelector('.calculator__count span:last-child');


    const totalPagesCount = pages.length - 1;
    totalPages.textContent = totalPagesCount < 10 ? "0" + totalPagesCount : totalPagesCount;

    const isPageValid = () => {
      const currentPageElement = pages[currentPage];
      const inputs = currentPageElement.querySelectorAll('input[type="radio"]');

      if (inputs.length > 0) {
        const hasCheckedRadio = Array.from(inputs).some(input => input.checked);
        if (!hasCheckedRadio) return false;
      }

      return true;
    }

    const updateNavigation = () => {
      pageNumber.textContent = (currentPage + 1) < 10 ? "0" + (currentPage + 1) : currentPage + 1;

      prevButton.disabled = currentPage === 0;
      nextButton.disabled = currentPage === totalPagesCount || !isPageValid();

      //Set necessary page
      pages.forEach((page, index) => {
        page.classList.toggle('active', index === currentPage);
      });
    }

    const nextPage = () => {
      if (currentPage < totalPagesCount && isPageValid()) {
        currentPage++;
        updateNavigation();
      }
    }
    const prevPage = () => {
      if (currentPage > 0) {
        currentPage--;
        updateNavigation();
      }
    }

    let currentPage = 0;
    updateNavigation();

    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);
    form.addEventListener('change', evt => {
      if (evt.target.matches('input[type="radio"], input[type="range"]')) {
        updateNavigation();
      }
    });
  }
  /*END POPUP CALCULATOR*/
});
