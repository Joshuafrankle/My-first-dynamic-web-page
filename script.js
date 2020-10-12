var ajax = new XMLHttpRequest();
var method = "POST";
var url = "https://elevate-be-staging.azurewebsites.net/instafeed.php";

ajax.open(method, url);

ajax.onload = () => {
  var the_data = JSON.parse(ajax.responseText);
  console.log(the_data);

  var pro_pic = the_data.graphql.user.profile_pic_url_hd;
  var page_name = the_data.graphql.user.full_name;
  var bio = the_data.graphql.user.biography;
  var insta_page = the_data.graphql.user.username;

  document.getElementById("page-name").innerHTML = page_name;
  document.getElementById("insta_bio").innerHTML = bio;

  document.getElementById("pro-pic").innerHTML =
    '<a href="https://www.instagram.com/' +
    insta_page +
    '" / target="_blank"><img class="imgsize" src="' +
    pro_pic +
    '" alt="Image"/></a>';

  var ourData = the_data.graphql.user.edge_owner_to_timeline_media.edges;

  for (var i in ourData) {
    var image_url = ourData[i].node.shortcode;
    var images = ourData[i].node.display_url;
    var caption = ourData[i].node.edge_media_to_caption.edges[0].node.text;
    var formatted_caption = "";

    for (var i = 0; i < caption.length; i++) {
      if (caption[i] == "#") {
        break;
      } else {
        formatted_caption += caption[i];
      }
    }

    var img =
      '<div class="swiper-slide fit-content"> <div class="container"> <div class="row px-2 px-md-5"> <div class="col-md-6 d-flex card rounded border-0 "> <div class="card-body"> <a href="https://www.instagram.com/p/' +
      image_url +
      '/" target="_blank"> <img class="img-fluid" height="300px" src="' +
      images +
      '" alt="Image" /> </a> </div> </div> <div class="col-md-6 d-flex card rounded border-0 card-block bg-red text-light"> <div class="card-body align-items-center d-flex">  <div class="h6 text-justify"> ' +
      formatted_caption +
      " </div> </div> </div> </div> </div> </div>";

    document.getElementById("feed-holder").innerHTML += img;
    swiper.updateSlides();
  }
  // Since loader is very beautiful
  setTimeout(() => {
    document.getElementById("page-loader").classList.add("d-none");
    document.getElementById("feed-content").classList.remove("d-none");
  }, 2000);
};

ajax.send();
