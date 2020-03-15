var guests = null;

function customSelect(el) {
    var options = [],
        option = $(el).children('option'),
        customSelect;

    $(el).hide();

    $(option).each(function () {
        options.push($(this).html());
    });

    $(el).after('<ul class="custom-select" data-selected-value="' + options[0] + '">');
    customSelect = $(el).siblings('.custom-select');
    $(customSelect).append('<li class="selected-option"><span>' + options[0] + '</span>');
    $(customSelect).children('.selected-option').append('<ul class="options">');

    for (var i = 1; i < options.length; i++) {
        $(customSelect).find('.options').append('<li data-value=' + options[i] + '>' + options[i] + '</li>');
    }

    $(customSelect).click(function () {
        $('.custom-select').each((index, el) => {
            if (customSelect[0] != el) {
                $(el).removeClass('open');
                $('.options', el).removeClass('open');
            }
        })
        $(this).toggleClass('open');
        $('.options', this).toggleClass('open');
    });

    $(customSelect).find('.options li').click(function () {
        var selection = $(this).text();
        var dataValue = $(this).attr('data-value');
        var selected = $(customSelect).find('.selected-option span').text(selection);
        for (var i = 1; i < option.length; i++) {
            if ($(option[i]).text() === selected.text()) {
                $(option[i]).attr('selected', 'true');
                $(option[i]).siblings().removeAttr('selected');
            }
        };

        $(customSelect).attr('data-selected-value', dataValue);

        guests = selection;
        try {
            if ($(customSelect).parent().find('select')[0].id != 'slct1')  return;
            if (guests != 'Буду один') {
                $('#fio2').removeAttr('disabled')
            } else {
                $('#fio2').attr('disabled', true)
            }
        } catch(e) {}
    
    });
};

$(function () {
    customSelect('#slct1');
    customSelect('#slct2');
    customSelect('#slct3');

    $('footer').slideUp();

    $("#fio").on('click', () => {
        $(".notifyjs-wrapper").click();
    })
    $('li').on('click', () => {
        $(".notifyjs-wrapper").click();
    })
    $("#fio2").on('click', () => {
        $(".notifyjs-wrapper").click();
    })
})

function send() {
    let inf = {};
    inf.comm = $('textarea').val();
    $('[name="agreebtn"]').each((index, el) => {
        if (el.checked) inf.approving = el.value === 'yes';
    });
    inf.guests = $('#slct1').val();
    inf.guestsNames = inf.guests == '0' ? '-' : $('#fio2').val();
    inf.name = $('#fio').val();
    inf.food = $('#slct2').val();
    inf.water = $('#slct3').val();
    if (!inf.name) {
        $("#fio").notify("Пожалуйста, укажите свое имя", { autoHideDelay: 4000, className: 'warning' });
        return;
    }
    if (inf.approving) {
        if (!inf.guests || inf.guests == 'Сделайте выбор') {
            $("#lblslct1").notify("Пожалуйста, укажите количество", { autoHideDelay: 4000, className: 'warning' });
            return;
        }
        if (!inf.guestsNames) {
            $("#fio2").notify("Пожалуйста, укажите имя спутника/спутников", { autoHideDelay: 4000, className: 'warning' });
            return;
        }
        if (!inf.food || inf.food == 'Сделайте выбор') {
            $("#lblslct2").notify("Пожалуйста, укажите ваше пожелание", { autoHideDelay: 4000, className: 'warning' });
            return;
        }
        if (!inf.water || inf.water == 'Сделайте выбор') {
            $("#lblslct3").notify("Пожалуйста, укажите ваше пожелание", { autoHideDelay: 4000, className: 'warning' });
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: "http://192.168.1.64:5000/submit",
        data: JSON.stringify(inf),
        contentType: "application/json",
        success: function () {
            $('footer').slideDown(1500, "linear");
        },
        error: function () {
            $("#sendbtn").notify("Возникли ошибки, \n свяжитесь с нами", { autoHideDelay: 10000 });
        }
    });
    console.log(inf)

}