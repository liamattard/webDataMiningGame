
var i=0;
var audio;
var balance = 1000;
var health = 50;

function startStory(){
    document.getElementById("intro_title").classList.add("fadeOut");
    document.getElementById("start_btn").classList.add("fadeOut");

    // setTimeout(function() {   
    //     document.getElementById("intro_title").style.display = "none";
    //     document.getElementById("start_btn").style.display = "none";
    // }, 9000)


    audio = new Audio('audio.mp3');
    audio.play();


    setTimeout( runStory,1000);


}

function runStory(){
    story = i.toString();
    console.log(story)
    document.getElementById(story).classList.add("text_anim");

    setTimeout(function() {   
        story = i.toString();
        console.log(story)
        document.getElementById(story).classList.add("text_anim");

        i++;                   
        if (i < 2) {            
            runStory();              
        }else{
            
            removeIntro();
        }                   
      }, 6000)
}


function removeIntro(){
    audio.volume = 0.5;
    document.getElementById("intro").style.display = "none";
    


    document.getElementById("body").style.display = "block";
    document.getElementById("body").classList.add("fadeIn");

    
    document.getElementById("balance").classList.remove("no_opacity");
    document.getElementById("current_day").classList.remove("no_opacity");
    document.getElementById("progress_bar").classList.remove("no_opacity");
    document.getElementById("meter").classList.remove("no_opacity");



    document.getElementById("balance").classList.add("fadeIn");
    document.getElementById("current_day").classList.add("fadeIn");
    document.getElementById("progress_bar").classList.add("fadeIn");
    document.getElementById("meter").classList.add("fadeIn");



    setTimeout(function(){audio.pause()},1000);

    setTimeout(function(){calculate_health(20, "-"); console.log(health)},2000);




    

}


function calculate_money(price, op){
    var current_balance = balance;
    if(op.localeCompare("-")){
        balance = balance-price;
    }
    else if(op.localeCompare("+")){
        balance = balance+price;
    }
    // document.getElementById("balance_value").innerHTML = balance.toString();

    const obj = document.getElementById("balance_value");
    animateValue(obj, current_balance, balance, 5000);
}


function calculate_health(value, op){
    if(op.localeCompare("-")){
        health = health-value;
    }
    else if(op.localeCompare("+")){
        health = health+value;
    }

    // document.getElementById("health_value").style.transition = "all 1s";
    document.getElementById("health_value").style.width = health.toString()+"%";

}


function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
