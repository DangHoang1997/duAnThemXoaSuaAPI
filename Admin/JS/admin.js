
// dòng lệnh API 
var apiURl = "https://66b250181ca8ad33d4f75357.mockapi.io/APIPROJECT";

let fetchAPilist = () => {
 
    onLoad();// hiển thị loading
    axios.get(apiURl)
    .then((res) => {
        offLoad();
        addData = res.data
        renderList(res.data)
        console.log(res.data)
    }).catch((err) => {
        offLoad();
        console.log(`them that bai`)
    });
}
// goi lại 
fetchAPilist();
// hàm render hiển thị danh sách
function renderList(list) {
    addProduct = list;
    let output = "";
    for (let i = 0; i < list.length; i++) {
        let q = list[i];
        let string = `<tr>
        <td>${q.Id}</td>
        <td>${q.Name}</td>
        <td>${q.Price}</td>
        <td><img width="100" src="${q.Screen}" alt="Màn hình"></td>
        <td><img width="100" src="${q.backCamera}" alt="Camera sau"></td>
        <td><img width="100" src="${q.ProntCamera}" alt="Camera trước"></td>
        <td><img width="100" src="${q.Img}" alt="Hình ảnh sản phẩm"></td>
        <td>${q.DECS}></td>
        <td>${q.type}></td>
        <td>
        <buton onclick = "deleteProduct(${q.Id})" class = "btn btn-danger">Xóa</buton>
        <button onclick = "editProduct(${q.Id})" class = "btn btn-success">Sửa</button>
        </td>

        </tr>`;
        output += string;
        output
        
    }

    getID("table").innerHTML = output;
}

// hàm thêm sản phẩm
document.getElementById('addAPI').addEventListener("click",() => {
    let product = getform();
    console.log(product)
    onLoad();
    axios.post(apiURl,product).then((res) => {
        $("#myModal").modal("hide");
      // gọi lại api lấy danh sách sản phẩm mới nhất từ server sau khi thêm
      fetchAPilist();
    }).catch((err) => {
        offLoad();
        console.log("🚀 ~ err:", err);
      });
        
    
}
)
//xóa sản phẩm 
let deleteProduct = (id) => {
    onLoad();
    axios.delete(`${apiURl}/${id}`).then((res) => {
        offLoad();
        fetchAPilist();
    console.log('res :', res);
        
    }).catch((err) => {
        offLoad();
    console.log('err :', err);
        
    });
  
}
let editProduct = (id) => {
    onLoad();
    axios.get(`${apiURl}/${id}`)
    .then((res) => {
        let product = res.data;
        $("#myModal").modal("show");
        document.getElementById('TenSP').value = product.Name;
        document.getElementById('GiaSP').value = product.Price; // Đã sửa dòng này
        document.getElementById('HinhSP').value = product.Img;
        document.getElementById('loaiSP').value = product.Type;
        // Gán id cho modal 
        document.getElementById('thayTheID').innerText = product.Id;
        offLoad();
        
    }).catch((err) => {
        offLoad();
        console.log('err :', err); // Có thể thêm log để kiểm tra lỗi
    });
}

let updateAPI = () => {
    let id  = document.getElementById('thayTheID').innerText;
    let product = getform();
    onLoad();
    axios.put(`${apiURl}/${id}`,product).then((res) => {
        offLoad();
        $("#myModal").modal("hide");

        fetchAPilist();
    }).catch((err) => {
        offLoad();
    console.log('err :', err);
        
    });

  
}

let addData = [];
// Hàm tìm kiếm sản phẩm
let timkiem = () => {
    let searchInput = document.getElementById("timKiem").value.toLowerCase();
    if (searchInput === "") {
        renderList(addData); // Hiển thị lại toàn bộ danh sách nếu ô tìm kiếm rỗng
        return;
    }
    let filterProduct = addData.filter(item =>
        item.Name.toLowerCase().includes(searchInput) ||
        item.Price.toString().includes(searchInput) || // Chuyển Price thành chuỗi
        item.type.toLowerCase().includes(searchInput)
    );
    renderList(filterProduct);
}

document.getElementById('timKiem').addEventListener("input", timkiem);


// hàm gọi iid
let getID = id => document.getElementById(id);