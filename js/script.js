window.addEventListener('DOMContentLoaded', function () {

    var personData = {};


    function cleanObj() {
        for (const prop of Object.keys(personData)) {
            delete personData[prop];
        }

    }

    // модальное окно popup-engineer , popup 
    let popupEngineer = document.getElementsByClassName(' popup_engineer')[0],
        headerBtn = document.getElementsByClassName('header_btn')[0],
        popupClose = document.getElementsByClassName('popup_close')[1],
        popupClosePhoneLink = document.getElementsByClassName('popup_close')[0],
        phoneLink = document.querySelector('.phone_link'),
        popup = document.querySelector('.popup'),
        footerLink = document.getElementsByClassName('phone_link')[1];
    // inputPhone = document.getElementsByName('user_phone');
    // console.log(inputPhone);

    headerBtn.addEventListener('click', function () {

        popupEngineer.style.display = 'block';
        document.body.style.overflow = 'hidden';

    });

    popupClose.addEventListener('click', function () {
        popupEngineer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });


    phoneLink.addEventListener('click', function () {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    popupClosePhoneLink.addEventListener('click', function () {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    footerLink.addEventListener('click', function () {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // модальное окно 

    // проверка на валидацию 

    let validate = (form, formIndex, userPhone, phoneIndex) => {

        let wrapperForm = document.getElementsByClassName(form)[formIndex],
            inputPhone = document.getElementsByName(userPhone)[phoneIndex],
            div = document.createElement('div');

        inputPhone.addEventListener('input', function (e) {
            if (/\d/.test(e.target.value)) {
                console.log(' число прошло проверку! ');

            } else {
                wrapperForm.appendChild(div);
                div.textContent = ' Неправильный формат ввода! ';
                e.target.value = '';

                setTimeout(function () {
                    div.textContent = '';
                }, 2000);
            }

        });

    };

    validate('form', 0, 'user_phone', 0);
    validate('form', 1, 'user_phone', 1);
    validate('form_footer', 0, 'user_phone', 5);
    validate('form_engineer', 0, 'user_phone', 7);
    validate('form_header_right', 0, 'user_phone', 6);
    validate('form', 8, 'user_phone', 8);
    validate('form', 2, 'user_phone', 2);
    validate('form', 3, 'user_phone', 3);
    validate('form', 4, 'user_phone', 4);


    // появление окна через 60 секунд
    setTimeout(function () {
        let popup = document.getElementsByClassName('popup')[0];
        popup.style.display = 'block';
    }, 60000);
    // появление окна через 60 секунд




    // проверка на варидацию конец 


    // form ajax

    let message = {
        loading: ' Идет отправка... ',
        success: ' Спасибо! Скоро мы с вами свяжемся! ',
        failure: ' Что-то пошло не так... '
    };

    // let form = document.querySelector(' .main-form'),
    //     inputForm = form.getElementsByTagName('input')[0],
    //     input = document.getElementsByName('input'),
    let statusMessage = document.createElement('div'),
        inputsPhone = document.querySelectorAll('input[name="phone"]'),
        formFooter = document.getElementById('form'),
        input = document.getElementsByTagName('input');
    statusMessage.classList.add('status');;

    let ajaxRequest = (id) => {
        let popup = document.getElementById('popup_form_header');
        event.preventDefault();
        let form = document.getElementById(id),
            div = document.createElement('div');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            form.appendChild(statusMessage);


            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', ' application/x-www-form-urlencoded ');

            let formData = new FormData(form);

            let obj = {
                personData
            };
            formData.forEach(function (value, key) {
                obj[key] = value;
            });


            let json = JSON.stringify(obj);

            console.log(json);

            request.send(json);

            request.addEventListener('readystatechange', function () {
                console.log('test');
                if (request.readyState < 4) {
                    // statusMessage.textContent = message.loading;
                    form.appendChild(div);
                    div.textContent = message.loading;
                    setTimeout(function () {
                        div.textContent = '';
                    }, 1000);

                } else if (request.readyState === 4 && request.status == 200) {
                    setTimeout(function () {
                        statusMessage.textContent = message.success;
                        setTimeout(function () {
                            statusMessage.textContent = '';
                        }, 2000);
                    }, 1000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }

            form.value = '';

        });

    };

    ajaxRequest('form_header');
    ajaxRequest('form_middle');
    ajaxRequest('popup_form_header');
    ajaxRequest('form_footer');
    ajaxRequest('main_popup_header');
    ajaxRequest('popup_calc_end');
    ajaxRequest('external_form');
    ajaxRequest('roof_form');
    ajaxRequest('rising_form');

    //form ajax

    //timer
    let deadline = '2019-04-05';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
        days = Math.floor((t / (1000 * 60 * 60 * 24)));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            let t = getTimeRemaining(endtime);

            if (t.days < 10) {
                days.textContent = '0' + t.days;
            } else {
                days.textContent = t.days;

            }

            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;

            }
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }


            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);
    //timer


    //popup-calc

    let popupCulc = document.getElementsByClassName('popup_calc')[0],
        popupCulcContent = document.querySelector('.popup_calc_content'),
        popupCalcProfile = document.querySelector('.popup_calc_profile'),
        popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'),
        popupCalcButton = document.querySelector('.popup_calc_button'),
        popupCalcEnd = document.querySelector('.popup_calc_end '),
        popupCulcClose = document.querySelector('.popup_calc_close'),
        popupCalcProfileClose = document.querySelector('.popup_calc_profile_close'),
        popupCalcEndClose = document.querySelector('.popup_calc_end_close');
    button1 = document.getElementsByClassName('popup_calc_btn')[0],
        button2 = document.getElementsByClassName('popup_calc_btn')[1],
        fullImg = document.querySelectorAll('.full_img'),
        typeImg = document.querySelectorAll('.type_img'),
        popupCalcOptions = document.querySelectorAll('.popup_calc_options'),
        balconIcons = document.querySelector('.balcon_icons'),
        inputWidth = document.getElementById('width'),
        inputHeight = document.getElementById('height'),
        error = document.createElement('div');





    button1.addEventListener('click', function () {
        popupCulc.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    popupCulcClose.addEventListener('click', function () {
        popupCulc.style.display = 'none';
        document.body.style.overflow = 'auto';

    });


    function hideWindows(a) {
        for (let i = a; i < typeImg.length; i++) {
            fullImg[i].classList.remove('show_windows');
            fullImg[i].classList.add('hide');
        }

    }

    hideWindows(1);


    function showWindows(b) {
        if (fullImg[b].classList.contains('hide')) {
            fullImg[b].classList.remove('hide');
            fullImg[b].classList.add('show_windows');
        }
    }


    balconIcons.addEventListener('click', function (event) {
        event.preventDefault();
        let target = event.target;
        if (target && target.classList.contains('type_img')) {
            for (let i = 0; i < typeImg.length; i++) {
                if (target == typeImg[i]) {
                    hideWindows(0);
                    showWindows(i);
                    break;
                }
            }
        }
    });

    let validateNumber = (e) => {
        if (/\d/.test(e.target.value)) {
            console.log(' число прошло проверку! ');
        } else {
            popupCulcContent.append(error);
            error.textContent = ' Можно вводить только цифры ';
            e.target.value = '';
            setTimeout(function () {
                error.textContent = '';
            }, 2000);
        }
    }


    inputHeight.addEventListener('change', function (e) {
        validateNumber(e);
        personData.height = inputHeight.value;

    });

    inputWidth.addEventListener('change', function (e) {
        validateNumber(e);
        personData.width = inputWidth.value;
    });


    popupCalcButton.addEventListener('click', function () {
        popupCulc.style.display = 'none';
        popupCalcProfile.style.display = 'block';
        document.body.style.overflow = 'hidden';

    });

    popupCalcProfileClose.addEventListener('click', function () {
        popupCalcProfile.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    function checkCheckBox() {
        checkboxs = document.getElementsByClassName('checkbox');
        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i].type == "checkbox") {
                checkboxs[i].onchange = function () {
                    checkboxs = document.getElementsByClassName('checkbox');
                    for (let i = 0; i < checkboxs.length; i++) {
                        if (checkboxs[i].type == "checkbox") {
                            checkboxs[i].checked = false;
                        }
                        this.checked = true;

                        function getCheckedCheckBoxes() {
                            let checkboxes = document.getElementsByClassName('checkbox');

                            for (var index = 0; index < checkboxes.length; index++) {
                                if (checkboxes[index].checked) {
                                    personData.type = checkboxes[index].value;

                                }
                            }
                            return console.log(personData);
                        }
                        getCheckedCheckBoxes();

                    }
                }
            }
        }
    }

    function selectOptions() {
        selectView = document.getElementById('view_type').value;
        if (selectView != this.value) {
            personData.glazingType = selectView;
        }
    }

    checkCheckBox();
    setInterval(selectOptions, 500);


    // let button = document.getElementById('check');
    // button.style.position = 'fixed';
    // button.style.top = '0';
    // button.style.zIndex = '10';
    // button.addEventListener('click', function () {
    //     console.log(personData);
    // });

    popupCalcProfileButton.addEventListener('click', function () {
        popupCalcProfile.style.display = 'none';
        document.body.style.overflow = 'auto';
        popupCalcEnd.style.display = 'block';

    });



    popupCalcEndClose.addEventListener('click', function () {
        document.body.style.overflow = 'auto';
        popupCalcEnd.style.display = 'none';
        cleanObj();
    });













    //popup-calc

    //tabs отделка

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.decoration_slider'),
        tabContent = document.querySelectorAll('.tab_content'),
        tabA = document.querySelectorAll('.tab_a');


    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
            tab[i].classList.remove('after_click');
            tabA[i].classList.remove('active_a');
        }
    };

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
            if (tab[b].classList.contains('no_click')) {
                tab[b].classList.add('after_click');
                tabA[b].classList.add('active_a');
            }
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //tabs отделка


    function tabsWindows() {

        let tab = document.querySelectorAll('.glazing_block'),
            info = document.querySelector('.glazing_slider'),
            tabContent = document.querySelectorAll('.content-window'),
            glazingLink = document.querySelectorAll('.glaizing_link');

        let hideTabContent = (a) => {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
                glazingLink[i].classList.remove('active');

            }
        }

        hideTabContent(1);

        let showTabContent = (b) => {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
                glazingLink[b].classList.add('active');
            }
        }

        info.addEventListener('click', function (event) {
            let target = event.target;
            if (target && target.classList.contains('glazing_block')) {
                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);

                        break;
                    }
                }
            }
        });
    }
    tabsWindows();

    // конец tabs windows


    // img gallery

    let div = document.createElement('div'),
        imgBlock = document.createElement('div'),
        img = document.createElement('img'),
        smallPicture1 = document.querySelectorAll('.img_gallery')[0],
        smallPicture2 = document.querySelectorAll('.img_gallery')[1],
        smallPicture3 = document.querySelectorAll('.img_gallery')[2],
        smallPicture4 = document.querySelectorAll('.img_gallery')[3],
        smallPicture5 = document.querySelectorAll('.img_gallery')[4],
        smallPicture6 = document.querySelectorAll('.img_gallery')[5],
        smallPicture7 = document.querySelectorAll('.img_gallery')[6],
        smallPicture8 = document.querySelectorAll('.img_gallery')[7];

    function showBigPicture(link) {
        div.classList.add('black_bg');
        div.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.appendChild(div);
        div.appendChild(imgBlock);
        imgBlock.style.marginTop = '2%';
        imgBlock.appendChild(img);
        img.style.marginLeft = 'auto';
        img.style.marginRight = 'auto';
        img.style.display = 'block';
        img.src = link;

    }

    function hideBigPicture() {
        div.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    hideBigPicture();



    smallPicture1.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/1.png');

    });

    smallPicture2.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/2.png');
    });

    smallPicture3.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/3.png');
    });

    smallPicture4.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/4.png');
    });

    smallPicture5.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/5.png');
    });

    smallPicture6.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/6.png');
    });

    smallPicture7.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/7.png');
    });

    smallPicture8.addEventListener('click', function () {
        event.preventDefault();
        showBigPicture('../img/our_works/big_img/8.png');
    });





    div.addEventListener('click', function () {
        hideBigPicture();
    });


    // img gallery




});