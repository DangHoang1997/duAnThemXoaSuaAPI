let getform = () => {
    
    let name  = document.getElementById('TenSP').value;
    let price  = document.getElementById('GiaSP').value;
    let img  = document.getElementById('HinhSP').value;
    let type  = document.getElementById('loaiSP').value;

    return {
        Name: name,
        Price: price,
        Img: img,
        Type: type,
    };
}
let onLoad = () => {
  
    document.getElementById("spinner").style.display = "block";
}
let offLoad = () => {
  
    document.getElementById("spinner").style.display = "none";
}

    
