/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    let newMango = "";

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    $("#submitButton").click(function(){
        createNewMango();
        $('input[type="text"]').val('');
    });

    function getQuery(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if(params.admin == 1) {
            document.getElementById('admin').style.display = 'block'
        } else {
            document.getElementById('admin').style.display = 'none'
        }
    }
    
    function createNewMango() {
        let title = $("#title").val();
        let title_other = $("#title-other").val();
        let link = $("#link").val();
        let img_link = $("#img-link").val();
        let genre = $("#genre").val().trim();
        let desc = $("#desc").val();
        let rating = $("#rating").val();

        if(title == "") {
            return false;
        }
        
        var newMangoes = {
            "title": {
                "en": title,
                "other": title_other.split(',')
            },
            "link": link,
            "description": desc,
            "image_link" : {
                "main" : img_link,
                "default" : "assets/img/pngaaa.com-1777296.png"
            },
            "rating" : rating,
            "genre" : genre.split('-')
        }

        newMango.mangoes.push(newMangoes)
        console.log(JSON.stringify(newMango));
    
        //  //get the mangoes
        // $.getJSON('assets/json/mangoes-template.json', function(data) {
           
            
        // })
    }
    
    function populateMango() {
        $.getJSON('assets/json/mangoes-template.json', function(data) {
            
            newMango = data;
            
            let listMangoes = data['mangoes']
            let listLength = listMangoes.length;
    
            let MangoTemplateIcon = "";
            let MangoModals = "";
            for (let i = 0; i < listLength ; i++) {
                let title = listMangoes[i]['title']['en'];
                let link = listMangoes[i]['link'];
                let desc = listMangoes[i]['description'];
                let img = listMangoes[i]['image_link']['main'];
                let genre = listMangoes[i]['genre'];
                let rate = Math.round(listMangoes[i]['rating']);


                let mangoes = "";
                for (let j = 0; j < rate; j++) {
                    mangoes = mangoes + `<span>🥭</span>`
                }
                
                MangoTemplateIconTemp = `<div class="col-md-4 col-lg-3 mb-4">
                                        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal`+i+`">
                                            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                                <div class="portfolio-item-caption-content text-center text-white">
                                                <i class="fa-solid fa-book-open fa-3x"></i><br>
                                                `+title+`
                                                </div>
                                            </div>
                                            <img class="img-fluid rounded mb-5 center thumbnails" src="`+img+`" alt="..." />
                                            <div class="d-flex align-items-center justify-content-center h-100 w-100">
                                                <p class="lead">`+title+`</p>
                                            </div>
                                            
                                        </div>
                                    </div>`;
    
    
                MangoModalsTemp = `<div class="portfolio-modal modal fade" id="portfolioModal`+i+`" tabindex="-1" aria-labelledby="portfolioModal`+i+`" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                            <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                                            <div class="modal-body text-center pb-5">
                                                <div class="container">
                                                    <div class="row justify-content-center">
                                                        <div class="col-lg-8">
                                                            <!-- Portfolio Modal - Title-->
                                                            <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">`+title+`</h2>
                                                            <!-- Icon Divider-->
                                                            <div class="divider-custom">
                                                                <div class="divider-custom-line"></div>
                                                                <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                                                                <div class="divider-custom-line"></div>
                                                            </div>
                                                            <!-- Portfolio Modal - Image-->
                                                            <img class="img-fluid rounded mb-5" src="`+img+`" alt="..." />
                                                            <!-- Portfolio Modal - Text-->
                                                            <br>
                                                            <div class=" mb-4 center">
                                                            `+listMangoes[i]['rating']+` / 5
                                                            <br>
                                                            `+mangoes+`
                                                            </div>
                                                            <p class="mb-4 center"> <b>Genres<br> `+genre+`</b></p>
                                                            <p class="mb-4">`+desc+`</p>
                                                            <a href="`+link+`" class="btn btn-primary" target="_blank">
                                                                <i class="fa-solid fa-arrow-up-right-from-square fa-fw"> </i>
                                                                Go to Link
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    
                MangoTemplateIcon = MangoTemplateIcon + MangoTemplateIconTemp;
                MangoModals = MangoModals + MangoModalsTemp;
            }    
    
            const boxProper = document.getElementById('mangoes-target-div');  
            const boxModal = document.getElementById('modal-box');  
            boxProper.innerHTML = MangoTemplateIcon;
            boxModal.innerHTML = MangoModals;
        })
        
    }

    populateMango();
    getQuery();
});

