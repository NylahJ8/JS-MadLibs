let data=[]

const beginBtn=document.getElementById("beginBtn");
const resetBtn=document.getElementById("resetBtn");

beginBtn.addEventListener("click",init);
resetBtn.addEventListener("click",init);

function loadData(){
    const data1={
     id:1,
     content:"Self-centered Emperor Kuzco plans to build his summer palace on a village hilltop, evicting the humble villager Pacha. Meanwhile, his scheming advisor Yzma plots to overthrow him, but her plan to poison Kuzco backfires—turning him into a llama instead!",
     img:"image.jpeg"
    }
    const data2={
        id:2,
        content:"Lost and stranded, Kuzco begrudgingly teams up with Pacha, who agrees to help him return to the palace. Along the way, they face wild jungles, hilarious mix-ups, and Yzma’s ridiculous attempts to stop them. Through the adventure, Kuzco learns empathy, friendship, and how not to be a royal pain.",
        img:"OIP.jpeg"
    }
    data.push(data1,data2);
}

function renderData(data){
   data.forEach(articleData=>createArticle(articleData));
}

function createArticle(data){
  const main=document.getElementsByTagName("main")[0];
  const article=document.createElement("article");
  article.id=`article-${data.id}`;
  const img=document.createElement("img");
  img.src=data.img;
  const p=document.createElement("p");
  p.textContent=data.content;
  p.classList.add("fascinate-regular");
  p.addEventListener("mouseover",zoomIn);
  p.addEventListener("mouseout",zoomOut);
  const nextBtn=document.createElement("button");
  nextBtn.textContent="next";
  nextBtn.addEventListener("click",next);
  article.append(img,p,nextBtn);
  main.append(article);
}

function init(){
  reset();
  loadData();
  document.getElementById("resetBtnRow").style.display="block";
  renderData(data);
  appear(document.getElementById("article-1"));
}

function appear(element){
  const children=element.children;
  for(const child of children){
    child.style.opacity=1;
    child.style.display="inline-block";
  }
}

function zoomIn(e){
  e.target.style.fontSize="2em";
}

function zoomOut(e){
  e.target.style.fontSize="1em";
}

function next(e){
  const target=e.target;
  const parent=target.parentElement;
  const next=parent.nextElementSibling;
  if(next){
    appear(next);
  } else {
    // If this is the last article, reset the story
    setTimeout(() => {
      reset();
      loadData();
      renderData(data);
      appear(document.getElementById("article-1"));
    }, 1000); // Small delay to let user see they reached the end
  }
}

function reset(){
  data=[];
  document.getElementById("resetBtnRow").style.display="none";
  const main=document.getElementsByTagName("main")[0];
  console.log(main);
  while(main.firstChild){
    main.removeChild(main.firstChild);
  }
}











