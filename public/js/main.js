const sel_search = document.getElementById("search");
const sel_section = document.querySelectorAll(".contain-ipc");

const data = [];

const handleSearch = (e) => {
 	const valArr = e.target.value.toLowerCase().replace(/\s+/g, " ").trim().split(' ');

  for(let x=0; valArr.length > x; x++){
	 const val = valArr[x]
      data.forEach((ind) => {
      if(ind.title.includes(val) || ind.desc.includes(val) || ind.section.includes(val) || ind.chapter.includes(val)){
     	ind.elm.style.display = 'flex'
    } else {
     	ind.elm.style.display = 'none'
    }
  })
  }


};

sel_search.addEventListener("input", (e) => {
  handleSearch(e);
});

sel_section.forEach((elm) => {
  const title = elm.getAttribute("data-title").toLowerCase().replaceAll('-',' ').replace('_', '-');
  const desc = elm.getAttribute("data-desc").toLowerCase().replace('_','-').replaceAll('-',' ');
  const section =  elm.getAttribute("data-section").toLowerCase().replace('_',' ');
  const chapter = "chapter " + elm.getAttribute("data-chapter");
  data.push({
    title,
    section,
    chapter,
    desc,
    elm,
  });
});

