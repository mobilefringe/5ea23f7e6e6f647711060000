function init(){
    
    $('.menu_toggler').click(function(){
        if ($('#header').hasClass('darken')){
            $('#header').addClass('lighten');
            $('#header').removeClass('darken');
            $('body').removeClass('no_scroll');
            $(".modal-backdrop").remove();
        } else {
            $('#header').removeClass('lighten');
            $('#header').addClass('darken');
            $('body').addClass('no_scroll');
            setTimeout(function() {$('<div class="modal-backdrop custom_backdrop"></div>').appendTo(document.body); }, 300);
        }
        $('.custom_mobile_menu').slideToggle();
    })
    
    $(".scroll").click(function(e) {
        e.preventDefault();
        $('html,body').animate( { scrollTop:$("#contact").offset().top } , 500);
    });
    $('#open_features').click(function(e){
        e.preventDefault();
        $('#feature_insider').slideToggle();
    });
    
    var previousScroll = 0;
    $(window).scroll(function(event){
        if(window.screen.width > 768){
            var scroller = $(this).scrollTop();
            if(scroller > (previousScroll + 10) || scroller < (previousScroll - 20)){
                $('#feature_insider').slideUp()
            }
            previousScroll = scroller;
        }
    });

    function renderAll(){
        
    }
    loadMallDataCached(renderAll);  
}

function templateInit () {
    // console.log("template_init");
    $('<div class="loader_backdrop"><div class="loader">Loading...</div></div>').appendTo(document.body);
}
function show_content(){
    $(".yield").css({visibility: "visible"});
    $(".loader_backdrop").remove();
}
function renderGallery(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.photo_url.indexOf('missing.png') > -1) {
            val.gallery_image = "//codecloud.cdn.speedyrails.net/sites/57f7f01f6e6f647835890000/image/png/1461352407000/HallifaxLogo.png";
        } else {
            val.gallery_image = "//www.mallmaverick.com" + val.photo_url;
        }

        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        
        val.template_image = "//mallmaverick.com" + val.photo_url;
        
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
        start.setDate(start.getDate());
        if(val.url == "" || val.url === null){
            val.css = "style=cursor:default;";
            val.noLink = "return false";
        }
        if (start <= today){
            if (val.end_date){
                end = new Date (val.end_date);
                end.setDate(end.getDate() + 1);
                if (end >= today){
                    item_list.push(val);  
                }
            } else {
                item_list.push(val);
            }
        }
    });

    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(home_banner).html(item_rendered.join(''));
}

function fadeContent(){
    $('#feature_insider .row').fadeIn();
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/59c082786e6f6462ee1d0000/image/png/1507232968000/Group 10.png";
        } else {
            val.post_image = val.image_url;
        }
        
        val.title = truncateWords(val.title,7);
        if(val.body.length > 100){
            val.description_short = val.body.substring(0, 100) + "...";
        } else {
            val.description_short = val.body;
        }
        
        val.description_short = val.description_short.replace("&amp;", "&");
        
        var published_on = moment(val.publish_date).tz(getPropertyTimeZone());
        val.publish_date = published_on.format("MMM D, YYYY");
        
        //get first tag 
        if(val.tag != null && val.tag !== undefined) {
            val.main_tag = val.tag[0];
            // console.log("main tag", val.main_tag);
            val.show_tag = "display:inline-block";
        }
        else {
            val.show_tag = "display:none"
        }
        
        //get the tag that is capitalized
        // if(val.tag != null && val.tag !== undefined) {
        //     console.log(val.tag);
        //     $.each( val.tag , function( key, tag ) {
               
                
        //         if(tag[0] === tag[0].toUpperCase()){
        //             val.main_tag = tag;
        //         }
        //     })
        //     console.log("main tag", val.main_tag);
        // }
        
        val.counter = counter;
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter + 1;
        // item_list.push(val);
    });
    
    // $(container).show();
    $(container).html(item_rendered.join(''));
}
function renderPostDetails(container, template, collection, blog_posts){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    $.each(collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "//codecloud.cdn.speedyrails.net/sites/57f7f01f6e6f647835890000/image/png/1461352407000/HallifaxLogo.png";
        } else {
            val.post_image = val.image_url;
        }
        
        if(val.body.length > 150){
            val.description_short = val.body.substring(0,150) + "...";
        }
        else{
            val.description_short = val.body;
        }

        var blog_list = [];
        $.each(blog_posts, function(key, val) {
            var slug = val.slug;
            blog_list.push(val.slug);
        });
        var current_slug = val.slug;
        var index = blog_list.indexOf(current_slug);
        if(index >= 0 && index < blog_list.length){
          var next_slug = blog_list[index + 1];
            if(next_slug != undefined || next_slug != null){
                val.next_post = "/blog/" + next_slug;
                val.next_show = "display: block";
            } else {
                val.next_show = "display: none";
            }
        }
        if(index >= 0 && index < blog_list.length){
            var prev_slug = blog_list[index - 1];
            if(prev_slug != undefined || prev_slug != null){
                val.prev_post = "/blog/" + prev_slug;
                val.prev_show = "display: block";
            } else {
                val.prev_show = "display: none";
            }
        }
        var published_on = moment(val.publish_date).tz(getPropertyTimeZone());
        val.publish_date = published_on.format("MMM D, YYYY");
        
        if(val.tag != null && val.tag !== undefined) {
            val.main_tag = val.tag[0];
            // console.log("main tag", val.main_tag);
            val.show_tag = "display:inline-block";
        }
        else {
            val.show_tag = "display:none"
        }
        
        val.twitter_title = val.title + " via @shopHSC";
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).html(item_rendered.join(''));
}

function truncateWords(str, no_words) {
    // return str.split(" ").splice(0,no_words).join(" ")+"...";

    str = str.trim().split(" ");
    if(str.length > no_words) {
        return str.splice(0, no_words).join(" ")+ "...";
    }
    else {
        return str.splice(0, no_words).join(" ");
    }
    
}
$(document).ready(function(e) {
    init(e);
    loadMallDataCached(renderAll); 
    window.scrollTo(0, 0);
    if(window.location.href.indexOf("#premium") > -1) {
        changePremiumBG();
        $("#premium").addClass("active_templ_btn");
        $("#premium").trigger("click");
        window.scrollTo(0, 0);
    }
    else if(window.location.href.indexOf("#express") > -1) {
        $("#standard").addClass("active_templ_btn");
        $("#standard").trigger( "click" );
        changeStandardBG();
        window.scrollTo(0, 0);
    }
    else if(window.location.href.indexOf("#custom") > -1) {
        $("#custom").addClass("active_templ_btn");
        $("#custom").trigger("click");
        changeCustomBG();
        window.scrollTo(0, 0);
    }
    else if(window.location.href.indexOf("#landing_page") > -1) {
        $("#landing_page").addClass("active_templ_btn");
        $("#landing_page").trigger("click");
        // changeLandingPageBG();
        window.scrollTo(0, 0);
    }
    else if(window.location.href.indexOf("#newsletter") > -1) {
        $("#newsletters").addClass("active_templ_btn");
        $("#newsletters").trigger("click");
        changeNewsletterBG();
        window.scrollTo(0, 0);
    }
    else if(window.location.href.indexOf("#corp_designs") > -1) {
        changeCorpBG();
        window.scrollTo(0, 0);
    }
    else {
        changePremiumBG();
        $("#premium").addClass("active_templ_btn");
        $("#premium").trigger("click");
        window.scrollTo(0, 0);
    }
});

function renderAll(){
    var templates = getBlogDataBySlug("home-templates").posts;
    var sorted_p_templates = [];
    $.each(templates, function(key, val) {
        $.each( val.tag , function( tag_key, tag ) {
            //val.taglist = val.taglist + " " + tag;
            if(tag == "Premium"){
                sorted_p_templates.push(val);
            }
            if(tag == "is_new"){
                val.is_new ="display:block";
            }
            else {
                val.is_new ="display:none";
            }
         });
        
    });
    console.log("sorted_p_templates", sorted_p_templates);
    sorted_p_templates = sorted_p_templates.sortBy(function(o){ return o.publish_date }).reverse();
    renderGeneral('#premium_design_container','#premium_design_template', sorted_p_templates);
    var sorted_s_templates = [];
    $.each(templates, function(key, val) {
        $.each( val.tag , function( tag_key, tag ) {
            //val.taglist = val.taglist + " " + tag;
            if(tag == "Standard"){
                sorted_s_templates.push(val);
            }
            if(tag == "is_new"){
                val.is_new ="display:block";
            }
            else {
                val.is_new ="display:none";
            }
         });
    }); 
    console.log("sorted_s_templates", sorted_s_templates);
    //console.log(sorted_templates);
    sorted_s_templates = sorted_s_templates.sortBy(function(o){ return o.publish_date }).reverse();
    renderGeneral('#standard_design_container','#standard_design_template', sorted_s_templates);
    
    var sorted_l_templates = [];
    $.each(templates, function(key, val) {
        $.each( val.tag , function( tag_key, tag ) {
            //val.taglist = val.taglist + " " + tag;
            if(tag == "Landing Page"){
                sorted_l_templates.push(val);
            }
            if(tag == "is_new"){
                val.is_new ="display:block";
            }
            else {
                val.is_new ="display:none";
            }
         });
    }); 
    //console.log(sorted_templates);
    sorted_l_templates = sorted_l_templates.sortBy(function(o){ return o.publish_date }).reverse();
    renderGeneral('#landing_page_container','#landing_page_template', sorted_l_templates);
    
    var sorted_n_templates = [];
    $.each(templates, function(key, val) {
        $.each( val.tag , function( tag_key, tag ) {
            //val.taglist = val.taglist + " " + tag;
            if(tag == "Newsletter"){
                sorted_n_templates.push(val);
            }
            if(tag == "is_new"){
                val.is_new ="display:block";
            }
            else {
                val.is_new ="display:none";
            }
         });
    }); 
    //console.log(sorted_templates);
    sorted_n_templates = sorted_n_templates.sortBy(function(o){ return o.publish_date }).reverse();
    console.log(sorted_n_templates);
    renderGeneral('#newsletter_design_container','#newsletter_design_template', sorted_n_templates);
    
    var sorted_corp_templates = [];
    $.each(templates, function(key, val) {
        $.each( val.tag , function( tag_key, tag ) {
            //val.taglist = val.taglist + " " + tag;
            if(tag == "corp"){
                sorted_corp_templates.push(val);
            }
            if(tag == "is_new"){
                val.is_new ="display:block";
            }
            else {
                val.is_new ="display:none";
            }
         });
    }); 
    //console.log(sorted_templates);
    sorted_corp_templates = sorted_corp_templates.sortBy(function(o){ return o.publish_date }).reverse();
    console.log(sorted_corp_templates);
    renderGeneral('#corp_design_container','#corp_design_template', sorted_corp_templates);
    
    $("#premium").click(function(e) {
        changePremiumBG();
        var x = window.pageXOffset,
        y = window.pageYOffset;
        $(window).one('scroll', function () {
            window.scrollTo(x, y);
        });
    });
    $("#standard").click(function(e) {
        var x = window.pageXOffset,
        y = window.pageYOffset;
        $(window).one('scroll', function () {
            window.scrollTo(x, y);
        });
        changeStandardBG();
    });
    $("#custom").click(function(e) {
        changeCustomBG();
        var x = window.pageXOffset,
        y = window.pageYOffset;
        $(window).one('scroll', function () {
            window.scrollTo(x, y);
        });
    });
    
}
function changePremiumBG() {
    removeStyling();
    // $('.design_containers').hide();
    $('#premium_design_container').show();
    $("#premium").addClass("active_templ_btn");
    
}
function changeStandardBG() {
    removeStyling();
    $('#standard_design_container').show();
    $("#standard").addClass("active_templ_btn");
}
function changeCustomBG() {
    removeStyling();
     $('#custom_design_container').show();
    $("#custom").addClass("active_templ_btn");
    $("#template_content").addClass("custom_container");
    $("#default_template_banner").hide();
    $("#custom_template_banner").show();
}
function changeNewsletterBG() {
    removeStyling();
    $('#newsletter_design_container').show();
    $("#template_title").text("MALL MAVERICK NEWSLETTER DESIGNS");
    $(".newsletter_btn_contaienr").show();
    $(".template_btn_contaienr").hide()
}
function changeCorpBG() {
    removeStyling();
    $('#corp_design_container').show();
    $("#default_template_banner").hide();
    $("#corp_template_banner").show();
    $(".template_btn_contaienr").hide()
}
function removeStyling () {
    $('.design_containers').hide();
    $(".template_btn").removeClass("active_templ_btn");
    $("#template_content").removeClass("custom_container");
    $("#template_title").text("THE BEST IN SHOPPING CENTER WEBSITE DESIGNS");
    $("#default_template_banner").show();
    $("#custom_template_banner").hide();
    $("#corp_template_banner").hide();
}