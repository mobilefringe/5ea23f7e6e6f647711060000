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