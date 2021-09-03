var page_presets;
var product_list;

$(document).ready(function(){
    $.getJSON("/webpage/products.json", function(result) {
        product_list = result;
    });

    $.getJSON("/webpage/pages.json", function(result) {
        page_presets = result;

        var testing = true;
        if (!testing) {
            var params = new URLSearchParams(location.search);
            if (params.has("page")) {
                let page = params.get("page");
                if (!page_presets[page]) {
                    page = "not-found";
                }
                document.getElementById("main-content").innerHTML = page_presets[page]["content"];
                if (page != "item") {
                    params.delete("product");
                    history.replaceState(null, null, "?"+params.toString());
                };
                if (page == "shop") {
                    load_gallery();
                };
            }
            else {
                params.delete("product");
                history.replaceState(null, null, "?"+params.toString());
                document.getElementById("main-content").innerHTML = page_presets["home"]["content"];
            }
        };
        lock_menu();
    });
});

function page_load(page) {
    if (!page_presets[page]) {
        page = "not-found";
    }
    document.getElementById("main-content").innerHTML = page_presets[page]["content"];

    var params = new URLSearchParams(location.search);
    params.set("page", page_presets[page]["link"]);
    if (page != "item") {
        params.delete("product");
    }
    history.pushState(null, null, "?"+params.toString());
    if (params.get("page") == "shop") {
        load_gallery();
    };

    /// Test that adding multiple params works ///
    
    // setTimeout(function(){
    //     var params = new URLSearchParams(location.search);
    //     params.set("product", Math.floor(Math.random() * 10000000));
    //     history.pushState(null, null, "?"+params.toString());
    // })
};

function load_gallery() {
    var gallery = document.getElementById("gallery");
    var product_section = gallery.querySelector("#product-id");
    gallery.removeChild(product_section);
    
    for (var id in product_list) {
        let product_clone = product_section.cloneNode(true);
        var item = product_list[id];

        product_clone.name = ""+id;
        product_clone.querySelector(".thumbnail").src = "/images/"+item.img;
        product_clone.querySelector(".shop-header").innerHTML = item.name;
        product_clone.querySelector("span").innerHTML = "$"+item.price.toLocaleString();

        gallery.insertBefore(product_clone, gallery.childNodes[-1])
    };
};

function product_page(element_name) {
    page_load("item");
    
};

function lock_menu() {
    var menu_bar = document.getElementById("menu-bar");
    var sectionOne = document.getElementById("logo-div");
    var sectionOneOptions = {
        rootMargin: "-100px"
    };
    
    var sectionOneOberserver = new IntersectionObserver(function(entries, sectionOneOberserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                menu_bar.classList.add("menu-scrolled");
            }
            else {
                menu_bar.classList.remove("menu-scrolled");
            }
        });
    }, sectionOneOptions);
    sectionOneOberserver.observe(sectionOne);
};

function addcart(name) {
    alert(`Added item ${name} to your cart!`)
};

function fetch_cart() {
    let cookies = document.cookie;
    if (!cookies) {
        document.cookie = "cart=[]";
        return document.cookie;
    }
    else {
        console.log(cookies);
    }
}
