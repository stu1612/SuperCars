let controller;
let slideScene;
let pageScene;

function animateSlides() {
    // Init controller
    controller = new ScrollMagic.Controller();
    const headerNav = document.querySelector('.header-nav');
    const headerImg = document.querySelector('.header-img');
    const headerText = document.querySelector('.header-text');
    const sliders = document.querySelectorAll('.slide');
    // const nav = document.querySelector('.nav-header');

    // GSAP Header Animation
    const headerTl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" }
    });
    headerTl.fromTo(headerImg, 3, { filter: 'contrast(0)', opacity: 0 }, { filter: 'contrast(5)', opacity: 1 }, '+=0.5');
    headerTl.fromTo(headerImg, 6, { scale: 1, filter: 'grayscale(0)' }, { scale: 1.1, filter: 'grayscale(1)' }, '-=3');
    headerTl.fromTo(headerText, { opacity: 1 }, { opacity: 0 });
    headerTl.fromTo(headerNav, { y: '-100%' }, { y: '0%' }, '-=2');

    // Loop over slide
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        // GSAP Slide Animation
        const slideTl = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" }
        });
        slideTl.fromTo(revealImg, { x: '0%' }, { x: '100%' });
        slideTl.to(img, { clipPath: "polygon(41% 73%, 100% 94%, 10% 100%, 0 24%)" });
        slideTl.to(img, { clipPath: "polygon(100% 6%, 100% 94%, 2% 89%, 7% 32%)" });
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=2');
        slideTl.to(revealText, 0.5, { background: 'var(--black)' }, '-=1');
        slideTl.fromTo(revealText, { scale: 1 }, { scale: 0 }, '-=1');
        //Create Scene for slides
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            // reverse keep slide scene stuck in position
            reverse: false
        })
            .setTween(slideTl)
            .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'slide' })
            .addTo(controller)
        // New Animation
        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1]
        pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' })
        pageTl.fromTo(slide, { opacity: 1 }, { opacity: 0 })
        pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5')

        // Create new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0
        })
            .addIndicators({ colorStart: 'white', colorTrigger: 'white', name: 'page', indent: 200 })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller)
    });
}

animateSlides();