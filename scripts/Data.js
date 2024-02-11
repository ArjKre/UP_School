/*to get data from json to slider*/
let http=new XMLHttpRequest();
http.open('get','Data.json',true);
http.send()
http.onload=function(){
    if(this.readyState == 4 && this.status == 200){
        let slider=JSON.parse(this.responseText)

        let output=""

        for(let item of slider){
            output+=`
            <section class="slider">
            <div class="container">
  <div class="section-title aos-hidden" style="transition-delay: 300ms">
    <h2>Our Teachers</h2>
    <div class="underline"></div>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi corporis, iste minima mollitia, necessitatibus nobis aut magni eos eum vel voluptatum ipsam totam voluptate deleniti similique sit, aspernatur odit. Natus!</p>
  </div>

  <div class="wrapper">
    <i id="left" class="fa-solid fa-angle-left"></i>
    <ul class="carousel">
      <li class="card">
        <div class="img"><img src="${item.image}" alt="${item.image}" draggable="false"></div>
        <h2>${item.name}</h2>
        <span>${item.email}</span>
        <span>${item.subject}</span>
      </li>
      
    </ul>
    <i id="right" class="fa-solid fa-angle-right"></i>
  </div>

</section>
            `;
        }
        document.querySelector(".slider").innerHTML=output;
    }
}