let data;
function getData(){
    fetch('https://api.zoomcar.com/v4/cities?platform=web')
    .then(res=>res.json())
    .then(result=>{
        data=result.cities;
        
        //setData(data);
        segragateCity(data);
    });
}

function filtercities(e){
    let text=e.target.value;
    if(!text){
        segragateCity(data);
        return;
    }
    let newdata=data.filter(item=>item.name.indexOf(text)!==-1);
    segragateCity(newdata);
}

function toggleHDEnable(e){
    let ischeckedHD=e.target.checked;
    let ischeckedOneWay=document.querySelector('#oneway').checked;
    let newData=data.filter(item=>item.hd_enabled==ischeckedHD && item.one_way_enabled==ischeckedOneWay);
    segragateCity(newData);
}

function toggleOneWayEnable(e){
    let ischeckedOneWay=e.target.checked;
    let ischeckedHd=document.querySelector('#hd').checked;
    let newData=data.filter(item=>item.one_way_enabled==ischeckedOneWay && item.hd_enabled==ischeckedHd);
    segragateCity(newData);
}

function Card(item){
    return(
        `<div class="image">
                <img src=${item.icon} />
                </div>
                <div class="content">
                    <div class="city-name">${item.name}</div>
        </div>`
    )
}

function setData(data ,id){
    var fragment = document.createDocumentFragment();
    data.map(item=>{
        let ele=document.createElement('div');
        ele.classList.add('card');
        ele.innerHTML=Card(item);
        fragment.appendChild(ele);
    });

    let parentEle=document.getElementById(id);
    parentEle.innerHTML='';
    parentEle.appendChild(fragment);
}

function segragateCity(data){
    let popularcity=data.filter(item=>item.popular);
    let notpopularcity=data.filter(item=>!item.popular);
    setData(popularcity ,'popular');
    setData(notpopularcity ,'notpopular');
}


getData();